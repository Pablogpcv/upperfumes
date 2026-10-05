-- =====================================================================
-- Upperfumes · Base de datos en Supabase
-- Ejecutar completo en: Supabase → SQL Editor → New query → Run
-- Es seguro volver a ejecutarlo (usa "if not exists" / "or replace").
-- =====================================================================

-- ---------- PERFILES (uno por cada cuenta) ----------
create table if not exists public.perfiles (
  id        uuid primary key references auth.users on delete cascade,
  nombre    text not null default '',
  email     text not null default '',
  telefono  text not null default '',
  rol       text not null default 'cliente' check (rol in ('cliente','admin')),
  creado    timestamptz not null default now()
);
alter table public.perfiles enable row level security;

-- ¿El usuario actual es administrador?
create or replace function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin');
$$;

drop policy if exists "ver perfil propio o admin" on public.perfiles;
create policy "ver perfil propio o admin" on public.perfiles
  for select using (id = auth.uid() or public.es_admin());

drop policy if exists "editar perfil propio o admin" on public.perfiles;
create policy "editar perfil propio o admin" on public.perfiles
  for update using (id = auth.uid() or public.es_admin())
  with check (id = auth.uid() or public.es_admin());
-- (no hay política de INSERT ni DELETE: nadie crea perfiles a mano desde la página)

-- Nadie que no sea admin puede cambiarse el rol (ni el correo del perfil)
create or replace function public.proteger_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.es_admin() then
    if new.rol is distinct from old.rol then raise exception 'No autorizado para cambiar el rol'; end if;
    if new.email is distinct from old.email then raise exception 'No autorizado para cambiar el correo'; end if;
    if new.id is distinct from old.id then raise exception 'No autorizado'; end if;
  end if;
  return new;
end $$;
drop trigger if exists t_proteger_perfil on public.perfiles;
create trigger t_proteger_perfil before update on public.perfiles
  for each row execute function public.proteger_perfil();

-- Cada cuenta nueva crea su perfil SIEMPRE como cliente
create or replace function public.nuevo_usuario() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfiles (id, nombre, email, telefono, rol)
  values (new.id,
          left(coalesce(new.raw_user_meta_data->>'nombre', ''), 80),
          coalesce(new.email, ''),
          left(coalesce(new.raw_user_meta_data->>'telefono', ''), 30),
          'cliente')
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists t_nuevo_usuario on auth.users;
create trigger t_nuevo_usuario after insert on auth.users
  for each row execute function public.nuevo_usuario();

-- ---------- PRODUCTOS (catálogo público) ----------
create table if not exists public.productos (
  id          int primary key,
  data        jsonb not null,
  stock       int not null default 0 check (stock >= 0),
  actualizado timestamptz not null default now()
);
alter table public.productos enable row level security;
drop policy if exists "catalogo publico" on public.productos;
create policy "catalogo publico" on public.productos for select using (true);
drop policy if exists "admin escribe productos" on public.productos;
create policy "admin escribe productos" on public.productos
  for all using (public.es_admin()) with check (public.es_admin());

-- Costo de compra y proveedor: SOLO administradores
create table if not exists public.productos_privado (
  id    int primary key references public.productos on delete cascade,
  data  jsonb not null default '{}'::jsonb
);
alter table public.productos_privado enable row level security;
drop policy if exists "solo admin privado" on public.productos_privado;
create policy "solo admin privado" on public.productos_privado
  for all using (public.es_admin()) with check (public.es_admin());

-- ---------- AJUSTES PÚBLICOS (datos de la empresa, reglas de la tienda) ----------
create table if not exists public.ajustes (
  clave text primary key,
  data  jsonb not null
);
alter table public.ajustes enable row level security;
drop policy if exists "ajustes publicos" on public.ajustes;
create policy "ajustes publicos" on public.ajustes for select using (true);
drop policy if exists "admin escribe ajustes" on public.ajustes;
create policy "admin escribe ajustes" on public.ajustes
  for all using (public.es_admin()) with check (public.es_admin());
