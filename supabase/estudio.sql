-- =====================================================================
-- Upperfumes · ESTUDIO DE VIDEOS (granja de bots de contenido)
-- Ejecutar completo en: Supabase → SQL Editor → New query → Run
-- Requiere que schema.sql ya esté aplicado (usa public.es_admin()).
-- Es seguro volver a ejecutarlo.
-- Todo es SOLO para administradores: los clientes y visitantes no ven nada de esto.
-- =====================================================================

-- ---------- VIDEOS: una fila por video (idea → guion → producción → revisión → listo → publicado) ----------
create table if not exists public.estudio_videos (
  id          text primary key,
  estado      text not null default 'idea'
              check (estado in ('idea','guion','produccion','revision','listo','publicado','descartada')),
  data        jsonb not null default '{}'::jsonb check (pg_column_size(data) < 250000),
  creado      timestamptz not null default now(),
  actualizado timestamptz not null default now()
);
alter table public.estudio_videos enable row level security;
drop policy if exists "estudio admin videos" on public.estudio_videos;
create policy "estudio admin videos" on public.estudio_videos
  for all to authenticated using (public.es_admin()) with check (public.es_admin());
revoke all on public.estudio_videos from anon;
grant select, insert, update, delete on public.estudio_videos to authenticated;

-- ---------- COLA: pedidos a los bots ("Correr ahora") que toma el trabajador de cada PC ----------
create table if not exists public.estudio_cola (
  id          bigint generated always as identity primary key,
  bot         text not null check (bot in ('valentina','mateo','nico','tomas')),
  video_id    text references public.estudio_videos(id) on delete cascade,
  pedido_por  text not null default '',
  estado      text not null default 'pendiente' check (estado in ('pendiente','tomado','hecho','error')),
  tomado_por  text not null default '',
  nota        text not null default '',
  creado      timestamptz not null default now(),
  actualizado timestamptz not null default now()
);
alter table public.estudio_cola enable row level security;
drop policy if exists "estudio admin cola" on public.estudio_cola;
create policy "estudio admin cola" on public.estudio_cola
  for all to authenticated using (public.es_admin()) with check (public.es_admin());
revoke all on public.estudio_cola from anon;
grant select, insert, update, delete on public.estudio_cola to authenticated;

-- ---------- ARCHIVOS: videos MP4, voces y fotos del estudio (privado, solo administradores) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('estudio', 'estudio', false, 52428800,
        array['video/mp4','image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','audio/wav','audio/x-wav','audio/webm','audio/ogg'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "estudio admin ver" on storage.objects;
create policy "estudio admin ver" on storage.objects for select to authenticated
  using (bucket_id = 'estudio' and public.es_admin());
drop policy if exists "estudio admin subir" on storage.objects;
create policy "estudio admin subir" on storage.objects for insert to authenticated
  with check (bucket_id = 'estudio' and public.es_admin());
drop policy if exists "estudio admin cambiar" on storage.objects;
create policy "estudio admin cambiar" on storage.objects for update to authenticated
  using (bucket_id = 'estudio' and public.es_admin()) with check (bucket_id = 'estudio' and public.es_admin());
drop policy if exists "estudio admin borrar" on storage.objects;
create policy "estudio admin borrar" on storage.objects for delete to authenticated
  using (bucket_id = 'estudio' and public.es_admin());

-- ---------- TIEMPO REAL: que los cambios de un admin se vean al instante en el computador del otro ----------
do $$ begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'estudio_videos') then
      alter publication supabase_realtime add table public.estudio_videos;
    end if;
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'estudio_cola') then
      alter publication supabase_realtime add table public.estudio_cola;
    end if;
  end if;
end $$;