insert into public.ajustes (clave, data) values
  ('tienda', '{"desc_min":6,"desc_vol":10,"min_mayor":6}')
on conflict (clave) do nothing;

-- ---------- DATOS INTERNOS DEL ADMIN (compras, gastos, proveedores, registro, clientes potenciales) ----------
create table if not exists public.admin_datos (
  clave       text primary key,
  data        jsonb not null,
  actualizado timestamptz not null default now()
);
alter table public.admin_datos enable row level security;
drop policy if exists "solo admin datos" on public.admin_datos;
create policy "solo admin datos" on public.admin_datos
  for all using (public.es_admin()) with check (public.es_admin());

-- ---------- FACTURAS (solo admin; los clientes usan las funciones de abajo) ----------
create sequence if not exists public.factura_seq;
create table if not exists public.facturas (
  id          text primary key,
  usuario     uuid references auth.users on delete set null,
  data        jsonb not null,
  creado      timestamptz not null default now(),
  actualizado timestamptz not null default now()
);
alter table public.facturas enable row level security;
drop policy if exists "solo admin facturas" on public.facturas;
create policy "solo admin facturas" on public.facturas
  for all using (public.es_admin()) with check (public.es_admin());

-- ---------- FUNCIONES ----------

-- Siguiente número de factura (solo admin)
create or replace function public.siguiente_factura() returns text
language plpgsql security definer set search_path = public as $$
begin
  if not public.es_admin() then raise exception 'No autorizado'; end if;
  return 'FV-' || lpad(nextval('public.factura_seq')::text, 4, '0');
end $$;

-- Ajustar el contador (al migrar facturas existentes)
create or replace function public.ajustar_contador(n int) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.es_admin() then raise exception 'No autorizado'; end if;
  if n > 0 then perform setval('public.factura_seq', greatest(n, (select coalesce(last_value,1) from public.factura_seq))); end if;
end $$;

-- Sumar o restar stock de forma segura (solo admin)
create or replace function public.sumar_stock(p_id int, p_delta int) returns int
language plpgsql security definer set search_path = public as $$
declare nuevo int;
begin
  if not public.es_admin() then raise exception 'No autorizado'; end if;
  update public.productos set stock = greatest(0, stock + p_delta), actualizado = now()
   where id = p_id returning stock into nuevo;
  return nuevo;
end $$;

-- Pedido de un cliente desde la tienda: el precio y el stock los calcula el servidor
create or replace function public.crear_pedido(p_tipo text, p_items jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  perf public.perfiles;
  t jsonb; it jsonb; pr record;
  q int; unidades int := 0; precio numeric; base numeric; promo numeric;
  lineas jsonb := '[]'::jsonb; total numeric := 0;
  dmin int; dvol numeric; mmin int; fid text; fac jsonb;
begin
  if uid is null then raise exception 'Inicia sesión para hacer tu pedido'; end if;
  if p_tipo not in ('detal','mayor') then raise exception 'Tipo de pedido no válido'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 60 then
    raise exception 'Pedido vacío o no válido'; end if;
  select * into perf from public.perfiles where id = uid;
  select data into t from public.ajustes where clave = 'tienda';
  dmin := coalesce((t->>'desc_min')::int, 6); dvol := coalesce((t->>'desc_vol')::numeric, 10); mmin := coalesce((t->>'min_mayor')::int, 6);

  for it in select * from jsonb_array_elements(p_items) loop
    q := (it->>'qty')::int;
    if q is null or q < 1 or q > 100 then raise exception 'Cantidad no válida'; end if;
    unidades := unidades + q;
  end loop;
  if p_tipo = 'mayor' and unidades < mmin then raise exception 'El pedido mayorista mínimo es de % unidades', mmin; end if;

  for it in select * from jsonb_array_elements(p_items) loop
    q := (it->>'qty')::int;
    select * into pr from public.productos where id = (it->>'pid')::int for update;
    if not found then raise exception 'Un producto ya no está disponible'; end if;
    if pr.stock < q then raise exception 'No hay stock suficiente de %', pr.data->>'name'; end if;
    if p_tipo = 'mayor' then
      precio := (pr.data->>'mayor')::numeric;
    else
      base := (pr.data->>'publico')::numeric; promo := coalesce((pr.data->>'promo')::numeric, 0);
      precio := case when promo > 0 then base * (1 - promo/100) else base end;
      if unidades >= dmin then precio := round(precio * (1 - dvol/100) / 100) * 100; end if;
    end if;
    precio := round(precio);
    update public.productos set stock = stock - q, actualizado = now() where id = pr.id;
    lineas := lineas || jsonb_build_object('pid', pr.id, 'name', (pr.data->>'brand') || ' ' || (pr.data->>'name'),
                                           'qty', q, 'price', precio,
                                           'cost', coalesce((select (data->>'compra')::numeric from public.productos_privado where id = pr.id), 0));
    total := total + precio * q;
  end loop;

  fid := 'FV-' || lpad(nextval('public.factura_seq')::text, 4, '0');
  fac := jsonb_build_object('id', fid, 'fecha', to_char(now() at time zone 'America/Bogota', 'YYYY-MM-DD'),
    'cliente', coalesce(nullif(perf.nombre,''), perf.email), 'tel', coalesce(perf.telefono,''), 'tipo', p_tipo,
    'metodo', 'Por definir', 'estado', 'pendiente', 'origen', 'web', 'items', lineas, 'total', total,
    'usuario', uid, 'email', perf.email, 'descVol', (p_tipo = 'detal' and unidades >= dmin));
  insert into public.facturas (id, usuario, data) values (fid, uid, fac);
  return fac - 'items' || jsonb_build_object('items', (select jsonb_agg(x - 'cost') from jsonb_array_elements(lineas) x));
end $$;

-- Mis pedidos (cliente): solo los suyos y sin datos internos
create or replace function public.mis_pedidos() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(
    jsonb_build_object('id', f.id, 'fecha', f.data->>'fecha', 'total', f.data->'total',
      'estado', f.data->>'estado', 'envio', coalesce(f.data->>'envio','pendiente'),
      'transp', f.data->>'transp', 'guia', f.data->>'guia', 'tipo', f.data->>'tipo',
      'items', (select jsonb_agg(jsonb_build_object('name', x->>'name', 'qty', x->'qty', 'price', x->'price'))
                from jsonb_array_elements(f.data->'items') x))
    order by f.creado desc), '[]'::jsonb)
  from public.facturas f where f.usuario = auth.uid();
$$;

-- Cambiar el rol de un usuario (solo admin; no se puede quitar el último admin)
create or replace function public.cambiar_rol(p_id uuid, p_rol text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.es_admin() then raise exception 'No autorizado'; end if;
  if p_rol not in ('cliente','admin') then raise exception 'Rol no válido'; end if;
  if p_rol = 'cliente' and (select count(*) from public.perfiles where rol = 'admin') <= 1
     and exists (select 1 from public.perfiles where id = p_id and rol = 'admin') then
    raise exception 'Debe quedar al menos un administrador';
  end if;
  update public.perfiles set rol = p_rol where id = p_id;
end $$;

-- Permisos de ejecución
revoke all on function public.siguiente_factura(), public.ajustar_contador(int), public.sumar_stock(int,int),
  public.crear_pedido(text,jsonb), public.mis_pedidos(), public.cambiar_rol(uuid,text) from public, anon;
grant execute on function public.siguiente_factura(), public.ajustar_contador(int), public.sumar_stock(int,int),
  public.crear_pedido(text,jsonb), public.mis_pedidos(), public.cambiar_rol(uuid,text), public.es_admin() to authenticated;
revoke execute on function public.nuevo_usuario(), public.proteger_perfil() from public, anon, authenticated;

-- Capa extra de seguridad: los visitantes sin cuenta (anon) solo pueden LEER el catálogo y los ajustes
revoke all on public.perfiles, public.productos_privado, public.admin_datos, public.facturas from anon;
revoke insert, update, delete on public.productos, public.ajustes from anon;
revoke truncate, references, trigger on all tables in schema public from anon, authenticated;
