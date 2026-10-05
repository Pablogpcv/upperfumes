const WHATSAPP="573005598061";   // número de la tienda (se puede cambiar en Admin > Empresa)
const ADMIN_CODE="UP2026";       // código para registrar administradores
const MIN_MAYOR=6;
const DESC_MIN=6;          // desde cuántos perfumes en el carrito aplica el descuento
const DESC_VOL=10;         // porcentaje de descuento por volumen (cámbialo aquí)
const REPO_GH="Pablogpcv/upperfumes";   // para leer solas las capturas de assets/img/clientes/

/* ===== Contenido de la portada (edítalo aquí) ===== */
const ANUNCIOS=["100% originales","Envíos a todo Colombia",`Lleva ${DESC_MIN} o más perfumes y obtén ${DESC_VOL}% de descuento`,"Asesoría gratis por WhatsApp"];
const DESTACADOS=[49,10,18,15,2,12,24,5,47,53];   // ids de "Los más pedidos"
const NUEVOS=10;                                 // cuántos mostrar en "Recién llegados" (los últimos agregados)
// Clientes felices: sube las capturas a la carpeta assets/img/clientes/ del repositorio y aparecen solas.
// Si prefieres escogerlas a mano, escribe aquí sus rutas (ej: "assets/img/clientes/1.jpg") y se usará esta lista.
const TESTIMONIOS=[];
// Videos de TikTok: pega los enlaces de los videos. Si está vacía, la sección no aparece.
// Ej: "https://www.tiktok.com/@upperfumes/video/7300000000000000000"
const TIKTOK_VIDEOS=[];
const REDES={instagram:"",tiktok:""};
/* ===== Descripciones ampliadas de cada perfume (por id) =====
   t: descripción · o: ocasiones · c: clima · i: intensidad (Suave, Moderada, Intensa) */
const FICHA_TXT={
1:{t:"Uomo Born in Roma es la elegancia italiana en clave moderna. Abre con la frescura verde de la hoja de violeta y la salvia, y se asienta en un vetiver ahumado que le da carácter sin perder suavidad. Un perfume pulido, fácil de llevar y que deja una impresión de hombre seguro y cuidado.",o:["Oficina","Citas","Día a día"],c:"Todo el año",i:"Moderada"},
2:{t:"Good Girl juega con el contraste entre luz y sombra: la almendra y la tuberosa aportan una dulzura luminosa, mientras el cacao le da un fondo profundo y seductor. Es femenino, atrevido y muy reconocible, de esos perfumes que hacen que te pregunten qué llevas puesto.",o:["Noche","Citas","Eventos"],c:"Clima fresco",i:"Intensa"},
3:{t:"212 VIP Rosé es pura celebración. La champaña burbujeante y la flor de melocotón le dan una salida chispeante y alegre, y el ámbar la vuelve cálida en la piel. Ideal para quien disfruta la fiesta y quiere un aroma divertido, femenino y lleno de energía.",o:["Fiestas","Salidas con amigas","Noche"],c:"Todo el año",i:"Moderada"},
4:{t:"Very Good Girl es la versión más roja y atrevida de Good Girl. La grosella roja abre jugosa y vibrante, la rosa le da un corazón romántico y la vainilla termina en una estela dulce y envolvente. Frutal, floral y con mucha personalidad.",o:["Citas","Noche","Eventos"],c:"Clima fresco",i:"Intensa"},
5:{t:"Le Male es un ícono desde los años noventa. La lavanda y la menta le dan una frescura limpia, como recién salido de la ducha, y la vainilla aporta una calidez sensual que lo hace inolvidable. Un clásico masculino que sigue conquistando.",o:["Día a día","Citas","Noche"],c:"Todo el año",i:"Moderada"},
6:{t:"Scandal es dulce y provocadora. La mandarina abre con brillo, la miel se convierte en la protagonista con un toque goloso y el pachulí le da un fondo elegante que equilibra la dulzura. Un perfume femenino con actitud.",o:["Noche","Citas","Eventos"],c:"Clima fresco",i:"Intensa"},
7:{t:"Classique es la feminidad en estado puro. El jengibre le da una chispa especiada, la rosa un corazón romántico y la vainilla un fondo empolvado y cálido. Clásico, sensual y reconocible, para la mujer que no necesita seguir modas.",o:["Día a día","Citas","Eventos"],c:"Todo el año",i:"Moderada"},
8:{t:"Royal Amber es lujo árabe en un frasco que parece una joya. La bergamota abre con frescura, el ámbar toma el protagonismo con su calidez dorada y la vainilla lo endulza en el fondo. Envolvente y elegante, perfecto para quien quiere dejar huella.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
9:{t:"Amber Noir es la cara oscura del ámbar. La bergamota da paso a un incienso profundo y un ámbar seco y amaderado, creando una estela misteriosa y sofisticada. Para quien busca un aroma con presencia y carácter.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
10:{t:"Khamrah es uno de los árabes más queridos. La canela abre cálida y especiada, los dátiles y el praliné le dan una dulzura golosa casi de postre, y todo descansa sobre un fondo ambarado. Unisex, envolvente y muy notorio.",o:["Noche","Citas","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
11:{t:"Asad es intenso y masculino. La pimienta negra abre con fuerza, el tabaco le da un corazón cálido y seco, y la vainilla suaviza el conjunto con un fondo dulce. Un perfume con presencia, para quien quiere hacerse notar.",o:["Noche","Salidas","Eventos"],c:"Clima fresco",i:"Intensa"},
12:{t:"Yara es dulce, cremosa y muy femenina. La orquídea aporta un toque floral delicado, las frutas tropicales le dan alegría y la vainilla la convierte en una caricia suave en la piel. Uno de los favoritos para el día a día.",o:["Día a día","Universidad u oficina","Salidas"],c:"Todo el año",i:"Moderada"},
13:{t:"Yum Yum es un dulce en frasco. La fresa jugosa, el algodón de azúcar y la vainilla crean un aroma goloso, alegre y juvenil. Para quien disfruta los perfumes divertidos que se notan y ponen de buen humor.",o:["Salidas","Día a día","Fiestas"],c:"Todo el año",i:"Moderada"},
14:{t:"Odyssey Mandarin Sky combina la luz cítrica de la mandarina con un fondo dulce de caramelo y haba tonka. El resultado es un perfume brillante, alegre y muy rendidor, que funciona tanto de día como de noche.",o:["Salidas","Día a día","Noche"],c:"Todo el año",i:"Intensa"},
15:{t:"Club de Nuit Intense es famoso por su proyección. La piña aporta una apertura frutal y jugosa, el abedul un toque ahumado elegante y el almizcle un fondo limpio y masculino. Un frutal ahumado que no pasa desapercibido.",o:["Noche","Eventos","Oficina"],c:"Todo el año",i:"Intensa"},
16:{t:"Bharara King combina frescura y dulzura con aire de nicho. La naranja y la bergamota abren luminosas, y el ámbar lo vuelve cálido y elegante en la piel. Versátil, moderno y con mucha presencia.",o:["Día a día","Salidas","Eventos"],c:"Todo el año",i:"Moderada"},
17:{t:"212 VIP Men es moderno y fiestero. El vodka y la menta le dan una salida fresca y vibrante, y el ámbar un fondo cálido y masculino. Pensado para las noches de salida y para quien vive la ciudad al máximo.",o:["Fiestas","Noche","Salidas"],c:"Todo el año",i:"Moderada"},
18:{t:"9PM es dulce y nocturno. La manzana abre fresca, la canela aporta calidez especiada y la vainilla deja una estela golosa y seductora. Uno de los árabes favoritos para salir de noche.",o:["Noche","Citas","Fiestas"],c:"Clima fresco",i:"Intensa"},
19:{t:"Bad Boy equilibra luz y oscuridad. La pimienta abre con energía, el cedro aporta un corazón amaderado firme y el cacao le da un fondo intenso y seductor. Para el hombre audaz que rompe las reglas con estilo.",o:["Noche","Citas","Eventos"],c:"Clima fresco",i:"Intensa"},
20:{t:"Bade'e Al Oud Oud for Glory es profundo y majestuoso. El azafrán abre especiado, el oud toma el protagonismo con su carácter amaderado y oriental, y el pachulí le da un fondo terroso. Para quienes buscan un aroma oriental intenso y sofisticado.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
21:{t:"Donna Born in Roma es floral y moderna, con alma romana. La grosella negra le da un toque frutal, el jazmín un corazón luminoso y la vainilla un fondo cálido y adictivo. Para la mujer auténtica, elegante y audaz.",o:["Citas","Eventos","Día a día"],c:"Todo el año",i:"Moderada"},
22:{t:"212 NYC Men es urbano y enérgico. La toronja abre fresca, el jengibre le da un toque especiado y el cedro un fondo amaderado limpio. Masculino, versátil y fácil de usar en cualquier momento.",o:["Oficina","Día a día","Salidas"],c:"Todo el año",i:"Moderada"},
23:{t:"9PM Night Out es la versión más vibrante de 9PM. La manzana abre llamativa, la canela aporta calidez y el haba tonka deja un fondo dulce y sensual. Hecho para la noche y para destacar.",o:["Noche","Fiestas","Citas"],c:"Clima fresco",i:"Intensa"},
24:{t:"Acqua di Giò es la frescura del Mediterráneo hecha perfume. Las notas cítricas y marinas abren limpias y luminosas, y el cedro le da un fondo amaderado elegante. Un clásico atemporal que funciona en cualquier ocasión.",o:["Día a día","Oficina","Playa y vacaciones"],c:"Clima cálido",i:"Suave"},
25:{t:"Amber Rouge es intenso y sofisticado. El azafrán abre especiado, el ámbar aporta un corazón dulce y cálido, y las maderas le dan un fondo profundo y envolvente. Un oriental con presencia, en un frasco digno de colección.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
26:{t:"Amethyst combina flores rojas con la profundidad del oud y la calidez del ámbar. Es envolvente, elegante y duradero, con un carácter floral amaderado que funciona tanto en hombres como en mujeres.",o:["Noche","Eventos","Citas"],c:"Clima fresco",i:"Intensa"},
27:{t:"Club de Nuit Oud mezcla el oud con especias y cedro sobre un fondo cálido y profundo. Amaderado, especiado y envolvente, para quien disfruta los aromas orientales con carácter.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
28:{t:"Atheeri es femenino y delicado. La pera abre fresca y jugosa, las flores blancas aportan elegancia y la vainilla un fondo suave y envolvente. Un floral frutal agradable para todos los días.",o:["Día a día","Oficina","Salidas"],c:"Todo el año",i:"Moderada"},
29:{t:"Cloud es una nube de dulzura. La lavanda y la combinación de bergamota y pera abren ligeras, y la crema batida le da un fondo cremoso y goloso. Suave, acogedor y muy adictivo.",o:["Día a día","Universidad u oficina","Salidas"],c:"Todo el año",i:"Moderada"},
30:{t:"Silver Mountain Water está inspirado en la pureza de las montañas nevadas. La bergamota abre fresca, la grosella negra aporta un toque frutal y el cedro un fondo limpio y elegante. Fresco, sofisticado y de nicho.",o:["Oficina","Día a día","Eventos de día"],c:"Clima cálido",i:"Suave"},
31:{t:"Erba Pura es exótico y luminoso. Los cítricos mediterráneos y las frutas tropicales abren con mucha energía, y el ámbar, el almizcle y la vainilla le dan un fondo cálido y envolvente. Un nicho moderno con gran presencia.",o:["Salidas","Eventos","Día a día"],c:"Todo el año",i:"Intensa"},
32:{t:"Sorbetto Rosso es el verano en frasco. La sandía jugosa, el toque salino del mar y un praliné suave crean un aroma frutal, refrescante y divertido.",o:["Día a día","Playa y vacaciones","Salidas"],c:"Clima cálido",i:"Suave"},
33:{t:"Honor & Glory es dulce y cremoso. La piña abre frutal, la vainilla aporta suavidad y el sándalo un fondo cálido y amaderado. Deja una estela envolvente y agradable.",o:["Salidas","Citas","Día a día"],c:"Todo el año",i:"Moderada"},
34:{t:"Invictus es frescura con energía de campeón. Las notas marinas y la toronja abren vibrantes, y la madera de guayaco aporta un fondo amaderado masculino. Deportivo, seguro y muy versátil.",o:["Día a día","Deporte","Salidas"],c:"Clima cálido",i:"Moderada"},
35:{t:"L'Eau d'Issey Pour Homme es icónico y atemporal. El yuzu abre cítrico y luminoso, el lirio de agua le da la frescura acuática que lo caracteriza y el cedro un fondo limpio. Elegante, sobrio y fácil de llevar.",o:["Oficina","Día a día","Eventos de día"],c:"Clima cálido",i:"Suave"},
36:{t:"Le Male Elixir es la versión más intensa del clásico. La vainilla, el haba tonka y el ámbar crean un aroma cálido, dulce y seductor, con una estela profunda e irresistible.",o:["Noche","Citas","Eventos"],c:"Clima fresco",i:"Intensa"},
37:{t:"L.12.12 Rouge es fresco y vibrante. La manzana roja abre jugosa, la pimienta rosa aporta un toque especiado y el cedro un fondo amaderado. Moderno y energético, ideal para el día a día.",o:["Día a día","Deporte","Salidas"],c:"Todo el año",i:"Moderada"},
38:{t:"Art of Universe es moderno y envolvente. Los cítricos y las notas aromáticas abren frescos, y las maderas le dan un fondo con carácter. Un aromático amaderado versátil y diferente.",o:["Día a día","Oficina","Salidas"],c:"Todo el año",i:"Moderada"},
39:{t:"Sublime es dulce y adictivo. Los frutos rojos y las frutas jugosas abren alegres, y la vainilla los envuelve en un fondo suave y femenino. Elegante y fácil de llevar.",o:["Salidas","Citas","Día a día"],c:"Todo el año",i:"Moderada"},
40:{t:"Yara Elixir es la versión más intensa de Yara. Los frutos rojos, la vainilla y el ámbar crean un aroma dulce, envolvente y elegante, con una estela más profunda.",o:["Noche","Citas","Salidas"],c:"Clima fresco",i:"Intensa"},
41:{t:"Khamrah Dukhan lleva Khamrah a un terreno más ahumado. El tabaco, las especias y el ámbar crean un aroma cálido, sofisticado y adictivo, ideal para quien quiere algo más profundo.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
42:{t:"Arabians Tonka es intenso y envolvente. El ámbar y las especias crean un corazón cálido y dulce, y las maderas le dan profundidad. Un Montale con mucha presencia y estela.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
43:{t:"Starry Nights es brillante y cautivador. La manzana abre fresca, la rosa aporta un corazón floral y el almizcle un fondo cálido y suave. Un Montale luminoso, ideal para la noche.",o:["Noche","Citas","Eventos"],c:"Todo el año",i:"Intensa"},
44:{t:"Toy 2 Bubble Gum es dulce y juguetón. El chicle de rosa abre goloso, el corazón floral le da delicadeza y las frutas cítricas un toque fresco. Lleno de color, como su frasco de osito.",o:["Día a día","Salidas","Fiestas"],c:"Todo el año",i:"Moderada"},
45:{t:"Nautica Voyage evoca la aventura del mar. La manzana verde abre fresca, la flor de loto aporta un toque acuático y el cedro un fondo limpio. Vigorizante, ligero y perfecto para el calor.",o:["Día a día","Deporte","Playa y vacaciones"],c:"Clima cálido",i:"Suave"},
46:{t:"Oud Saffron es intenso y elegante. El azafrán abre especiado, las maderas aportan profundidad y el ámbar un fondo cálido. Un oriental refinado para ocasiones especiales.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
47:{t:"1 Million es audaz y seductor. La toronja y las especias abren con energía, el cuero aporta un corazón con carácter y el ámbar y las maderas un fondo dulce y cálido. Un perfume que se nota y se recuerda.",o:["Noche","Fiestas","Citas"],c:"Clima fresco",i:"Intensa"},
48:{t:"Santal 33 es un ícono del nicho. El sándalo y el cedro forman un corazón amaderado cremoso, y el cardamomo le da un toque especiado y ligeramente ahumado. Minimalista, moderno y muy adictivo.",o:["Día a día","Oficina","Eventos"],c:"Todo el año",i:"Moderada"},
49:{t:"Sauvage es fresco, poderoso y magnético. La bergamota abre vibrante, la pimienta le da energía y el ámbar con maderas deja un fondo especiado y masculino. Uno de los perfumes más reconocidos del mundo, versátil para cualquier ocasión.",o:["Día a día","Noche","Citas"],c:"Todo el año",i:"Intensa"},
50:{t:"Shaheen Gold es sofisticado y majestuoso. El ámbar, las especias y las maderas crean un aroma oriental cálido y elegante, digno de su frasco dorado.",o:["Noche","Eventos","Ocasiones especiales"],c:"Clima fresco",i:"Intensa"},
51:{t:"Sweet Like Candy es dulce y goloso. La zarzamora abre frutal, la crema batida aporta suavidad y la vainilla un fondo cálido. Un perfume juvenil, divertido y adictivo.",o:["Día a día","Salidas","Universidad u oficina"],c:"Todo el año",i:"Moderada"},
52:{t:"Thank U, Next es audaz y dulce. La pera y la frambuesa abren jugosas, y el coco le da un fondo cremoso y tropical. Divertido, femenino y lleno de energía.",o:["Día a día","Salidas","Fiestas"],c:"Todo el año",i:"Moderada"},
53:{t:"Eros es fresco, sensual y masculino. El limón y la menta abren vibrantes, y la vainilla deja un fondo cálido y seductor. Uno de los perfumes masculinos más populares para salir y conquistar.",o:["Noche","Citas","Fiestas"],c:"Todo el año",i:"Intensa"},
54:{t:"Swiss Army Classic es fresco, limpio y aromático. Los cítricos y la lavanda abren con un carácter verde, y las notas amaderadas le dan un fondo sobrio. Clásico y versátil para el día a día.",o:["Día a día","Oficina","Deporte"],c:"Clima cálido",i:"Suave"},
55:{t:"Yara Candy es dulce y juguetona. Los frutos rojos, el toque gourmand y la vainilla crean un aroma femenino, moderno y adictivo.",o:["Día a día","Salidas","Fiestas"],c:"Todo el año",i:"Moderada"},
56:{t:"Yara Rosa es femenina y delicada. El durazno abre jugoso, las flores blancas aportan elegancia y la vainilla un fondo suave y seductor.",o:["Día a día","Citas","Salidas"],c:"Todo el año",i:"Moderada"},
57:{t:"Yara Tous es tropical y luminosa. El mango abre dulce y jugoso, las flores blancas le dan un corazón floral y la vainilla un fondo cálido. Alegre y perfecta para el calor.",o:["Día a día","Salidas","Playa y vacaciones"],c:"Clima cálido",i:"Moderada"}
};

/* ===== Vitrina del banner principal =====
   Foto: assets/img/tienda/vitrina-estanteria.webp (1600 x 893 de referencia para las zonas).
   Cada perfume de la foto es una zona z=[x1, y1, x2, y2] en píxeles y su id del catálogo.
   Si cambias la foto, actualiza estas zonas. Una zona sin id (con marca y nombre) abre una consulta por WhatsApp. */
const VFOTO={src:"assets/img/tienda/vitrina-estanteria.webp",w:1600,h:893};
const VITRINA=[
  {z:[125,241,259,356],id:49},
  {z:[267,242,400,356],id:24},
  {z:[415,242,529,356],id:47},
  {z:[536,244,688,356],id:34},
  {z:[694,246,834,356],id:53},
  {z:[855,233,979,356],id:5},
  {z:[1011,236,1138,356],id:36},
  {z:[1165,241,1309,356],id:1},
  {z:[1321,239,1471,356],id:48},
  {z:[110,384,252,502],id:2},
  {z:[254,381,400,502],id:4},
  {z:[407,381,517,502],id:3},
  {z:[517,389,665,502],id:6},
  {z:[677,390,836,502],id:21},
  {z:[861,394,1030,502],id:29},
  {z:[1030,392,1184,502],id:52},
  {z:[1199,391,1326,502],id:44},
  {z:[1335,381,1462,502],id:22},
  {z:[112,526,252,646],marca:"Yves Saint Laurent",nombre:"Libre"},
  {z:[271,527,405,646],id:11},
  {z:[436,526,574,646],id:12},
  {z:[587,529,676,646],marca:"Lattafa",nombre:"Éclaire"},
  {z:[692,527,838,646],id:10},
  {z:[866,527,1011,646],id:15},
  {z:[1031,526,1165,646],id:18},
  {z:[1192,527,1329,646],id:11},
  {z:[1340,526,1472,646],marca:"Maison Alhambra",nombre:"The Tux"},
  {z:[111,681,255,810],marca:"Dolce & Gabbana",nombre:"Q"},
  {z:[261,674,391,810],id:19},
  {z:[399,697,470,810],id:9},
  {z:[484,677,576,810],id:20},
  {z:[585,677,721,810],id:26},
  {z:[740,677,872,810],id:17},
  {z:[896,682,1066,810],id:45},
  {z:[1087,677,1236,810],id:35},
  {z:[1264,672,1479,810],id:14}
];
            // usuarios sin @, ej: instagram:"upperfumes"
const IMG={valentino:"assets/img/perfumes/valentino-uomo-born-in-roma.jpg",verygood:"assets/img/perfumes/very-good-girl.jpg",goodgirl:"assets/img/perfumes/good-girl.jpg",vip_rose:"assets/img/perfumes/212-vip-rose.jpg",lemale:"assets/img/perfumes/le-male.jpg",scandal:"assets/img/perfumes/scandal.jpg",classique:"assets/img/perfumes/classique.jpg",amber_royal:"assets/img/perfumes/royal-amber.jpg",amber_noir:"assets/img/perfumes/amber-noir.jpg",khamrah:"assets/img/perfumes/khamrah.jpg",asad:"assets/img/perfumes/asad.jpg",yara:"assets/img/perfumes/yara.jpg",yumyum:"assets/img/perfumes/yum-yum.jpg",mandarin:"assets/img/perfumes/mandarin-sky.jpg",cdn:"assets/img/perfumes/club-de-nuit-intense.jpg",bharara:"assets/img/perfumes/bharara-king.jpg",vip_men:"assets/img/perfumes/212-vip-men.jpg",ninepm:"assets/img/perfumes/9pm.jpg",bad_boy:"assets/img/perfumes/bad-boy.jpg",badee:"assets/img/perfumes/badee-al-oud.jpg",born_donna:"assets/img/perfumes/born-in-roma-donna.jpg",nyc212:"assets/img/perfumes/212-nyc-men.jpg",ninepm_no:"assets/img/perfumes/9pm-night-out.jpg",acqua:"assets/img/perfumes/acqua-di-gio.jpg",amber_rouge:"assets/img/perfumes/amber-rouge.jpg",amethyst:"assets/img/perfumes/amethyst.jpg",cdn_oud:"assets/img/perfumes/club-de-nuit-oud.jpg",atheeri:"assets/img/perfumes/atheeri.jpg",cloud:"assets/img/perfumes/cloud.jpg",silver_mw:"assets/img/perfumes/silver-mountain-water.jpg",erba_pura:"assets/img/perfumes/erba-pura.jpg",sorbetto:"assets/img/perfumes/sorbetto-rosso.jpg",honor_glory:"assets/img/perfumes/honor-and-glory.jpg",invictus:"assets/img/perfumes/invictus.jpg",issey:"assets/img/perfumes/leau-dissey-pour-homme.jpg",lemale_elixir:"assets/img/perfumes/le-male-elixir.jpg",lacoste_rouge:"assets/img/perfumes/l1212-rouge.jpg",art_universe:"assets/img/perfumes/art-of-universe.jpg",sublime:"assets/img/perfumes/sublime.jpg",yara_elixir:"assets/img/perfumes/yara-elixir.jpg",khamrah_dukhan:"assets/img/perfumes/khamrah-dukhan.jpg",arabians_tonka:"assets/img/perfumes/arabians-tonka.jpg",starry_nights:"assets/img/perfumes/starry-nights.jpg",toy2_bubble:"assets/img/perfumes/toy-2-bubble-gum.jpg",nautica:"assets/img/perfumes/nautica-voyage.jpg",oud_saffron:"assets/img/perfumes/oud-saffron.jpg",one_million:"assets/img/perfumes/1-million.jpg",santal33:"assets/img/perfumes/santal-33.jpg",sauvage:"assets/img/perfumes/sauvage.jpg",shaheen_gold:"assets/img/perfumes/shaheen-gold.jpg",sweet_candy:"assets/img/perfumes/sweet-like-candy.jpg",thank_u_next:"assets/img/perfumes/thank-u-next.jpg",eros:"assets/img/perfumes/versace-eros.jpg",victorinox:"assets/img/perfumes/swiss-army-classic.jpg",yara_candy:"assets/img/perfumes/yara-candy.jpg",yara_rosa:"assets/img/perfumes/yara-rosa.jpg",yara_tous:"assets/img/perfumes/yara-tous.jpg"};

/* fichas completas (imagen con precio, notas y descripción) */
const SHEET={nyc212:"assets/img/fichas/212-nyc-men.jpg",ninepm_no:"assets/img/fichas/9pm-night-out.jpg",acqua:"assets/img/fichas/acqua-di-gio.jpg",amber_rouge:"assets/img/fichas/amber-rouge.jpg",amethyst:"assets/img/fichas/amethyst.jpg",cdn_oud:"assets/img/fichas/club-de-nuit-oud.jpg",atheeri:"assets/img/fichas/atheeri.jpg",bharara:"assets/img/fichas/bharara-king.jpg",cloud:"assets/img/fichas/cloud.jpg",silver_mw:"assets/img/fichas/silver-mountain-water.jpg",erba_pura:"assets/img/fichas/erba-pura.jpg",sorbetto:"assets/img/fichas/sorbetto-rosso.jpg",honor_glory:"assets/img/fichas/honor-and-glory.jpg",invictus:"assets/img/fichas/invictus.jpg",issey:"assets/img/fichas/leau-dissey-pour-homme.jpg",lemale_elixir:"assets/img/fichas/le-male-elixir.jpg",lacoste_rouge:"assets/img/fichas/l1212-rouge.jpg",art_universe:"assets/img/fichas/art-of-universe.jpg",sublime:"assets/img/fichas/sublime.jpg",yara_elixir:"assets/img/fichas/yara-elixir.jpg",khamrah_dukhan:"assets/img/fichas/khamrah-dukhan.jpg",khamrah:"assets/img/fichas/khamrah.jpg",mandarin:"assets/img/fichas/mandarin-sky.jpg",arabians_tonka:"assets/img/fichas/arabians-tonka.jpg",starry_nights:"assets/img/fichas/starry-nights.jpg",toy2_bubble:"assets/img/fichas/toy-2-bubble-gum.jpg",nautica:"assets/img/fichas/nautica-voyage.jpg",oud_saffron:"assets/img/fichas/oud-saffron.jpg",badee:"assets/img/fichas/badee-al-oud.jpg",one_million:"assets/img/fichas/1-million.jpg",santal33:"assets/img/fichas/santal-33.jpg",sauvage:"assets/img/fichas/sauvage.jpg",shaheen_gold:"assets/img/fichas/shaheen-gold.jpg",sweet_candy:"assets/img/fichas/sweet-like-candy.jpg",thank_u_next:"assets/img/fichas/thank-u-next.jpg",valentino:"assets/img/fichas/valentino-uomo-born-in-roma.jpg",eros:"assets/img/fichas/versace-eros.jpg",victorinox:"assets/img/fichas/swiss-army-classic.jpg",yara_candy:"assets/img/fichas/yara-candy.jpg",yara_rosa:"assets/img/fichas/yara-rosa.jpg",yara_tous:"assets/img/fichas/yara-tous.jpg"};
const N=(n,e)=>({n,e});
const SEED=[
 {id:1,brand:"Valentino",name:"Uomo Born in Roma",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Amaderada aromática",img:"valentino",notes:[N("Hoja de violeta","🍃"),N("Salvia","🌿"),N("Vetiver ahumado","🪵")],desc:"Moderna y sofisticada: frescura aromática sobre una base amaderada. Para el hombre urbano y seguro de sí mismo.",pub:80000},
 {id:2,brand:"Carolina Herrera",name:"Good Girl",g:"Femenino",conc:"Eau de Parfum",ml:80,cat:"Diseñador",fam:"Oriental floral",img:"goodgirl",notes:[N("Almendra","🌰"),N("Tuberosa","🌼"),N("Cacao","🍫")],desc:"Dulce y atrevida, con el contraste entre la luz de las flores blancas y la profundidad del cacao."},
 {id:3,brand:"Carolina Herrera",name:"212 VIP Rosé",g:"Femenino",conc:"Eau de Parfum",ml:80,cat:"Diseñador",fam:"Floral frutal",img:"vip_rose",notes:[N("Champaña","🥂"),N("Flor de melocotón","🌸"),N("Ámbar","🟠")],desc:"Burbujeante y festiva, pensada para las noches de celebración."},
 {id:4,brand:"Carolina Herrera",name:"Very Good Girl",g:"Femenino",conc:"Eau de Parfum",ml:80,cat:"Diseñador",fam:"Floral frutal",img:"verygood",notes:[N("Grosella roja","🍒"),N("Rosa","🌹"),N("Vainilla","🍦")],desc:"La versión más intensa y roja de Good Girl: frutal, floral y envolvente."},
 {id:5,brand:"Jean Paul Gaultier",name:"Le Male",g:"Masculino",conc:"Eau de Toilette",ml:125,cat:"Diseñador",fam:"Oriental fougère",img:"lemale",notes:[N("Lavanda","💜"),N("Menta","🌿"),N("Vainilla","🍦")],desc:"Un clásico masculino, limpio y seductor, que no pasa de moda."},
 {id:6,brand:"Jean Paul Gaultier",name:"Scandal",g:"Femenino",conc:"Eau de Parfum",ml:80,cat:"Diseñador",fam:"Chipre floral",img:"scandal",notes:[N("Mandarina","🍊"),N("Miel","🍯"),N("Pachulí","🍂")],desc:"Dulce y provocadora, con la miel como protagonista."},
 {id:7,brand:"Jean Paul Gaultier",name:"Classique",g:"Femenino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Oriental floral",img:"classique",notes:[N("Jengibre","🫚"),N("Rosa","🌹"),N("Vainilla","🍦")],desc:"Femenina y empolvada, con un toque cálido de vainilla."},
 {id:8,brand:"Orientica",name:"Royal Amber",g:"Unisex",conc:"Eau de Parfum",ml:80,cat:"Árabes",fam:"Ámbar oriental",img:"amber_royal",notes:[N("Bergamota","🍋"),N("Ámbar","🟠"),N("Vainilla","🍦")],desc:"Ámbar cálido y dulce con presencia de lujo árabe."},
 {id:9,brand:"Orientica",name:"Amber Noir",g:"Unisex",conc:"Eau de Parfum",ml:80,cat:"Árabes",fam:"Ámbar amaderada",img:"amber_noir",notes:[N("Bergamota","🍋"),N("Incienso","🕯️"),N("Ámbar","🟠")],desc:"Oscuro y especiado, para quien busca una estela profunda."},
 {id:10,brand:"Lattafa",name:"Khamrah",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"khamrah",fam:"Ámbar especiada",glass:["#6A2B1A","#C0612E"],shape:"round",notes:[N("Canela","🟤"),N("Dátiles","🌴"),N("Praliné","🍬")],desc:"Gourmand especiado y dulce, de los árabes más pedidos.",pub:100000},
 {id:11,brand:"Lattafa",name:"Asad",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"asad",fam:"Ámbar especiada",glass:["#111111","#5A4A2A"],shape:"square",notes:[N("Pimienta negra","⚫"),N("Tabaco","🍂"),N("Vainilla","🍦")],desc:"Intenso y masculino, con gran duración."},
 {id:12,brand:"Lattafa",name:"Yara",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"yara",fam:"Gourmand floral",glass:["#E59AB8","#F7CFE0"],shape:"round",notes:[N("Orquídea","🌸"),N("Frutas tropicales","🥭"),N("Vainilla","🍦")],desc:"Dulce, cremosa y femenina."},
 {id:13,brand:"Armaf",name:"Yum Yum",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"yumyum",fam:"Gourmand frutal",glass:["#F08AA8","#FFC2D3"],shape:"square",notes:[N("Fresa","🍓"),N("Algodón de azúcar","🍭"),N("Vainilla","🍦")],desc:"Divertida y golosa, como un dulce en frasco."},
 {id:14,brand:"Armaf",name:"Odyssey Mandarin Sky",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"mandarin",fam:"Ámbar dulce",glass:["#E36A1E","#F7A55A"],shape:"round",notes:[N("Mandarina","🍊"),N("Caramelo","🍮"),N("Haba tonka","🫘")],desc:"Cítrico dulce y muy rendidor.",pub:75000},
 {id:15,brand:"Armaf",name:"Club de Nuit Intense",g:"Masculino",conc:"Eau de Toilette",ml:105,cat:"Árabes",img:"cdn",fam:"Chipre frutal",glass:["#0E0E10","#3A3A40"],shape:"square",notes:[N("Piña","🍍"),N("Abedul","🪵"),N("Almizcle","🤍")],desc:"Frutal ahumado, un éxito por su proyección."},
 {id:16,brand:"Bharara",name:"King",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"bharara",fam:"Ámbar fougère",glass:["#1C3A7A","#4B78D0"],shape:"heel",notes:[N("Naranja","🍊"),N("Bergamota","🍋"),N("Ámbar","🟠")],desc:"Fresco y dulce, con elegancia de nicho.",pub:110000},
 {id:17,brand:"Carolina Herrera",name:"212 VIP Men",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",img:"vip_men",fam:"Oriental especiada",glass:["#2A2A2E","#6B6B73"],shape:"flask",notes:[N("Vodka","🍸"),N("Menta","🌿"),N("Ámbar","🟠")],desc:"Fiestero y moderno."},
 {id:18,brand:"Afnan",name:"9PM",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"ninepm",fam:"Ámbar vainilla",glass:["#1A1A1A","#6A4A1E"],shape:"flask",notes:[N("Manzana","🍎"),N("Canela","🟤"),N("Vainilla","🍦")],desc:"Dulce y nocturno, ideal para salir."},
 {id:19,brand:"Carolina Herrera",name:"Bad Boy",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",img:"bad_boy",fam:"Ámbar especiada",notes:[N("Pimienta","⚫"),N("Cedro","🪵"),N("Cacao","🍫")],desc:"Intensa y seductora, equilibra luz y oscuridad. Para el hombre audaz que rompe las reglas con estilo."},
 {id:20,brand:"Lattafa",name:"Bade'e Al Oud — Oud for Glory",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",img:"badee",fam:"Ámbar amaderada",notes:[N("Azafrán","🌺"),N("Oud","🪵"),N("Pachulí","🍂")],desc:"Profunda y majestuosa, con alma de oud. Para quienes buscan un aroma oriental intenso y sofisticado.",pub:100000},
 {id:21,brand:"Valentino",name:"Donna Born in Roma",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",img:"born_donna",fam:"Ámbar floral",notes:[N("Grosella negra","🫐"),N("Jazmín","🤍"),N("Vainilla","🍦")],desc:"Floral y moderna, con alma romana. Para la mujer auténtica, elegante y audaz."},
/* --- catálogo ampliado (fichas de Drive, oct 2026) --- */
{id:22,brand:"Carolina Herrera",name:"212 NYC Men",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Amaderada especiada",img:"nyc212",notes:[N("Toronja","🍊"),N("Jengibre","🫚"),N("Madera de cedro","🪵")],desc:"Urbana, fresca y especiada sobre un fondo amaderado. Enérgica, masculina y versátil.",pub:65000},
{id:23,brand:"Afnan",name:"9 PM Night Out",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Ámbar frutal",img:"ninepm_no",notes:[N("Manzana","🍏"),N("Canela","🟤"),N("Haba tonka","🫘")],desc:"Vibrante y moderna: apertura frutal llamativa con fondo cálido y sensual. Ideal para la noche.",pub:100000},
{id:24,brand:"Giorgio Armani",name:"Acqua di Giò",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Acuática aromática",img:"acqua",notes:[N("Notas cítricas","🍋"),N("Notas marinas","🌊"),N("Madera de cedro","🪵")],desc:"Fresca, elegante y atemporal: cítricos y notas marinas sobre un fondo amaderado limpio.",pub:60000},
{id:25,brand:"Orientica",name:"Amber Rouge",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Ámbar oriental",img:"amber_rouge",notes:[N("Azafrán","🌺"),N("Ámbar","🟠"),N("Maderas","🪵")],desc:"Intensa y sofisticada: notas orientales, dulces y amaderadas para un aroma cálido y envolvente.",pub:100000},
{id:26,brand:"Lattafa",name:"Amethyst",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Floral amaderada",img:"amethyst",notes:[N("Flores rojas","🌹"),N("Oud","🪵"),N("Ámbar","🟠")],desc:"Intensa y sofisticada, con flores, maderas y ámbar. Envolvente, elegante y duradera.",pub:100000},
{id:27,brand:"Armaf",name:"Club de Nuit Oud",g:"Unisex",conc:"Eau de Parfum",ml:105,cat:"Árabes",fam:"Amaderada especiada",img:"cdn_oud",notes:[N("Oud","🪵"),N("Especias","🌶️"),N("Madera de cedro","🌲")],desc:"Acordes amaderados y especiados sobre un fondo cálido, profundo y envolvente.",pub:90000},
{id:28,brand:"Lattafa",name:"Atheeri",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Floral frutal",img:"atheeri",notes:[N("Pera","🍐"),N("Flores blancas","🤍"),N("Vainilla","🍦")],desc:"Femenina, elegante y envolvente, con carácter floral, frutal y suave.",pub:100000},
{id:29,brand:"Ariana Grande",name:"Cloud",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Gourmand floral",img:"cloud",notes:[N("Lavanda","💜"),N("Crema batida","🍦"),N("Bergamota y pera","🍐")],desc:"Irresistiblemente dulce y golosa, evoca un mundo de placer y fantasía.",pub:75000},
{id:30,brand:"Creed",name:"Silver Mountain Water",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Cítrica aromática",img:"silver_mw",notes:[N("Bergamota","🍋"),N("Grosella negra","🫐"),N("Madera de cedro","🪵")],desc:"Fresca y sofisticada: cítricos y notas acuáticas sobre maderas y almizcle, inspirada en la pureza de las montañas nevadas.",pub:60000},
{id:31,brand:"Xerjoff",name:"Erba Pura",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Ámbar frutal",img:"erba_pura",notes:[N("Cítricos mediterráneos","🍊"),N("Frutas tropicales","🥭"),N("Ámbar, almizcle y vainilla","🟠")],desc:"Cítrica, afrutada y moderna, con fondo amaderado y almizclado. Exótica, fresca y sofisticada.",pub:100000},
{id:32,brand:"Escada",name:"Sorbetto Rosso",g:"Femenino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Frutal",img:"sorbetto",notes:[N("Sandía","🍉"),N("Sal marina","🧂"),N("Praliné","🍫")],desc:"Frutal y refrescante, inspirada en el verano mediterráneo: sandía jugosa, sal marina y praliné.",pub:60000},
{id:33,brand:"Lattafa",name:"Honor & Glory",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Gourmand frutal",img:"honor_glory",notes:[N("Piña","🍍"),N("Vainilla","🍦"),N("Sándalo","🪵")],desc:"Dulce y cremosa, con acordes frutales y gourmand que dejan una estela cálida y envolvente.",pub:100000},
{id:34,brand:"Paco Rabanne",name:"Invictus",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Acuática amaderada",img:"invictus",notes:[N("Notas marinas","🌊"),N("Toronja","🍊"),N("Madera de guayaco","🪵")],desc:"Fresca, enérgica y masculina: notas marinas sobre un fondo amaderado. Para el hombre seguro de sí mismo.",pub:60000},
{id:35,brand:"Issey Miyake",name:"L'Eau d'Issey Pour Homme",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Amaderada acuática",img:"issey",notes:[N("Yuzu","🍋"),N("Lirio de agua","🪷"),N("Madera de cedro","🪵")],desc:"Icónica y atemporal: la frescura del agua con notas cítricas, especiadas y amaderadas.",pub:60000},
{id:36,brand:"Jean Paul Gaultier",name:"Le Male Elixir",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Ámbar fougère",img:"lemale_elixir",notes:[N("Vainilla","🍦"),N("Haba tonka","🫘"),N("Ámbar","🟠")],desc:"Intensa y seductora: especias cálidas, vainilla y un fondo amaderado irresistible.",pub:90000},
{id:37,brand:"Lacoste",name:"L.12.12 Rouge",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Amaderada frutal",img:"lacoste_rouge",notes:[N("Manzana roja","🍎"),N("Pimienta rosa","🌶️"),N("Madera de cedro","🪵")],desc:"Fresca y vibrante: notas frutales y amaderadas, energética y moderna. Ideal para el día a día.",pub:60000},
{id:38,brand:"Lattafa",name:"Art of Universe",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Aromática amaderada",img:"art_universe",notes:[N("Cítricos","🍊"),N("Notas aromáticas","🌿"),N("Maderas","🪵")],desc:"Moderna y envolvente, con carácter aromático, fresco y amaderado.",pub:120000},
{id:39,brand:"Lattafa",name:"Sublime",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Gourmand frutal",img:"sublime",notes:[N("Frutos rojos","🍓"),N("Frutas jugosas","🍑"),N("Vainilla","🍦")],desc:"Dulce y envolvente, con frutas frescas y vainilla. Femenina, elegante y adictiva.",pub:100000},
{id:40,brand:"Lattafa",name:"Yara Elixir",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Gourmand floral",img:"yara_elixir",notes:[N("Frutos rojos","🍒"),N("Vainilla","🍦"),N("Ámbar","🟠")],desc:"Dulce y envolvente: frutas, flores y vainilla para un aroma femenino, elegante y adictivo.",pub:80000},
{id:41,brand:"Lattafa",name:"Khamrah Dukhan",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Ámbar especiada",img:"khamrah_dukhan",notes:[N("Tabaco","🍂"),N("Especias","🌶️"),N("Ámbar","🟠")],desc:"Cálida y envolvente: notas dulces, especiadas y amaderadas. Sofisticada y adictiva.",pub:100000},
{id:42,brand:"Montale",name:"Arabians Tonka",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Ámbar amaderada",img:"arabians_tonka",notes:[N("Ámbar","🟠"),N("Especias","🌶️"),N("Maderas","🪵")],desc:"Intensa y envolvente: acordes dulces y ambarados con un toque especiado y cálido.",pub:80000},
{id:43,brand:"Montale",name:"Starry Nights",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Floral frutal",img:"starry_nights",notes:[N("Manzana","🍏"),N("Rosa","🌹"),N("Almizcle","🤍")],desc:"Brillante y cautivadora: manzana y bergamota, corazón floral y fondo cálido de almizcle y ámbar.",pub:90000},
{id:44,brand:"Moschino",name:"Toy 2 Bubble Gum",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Floral gourmand",img:"toy2_bubble",notes:[N("Chicle","🍬"),N("Rosa","🌹"),N("Frutas cítricas","🍊")],desc:"Dulce y juguetona: chicle de rosa, corazón floral y un toque cítrico y especiado. Llena de color.",pub:75000},
{id:45,brand:"Nautica",name:"Voyage",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Acuática aromática",img:"nautica",notes:[N("Manzana verde","🍏"),N("Flor de loto","🪷"),N("Madera de cedro","🪵")],desc:"Fresca y vigorizante: manzana verde y loto acuático que evocan la aventura del mar.",pub:55000},
{id:46,brand:"Orientica",name:"Oud Saffron",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Amaderada especiada",img:"oud_saffron",notes:[N("Azafrán","🌺"),N("Maderas","🪵"),N("Ámbar","🟠")],desc:"Intensa y elegante: el carácter especiado del azafrán con acordes amaderados y un fondo cálido.",pub:100000},
{id:47,brand:"Paco Rabanne",name:"1 Million",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Ámbar especiada",img:"one_million",notes:[N("Toronja y especias","🍊"),N("Cuero","🟫"),N("Ámbar y maderas","🟠")],desc:"Audaz y seductora: notas especiadas, amaderadas y dulces para un aroma distintivo y masculino.",pub:55000},
{id:48,brand:"Le Labo",name:"Santal 33",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Amaderada",img:"santal33",notes:[N("Sándalo","🪵"),N("Madera de cedro","🌲"),N("Cardamomo","🫛")],desc:"Icónica y sofisticada: maderas, especias y un toque ahumado. Moderna, minimalista y adictiva.",pub:65000},
{id:49,brand:"Dior",name:"Sauvage",g:"Masculino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Aromática fougère",img:"sauvage",notes:[N("Bergamota","🍋"),N("Pimienta","⚫"),N("Ámbar y maderas","🟠")],desc:"Fresca, poderosa y magnética: cítricos vibrantes sobre un fondo amaderado y especiado.",pub:60000},
{id:50,brand:"Lattafa",name:"Shaheen Gold",g:"Unisex",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Ámbar oriental",img:"shaheen_gold",notes:[N("Ámbar","🟠"),N("Especias","🌶️"),N("Maderas","🪵")],desc:"Sofisticada y majestuosa: notas orientales, ambaradas y amaderadas. Cálida y elegante.",pub:65000},
{id:51,brand:"Ariana Grande",name:"Sweet Like Candy",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Gourmand",img:"sweet_candy",notes:[N("Zarzamora","🫐"),N("Crema batida","🍦"),N("Vainilla","🌼")],desc:"Irresistiblemente dulce y golosa, evoca un mundo de placer y fantasía.",pub:75000},
{id:52,brand:"Ariana Grande",name:"Thank U, Next",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Diseñador",fam:"Gourmand frutal",img:"thank_u_next",notes:[N("Pera","🍐"),N("Frambuesa","🍓"),N("Coco","🥥")],desc:"Audaz y dulce: frutas jugosas con un corazón floral y un fondo cremoso.",pub:75000},
{id:53,brand:"Versace",name:"Eros",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Aromática fougère",img:"eros",notes:[N("Limón","🍋"),N("Menta","🌿"),N("Vainilla","🍦")],desc:"Fresca, sensual y masculina: cítricos, menta y manzana sobre una base cálida y amaderada.",pub:60000},
{id:54,brand:"Victorinox",name:"Swiss Army Classic",g:"Masculino",conc:"Eau de Toilette",ml:100,cat:"Diseñador",fam:"Aromática cítrica",img:"victorinox",notes:[N("Cítricos","🍊"),N("Lavanda","💜"),N("Notas amaderadas","🪵")],desc:"Fresca, limpia y aromática, con carácter verde y amaderado. Clásica y versátil para el día a día.",pub:60000},
{id:55,brand:"Lattafa",name:"Yara Candy",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Gourmand frutal",img:"yara_candy",notes:[N("Frutos rojos","🍓"),N("Dulce gourmand","🍬"),N("Vainilla","🍦")],desc:"Dulce y juguetona: frutas, vainilla y gourmand. Femenina, moderna y adictiva.",pub:80000},
{id:56,brand:"Lattafa",name:"Yara Rosa",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Floral frutal",img:"yara_rosa",notes:[N("Durazno","🍑"),N("Flores blancas","🤍"),N("Vainilla","🍦")],desc:"Femenina, delicada y envolvente: frutas, flores y vainilla en un aroma moderno y seductor.",pub:80000},
{id:57,brand:"Lattafa",name:"Yara Tous",g:"Femenino",conc:"Eau de Parfum",ml:100,cat:"Árabes",fam:"Floral tropical",img:"yara_tous",notes:[N("Mango","🥭"),N("Flores blancas","🤍"),N("Vainilla","🍦")],desc:"Tropical, dulce y luminosa, con carácter frutal y floral.",pub:80000},
];

const KEY="upperfumes_v2";
const CAT_VER=2; // súbelo cuando cambien precios del catálogo base
const prices=p=>{const pub=p.pub||150000;return{publico:pub,mayor:Math.round(pub*0.77/1000)*1000,compra:Math.round(pub*0.53/1000)*1000}};
const today=()=>new Date().toISOString().slice(0,10);
let S=load(KEY,null);
if(!S){S={seq:1,products:SEED.map(p=>({...p,stock:10,...prices(p),proveedor:"Por definir",promo:[13,14,6].includes(p.id)?10:0})),
  users:[{name:"Admin Upperfumes",email:"admin@upperfumes.co",pass:"admin123",role:"admin"}],purchases:[],invoices:[],expenses:[]}}
/* sincroniza catálogo base con datos guardados */
{const kk=p=>(p.brand+"|"+p.name).toLowerCase();S.products.forEach(p=>{if(p.brand==="Orientica"&&p.name==="Amber Royal")p.name="Royal Amber"});if(S.seeded)S.seeded=S.seeded.map(k=>k==="orientica|amber royal"?"orientica|royal amber":k);S.seeded=S.seeded||S.products.map(kk);
 SEED.forEach(sd=>{const k=kk(sd),f=S.products.find(p=>kk(p)===k);
  if(f){if(sd.img)f.img=sd.img;if(sd.pub&&(S.catVer||1)<CAT_VER){Object.assign(f,prices(sd));f.conc=sd.conc}}
  else if(!S.seeded.includes(k)){S.products.push({...sd,id:Math.max(0,...S.products.map(p=>p.id))+1,stock:10,...prices(sd),proveedor:"Por definir",promo:0})}
  if(!S.seeded.includes(k))S.seeded.push(k)});S.catVer=CAT_VER;}
let lastAdded=null;
S.company=S.company||{nombre:"Upperfumes",nit:"",telefono:"300 559 8061",email:"",direccion:"",ciudad:"",instagram:"",pie:"Gracias por tu compra. Fragancias que te elevan."};
S.providers=S.providers||[...new Set(S.products.map(p=>p.proveedor).filter(x=>x&&x!=="Por definir"))];
const waNum=()=>{const d=String(S.company.telefono||"").replace(/\D/g,"");return d?(d.startsWith("57")?d:"57"+d):WHATSAPP};
let session=load("upperfumes_session",null), cart=load("upperfumes_cart",{}), wcart={}, F={}, atab="resumen";
function load(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));localStorage.setItem("upperfumes_session",JSON.stringify(session));localStorage.setItem("upperfumes_cart",JSON.stringify(cart))}catch(e){}}
const $=id=>document.getElementById(id);
const cop=n=>"$"+Math.round(n||0).toLocaleString("es-CO");
const P=id=>S.products.find(p=>p.id==id);
const price=p=>p.promo?p.publico*(1-p.promo/100):p.publico;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=v=>parseInt(String(v).replace(/\D/g,""))||0;
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("show");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("show"),1900)}
const isAdmin=()=>session&&session.role==="admin";

function bottle(p,w){
  const [a,b]=p.glass||["#2a2620","#6b5a30"],id="g"+p.id+Math.random().toString(36).slice(2,6);
  const sh={round:'<ellipse cx="30" cy="56" rx="26" ry="32" fill="url(#ID)"/>',square:'<rect x="6" y="20" width="48" height="66" rx="5" fill="url(#ID)"/>',flask:'<path d="M14 20h32l6 12v48a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V32Z" fill="url(#ID)"/>',heel:'<path d="M10 22h40c4 14 6 30 2 46-2 10-8 18-22 18S10 78 8 68c-4-16-2-32 2-46Z" fill="url(#ID)"/>'}[p.shape||"square"].replace("ID",id);
  return `<svg class="bottle" style="width:${w}px" viewBox="0 0 60 90" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient></defs>${sh}<rect x="16" y="46" width="28" height="13" fill="rgba(245,245,220,.9)"/><rect x="20" y="51" width="20" height="2" fill="#B8952A"/><path d="M14 30c-3 10-3 30 0 44" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="22" y="2" width="16" height="14" rx="2" fill="#D4AF37"/><rect x="25" y="14" width="10" height="6" fill="#8C6F1F"/></svg>`;
}
function scene(p){
  const [a,b]=p.glass||["#2a2620","#8C6F1F"],u="s"+p.id+Math.random().toString(36).slice(2,6);
  let sd=p.id*9301+49297;const rnd=()=>(sd=(sd*9301+49297)%233280)/233280;
  let shelves="";
  [[0,62],[238,62]].forEach(([x,w])=>{[52,112,172].forEach(y=>{
    shelves+=`<rect x="${x}" y="${y}" width="${w}" height="3" fill="#3a3128"/><rect x="${x}" y="${y-2}" width="${w}" height="2" fill="#f6d9a0" opacity=".55"/><rect x="${x}" y="${y-30}" width="${w}" height="28" fill="url(#${u}gl)" opacity=".35"/>`;
    let cx=x+4;while(cx<x+w-8){const bw=6+rnd()*9,bh=12+rnd()*14,dark=rnd()>.45;shelves+=`<rect x="${cx.toFixed(1)}" y="${(y-bh-2).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${dark?"#141210":"#d8cdb4"}" opacity="${dark?.95:.55}"/>`;cx+=bw+2+rnd()*4}})});
  const box=`<g opacity=".95"><rect x="168" y="118" width="62" height="112" fill="url(#${u}bx)"/><rect x="168" y="118" width="62" height="112" fill="none" stroke="#D4AF37" stroke-width="1.2" opacity=".7"/><rect x="174" y="160" width="50" height="22" fill="#F5F5DC" opacity=".9"/><rect x="182" y="168" width="34" height="2" fill="${a}"/><rect x="188" y="174" width="22" height="1.5" fill="${a}" opacity=".6"/><rect x="230" y="122" width="8" height="108" fill="#000" opacity=".35"/></g>`;
  const sh={round:'<ellipse cx="0" cy="-52" rx="40" ry="50" fill="url(#G)"/>',square:'<rect x="-38" y="-108" width="76" height="108" rx="7" fill="url(#G)"/>',flask:'<path d="M-24 -108h48l12 20v80a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-80Z" fill="url(#G)"/>',tall:'<rect x="-28" y="-122" width="56" height="122" rx="5" fill="url(#G)"/>'}[p.shape==="heel"?"tall":(p.shape||"square")].replace("G",u+"g");
  const top=p.shape==="round"?-100:p.shape==="heel"?-122:-108;
  const bot=`${sh}<path d="M-26 ${top+16}c-6 24-6 60 0 ${-top-30}" stroke="#fff" stroke-width="5" fill="none" opacity=".22" stroke-linecap="round"/><rect x="-22" y="${top*0.55-10}" width="44" height="22" fill="#F5F5DC" opacity=".92"/><rect x="-15" y="${top*0.55-1}" width="30" height="2.4" fill="#B8952A"/><rect x="-10" y="${top*0.55+4}" width="20" height="1.6" fill="${a}" opacity=".7"/><rect x="-9" y="${top-8}" width="18" height="10" fill="#8C6F1F"/><rect x="-15" y="${top-34}" width="30" height="27" rx="3" fill="url(#${u}cap)"/>`;
  return `<svg class="scene" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.brand+" "+p.name)}" style="width:100%;height:100%;display:block">
  <defs><linearGradient id="${u}g" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient>
  <linearGradient id="${u}cap" x1="0" x2="1"><stop offset="0" stop-color="#8C6F1F"/><stop offset=".5" stop-color="#F0D57A"/><stop offset="1" stop-color="#9A7B1F"/></linearGradient>
  <linearGradient id="${u}bx" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="#0A0A0A"/></linearGradient>
  <linearGradient id="${u}gl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f6d9a0"/><stop offset="1" stop-color="#f6d9a0" stop-opacity="0"/></linearGradient>
  <linearGradient id="${u}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8d8880"/><stop offset=".5" stop-color="#5d5952"/><stop offset="1" stop-color="#3a3733"/></linearGradient>
  <radialGradient id="${u}bg" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#2a241d"/><stop offset="1" stop-color="#0c0b09"/></radialGradient></defs>
  <rect width="300" height="300" fill="url(#${u}bg)"/>${shelves}
  <rect x="70" y="0" width="160" height="200" fill="#191612"/><rect x="70" y="0" width="160" height="200" fill="url(#${u}bg)" opacity=".5"/>
  <text x="150" y="44" text-anchor="middle" font-family="Cinzel,Georgia,serif" font-size="28" fill="#D4AF37" opacity=".85">U<tspan dx="-9" dy="7">P</tspan></text>
  <text x="150" y="66" text-anchor="middle" font-family="Cinzel,Georgia,serif" font-size="10" letter-spacing="3" fill="#D4AF37" opacity=".8">UPPERFUMES</text>
  <text x="150" y="76" text-anchor="middle" font-family="Jost,Arial,sans-serif" font-size="5.5" letter-spacing="1.5" fill="#cfc9b0" opacity=".7">FRAGANCIAS QUE TE ELEVAN</text>
  <rect x="0" y="228" width="300" height="72" fill="url(#${u}m)"/><path d="M0 248c60-10 90 14 150 2s110 6 150-6M20 290c50-20 120-8 160-24s80-4 120-10M90 232c20 30 70 40 120 66" stroke="#d9d4ca" stroke-width="1" fill="none" opacity=".35"/>
  <rect x="0" y="226" width="300" height="3" fill="#cfc8b8" opacity=".5"/>
  ${box}
  <ellipse cx="118" cy="231" rx="46" ry="6" fill="#000" opacity=".45"/>
  <g transform="translate(118 229) scale(.85)">${bot}</g>
  <g transform="translate(118 233) scale(.85 -.3)" opacity=".18">${sh}</g>
  </svg>`;
}
const visual=(p,w)=>p.img&&IMG[p.img]?`<img src="${IMG[p.img]}" alt="${esc(p.brand+' '+p.name)}" loading="lazy">`:scene(p);

function go(t){
  if(t!=="producto"&&location.hash.startsWith("#/p/"))history.pushState(null,"",location.pathname+location.search);
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));$("v-"+t).classList.add("active");
  document.querySelectorAll("[data-tab]").forEach(b=>b.dataset.tab===t?b.setAttribute("aria-current","page"):b.removeAttribute("aria-current"));
  window.scrollTo(0,0);cartBar();
  if(t!=="producto")document.title="Upperfumes · Fragancias que te elevan";
  ({producto:renderProducto,promos:renderPromos,cuenta:renderAcc,tienda:()=>{renderHome();renderShop();window.vitrinaStart&&vitrinaStart()}})[t]();
}

/* ---------- tienda ---------- */
function card(p){
  return `<div class="card"><button class="ph" onclick="ficha(${p.id})" aria-label="Ver ${esc(p.name)}">${p.promo?`<span class="off">−${p.promo}%</span>`:""}${visual(p,58)}</button>
  <div class="body"><div class="br">${esc(p.brand)}</div><div class="nm">${esc(p.name)}</div>
  <span class="pbox">${cop(price(p))}${p.promo?`<s>${cop(p.publico)}</s>`:""}</span>
  <button class="add" onclick="addCart(${p.id})" ${p.stock<=0?"disabled":""}>${p.stock<=0?"Agotado":"Agregar"}</button></div></div>`;
}
const CHIPS={"Todos":{},"Femenino":{g:"Femenino"},"Masculino":{g:"Masculino"},"Unisex":{g:"Unisex"},"Árabes":{cat:"Árabes"},"Diseñador":{cat:"Diseñador"}};
const GEN={Masculino:"Hombre",Femenino:"Mujer",Unisex:"Unisex"};
const sameF=(a,b)=>a.cat==b.cat&&a.g==b.g&&a.brand==b.brand;
const matchF=p=>(!F.cat||p.cat===F.cat)&&(!F.brand||p.brand===F.brand)&&(!F.g||p.g===F.g||(F.g!=="Unisex"&&p.g==="Unisex"));
function renderShop(){
  $("chips").innerHTML=Object.keys(CHIPS).map(c=>`<button class="chip" aria-pressed="${sameF(F,CHIPS[c])}" onclick="setF(CHIPS['${c}'],true)">${c}</button>`).join("");
  const lbl=[F.cat,F.g&&GEN[F.g],F.brand].filter(Boolean);
  $("fl").innerHTML=lbl.length>1||F.brand?`<span>Mostrando: <b>${esc(lbl.join(" · "))}</b></span><button onclick="setF({},true)">Quitar filtro ✕</button>`:"";
  const q=$("q").value.trim().toLowerCase();
  const l=S.products.filter(p=>matchF(p)&&(!q||(p.brand+" "+p.name).toLowerCase().includes(q)));
  $("grid").innerHTML=l.length?l.map(card).join(""):`<p class="empty" style="grid-column:1/-1">No encontramos ese perfume. Prueba con otra marca.</p>`;
}
function toCat(){$("cat").scrollIntoView({behavior:"smooth"})}
function setF(o,stay){
  F={...o};$("q").value="";closeSheet();
  document.querySelectorAll(".dd").forEach(d=>{if(!d.matches(":hover"))return;d.classList.add("shut");d.addEventListener("mouseleave",()=>d.classList.remove("shut"),{once:true})});
  if(document.activeElement)document.activeElement.blur();
  if(!$("v-tienda").classList.contains("active"))go("tienda");else renderShop();
  if(!stay)setTimeout(toCat,60);
}

/* ---------- portada ---------- */
const brandsOf=cat=>[...new Set(S.products.filter(p=>!cat||p.cat===cat).map(p=>p.brand))].sort((a,b)=>a.localeCompare(b,"es"));
function menuBlock(cat){
  const gl=["Masculino","Femenino","Unisex"].map(g=>`<button onclick="setF({cat:'${cat}',g:'${g}'})">${GEN[g]}</button>`).join("");
  const bl=brandsOf(cat).map(b=>`<button onclick='setF(${JSON.stringify({cat,brand:b}).replace(/'/g,"&#39;")})'>${esc(b)}</button>`).join("");
  return `<div class="mcol"><small>${cat}</small><button onclick="setF({cat:'${cat}'})"><b>Ver todos</b></button>${gl}</div><div class="mcol mbrands"><small>Marcas</small><div>${bl}</div></div>`;
}
function renderMenu(){$("mega-arabes").innerHTML=menuBlock("Árabes");$("mega-disenador").innerHTML=menuBlock("Diseñador")}
function openMenu(){
  openSheet(`<h3 class="t">Explorar</h3><div class="mmob">${["Árabes","Diseñador"].map(c=>`<div class="mm">${menuBlock(c)}</div>`).join("")}
  <div class="mm mlinks"><button onclick="setF({})">Todo el catálogo</button><button onclick="closeSheet();go('promos')">Promociones</button></div></div>`);
}
function renderHome(){
  const loop=a=>a.concat(a);
  $("annc").innerHTML=loop(ANUNCIOS).map(t=>`<span>${esc(t)}</span>`).join("");
  $("brands").innerHTML=loop(brandsOf()).map(b=>`<button onclick='setF(${JSON.stringify({brand:b}).replace(/'/g,"&#39;")})'>${esc(b)}</button>`).join("");
  if($("volP"))$("volP").textContent=`Lleva ${DESC_MIN} o más perfumes y obtén ${DESC_VOL}% de descuento en todo tu pedido.`;
  $("stats").innerHTML=`<div><b>${S.products.length}</b><span>referencias disponibles</span></div><div><b>100%</b><span>originales</span></div><div><b>${DESC_VOL}%</b><span>de descuento llevando ${DESC_MIN} o más</span></div>`;
  const pic=(cat,pref)=>{const p=P(pref)&&P(pref).img?P(pref):S.products.find(x=>x.cat===cat&&x.img&&IMG[x.img]);return p&&IMG[p.img]?IMG[p.img]:""};
  const cats=[
    {t:"Árabes",d:"Lattafa, Armaf, Afnan y más. Aromas intensos y de gran duración.",img:pic("Árabes",10),fn:"setF({cat:'Árabes'})"},
    {t:"Diseñador",d:"Las casas que todos reconocen: Dior, Carolina Herrera, Versace y más.",img:pic("Diseñador",49),fn:"setF({cat:'Diseñador'})"},
    {t:"Promociones",d:`Descuentos de la semana y ${DESC_VOL}% off llevando ${DESC_MIN} o más perfumes.`,img:pic("Diseñador",6),fn:"go('promos')"}];
  $("cats").innerHTML=cats.map(c=>`<button class="catc" onclick="${c.fn}"><span class="catimg" style="background-image:url('${c.img}')"></span><span class="cattx"><b>${c.t}</b><small>${c.d}</small><em>Descubrir</em></span></button>`).join("");
  $("rNew").innerHTML=[...S.products].sort((a,b)=>b.id-a.id).slice(0,NUEVOS).map(card).join("");
  $("rFav").innerHTML=DESTACADOS.map(P).filter(Boolean).map(card).join("");
  renderClientes();
  const vids=TIKTOK_VIDEOS.map(u=>(String(u).match(/(\d{15,})/)||[])[1]).filter(Boolean);
  $("tt").innerHTML=vids.length?`<div class="sh"><h2>Síguenos en TikTok</h2><p>Reseñas, llegadas y recomendaciones.</p><div class="rule"></div></div><div class="rail tt">${vids.map(v=>`<iframe src="https://www.tiktok.com/player/v1/${v}?controls=1&loop=1&rel=0" title="Video de TikTok" loading="lazy" allow="fullscreen" allowfullscreen></iframe>`).join("")}</div>`:"";
  $("asesorBtn").href=`https://wa.me/${waNum()}?text=${encodeURIComponent("Hola Upperfumes, quiero asesoría para elegir un perfume.")}`;
  renderFooter();
}
let CLIENTES=null;
function loadClientes(){
  if(TESTIMONIOS.length){CLIENTES=TESTIMONIOS;return renderClientes()}
  fetch(`https://api.github.com/repos/${REPO_GH}/contents/assets/img/clientes`).then(r=>r.ok?r.json():[]).then(l=>{
    CLIENTES=(Array.isArray(l)?l:[]).filter(f=>/\.(jpe?g|png|webp)$/i.test(f.name)).sort((a,b)=>b.name.localeCompare(a.name,undefined,{numeric:true})).map(f=>f.path);
    renderClientes()}).catch(()=>{CLIENTES=[];renderClientes()});
}
function renderClientes(){
  const l=CLIENTES||[];
  $("testi").innerHTML=l.length?`<div class="railhead"><div class="sh"><h2>Clientes felices</h2><p>Mensajes reales de personas que ya compraron en Upperfumes.</p><div class="rule"></div></div><div class="arrows"><button aria-label="Anterior" onclick="rail('rTes',-1)">‹</button><button aria-label="Siguiente" onclick="rail('rTes',1)">›</button></div></div><div class="rail tes" id="rTes">${l.map((s,i)=>`<button class="tesb" onclick="verCliente2('${esc(s)}')" aria-label="Ver mensaje de cliente ${i+1}"><img src="${esc(s)}" alt="Mensaje de cliente ${i+1}" loading="lazy"></button>`).join("")}</div>`:"";
}
function verCliente2(s){openSheet(`<h3 class="t">Clientes felices</h3><img src="${esc(s)}" alt="Mensaje de cliente" style="width:100%;display:block;border:1px solid var(--line)">`)}
function rail(id,d){const r=$(id);r.scrollBy({left:d*r.clientWidth*.9,behavior:"smooth"})}
function renderFooter(){
  const C=S.company,ig=(C.instagram||REDES.instagram||"").replace(/^@/,""),tk=(REDES.tiktok||"").replace(/^@/,""),tel=C.telefono||"300 559 8061";
  const wa=`https://wa.me/${waNum()}`;
  $("ft").innerHTML=`<div class="ft-grid">
    <div class="ft-brand"><span class="mono"><span class="u">U</span><span class="p">P</span></span><div class="serif ft-name">UPPERFUMES</div><p>Perfumes de diseñador y árabes originales, con envíos a todo Colombia.</p>
      <div class="ft-social"><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a>${ig?`<a href="https://instagram.com/${esc(ig)}" target="_blank" rel="noopener">Instagram</a>`:""}${tk?`<a href="https://www.tiktok.com/@${esc(tk)}" target="_blank" rel="noopener">TikTok</a>`:""}</div></div>
    <div><h4>Comprar</h4><button onclick="setF({cat:'Árabes'})">Árabes</button><button onclick="setF({cat:'Diseñador'})">Diseñador</button><button onclick="setF({})">Todo el catálogo</button><button onclick="go('promos')">Promociones</button></div>
    <div><h4>Ayuda</h4><a href="${wa}?text=${encodeURIComponent("Hola Upperfumes, quiero asesoría para elegir un perfume.")}" target="_blank" rel="noopener">Asesoría para elegir</a><button onclick="go('cuenta')">Mi cuenta y pedidos</button></div>
    <div><h4>Contacto</h4><a href="${wa}" target="_blank" rel="noopener">WhatsApp ${esc(tel)}</a>${C.email?`<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`:""}${C.ciudad?`<span>${esc(C.ciudad)}</span>`:""}<span>Envíos a todo Colombia</span></div>
  </div><div class="ft-bottom">© ${new Date().getFullYear()} Upperfumes · Fragancias que te elevan</div>`;
}
const slug=s=>String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function ficha(id){const p=P(id);if(!p)return;closeSheet();location.hash="#/p/"+p.id+"-"+slug(p.brand+" "+p.name)}
let PD=null,pdQ=1,pdImg=0;
function route(){const m=location.hash.match(/^#\/p\/(\d+)/);
  if(m&&P(m[1])){PD=+m[1];pdQ=1;pdImg=0;closeSheet();go("producto")}
  else if($("v-producto").classList.contains("active"))go("tienda")}
addEventListener("hashchange",route);
const LV3=[["Salida","Lo primero que hueles, los primeros minutos"],["Corazón","El carácter del perfume, aparece después"],["Fondo","Lo que queda en la piel al final del día"]];
function renderProducto(){
  const p=P(PD);if(!p)return go("tienda");
  const X=FICHA_TXT[p.id]||{},pr=price(p),ahorro=p.promo?p.publico-pr:0;
  const imgs=[p.img&&IMG[p.img]&&{src:IMG[p.img],alt:p.brand+" "+p.name},p.img&&SHEET[p.img]&&{src:SHEET[p.img],alt:"Ficha de "+p.name}].filter(Boolean);
  const cur=imgs[pdImg]||imgs[0];const main=imgs.length?`<img class="${pdImg===1?"sheetimg":""}" src="${cur.src}" alt="${esc(cur.alt)}">`:visual(p);
  const rel=S.products.filter(x=>x.id!==p.id&&(x.fam===p.fam||x.cat===p.cat&&x.g===p.g)).sort((a,b)=>(b.fam===p.fam)-(a.fam===p.fam)).slice(0,4);
  const msg=`Hola Upperfumes, me interesa el ${p.brand} ${p.name} (${p.ml} ml) de ${cop(pr)}.`;
  $("pd").innerHTML=`<nav class="crumbs" aria-label="Ruta"><button onclick="go('tienda')">Tienda</button><span>›</span><button onclick="setF({cat:'${p.cat}'})">${esc(p.cat)}</button><span>›</span><button onclick='setF(${JSON.stringify({brand:p.brand}).replace(/'/g,"&#39;")})'>${esc(p.brand)}</button></nav>
  <div class="pd">
    <div class="pd-gal">
      <div class="pd-main">${p.promo?`<span class="off">−${p.promo}%</span>`:""}${main}</div>
      ${imgs.length>1?`<div class="pd-thumbs">${imgs.map((m,i)=>`<button aria-label="Ver imagen ${i+1}" aria-pressed="${i===pdImg}" onclick="pdImg=${i};renderProducto()"><img src="${m.src}" alt=""></button>`).join("")}</div>`:""}
    </div>
    <div class="pd-info">
      <div class="pd-badges">${p.promo?`<span class="b-off">Oferta −${p.promo}%</span>`:""}<span class="b-stock ${p.stock>0?"":"out"}">${p.stock>0?"En existencia":"Agotado"}</span></div>
      <small class="pd-brand">${esc(p.brand)}</small>
      <h1 class="pd-name">${esc(p.name)}</h1>
      <div class="pd-meta">${esc(p.conc)} · ${p.ml} ml · ${esc(p.g)}</div>
      <div class="pd-price"><b>${cop(pr)}</b>${p.promo?`<s>${cop(p.publico)}</s><span class="save">Ahorras ${cop(ahorro)}</span>`:""}</div>
      <p class="pd-lead">${esc(p.desc||"")}</p>
      <div class="pd-buy">
        <div class="pd-qrow"><span>Cantidad</span><div class="qty"><button aria-label="Quitar uno" onclick="pdQ=Math.max(1,pdQ-1);renderProducto()">−</button><span>${pdQ}</span><button aria-label="Agregar uno" onclick="pdQ=Math.min(${Math.max(1,p.stock)},pdQ+1);renderProducto()">+</button></div></div>
        <div class="pd-tot"><span>Total</span><b>${cop(pr*pdQ)}</b></div>
        <p class="pd-vol">Lleva ${DESC_MIN} o más perfumes, iguales o distintos, y obtén ${DESC_VOL}% de descuento en todo tu pedido.</p>
        <button class="primary" ${p.stock<=0?"disabled":""} onclick="addN(${p.id},pdQ)">${p.stock<=0?"Agotado":"Agregar al carrito"}</button>
        <a class="ghost" href="https://wa.me/${waNum()}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Preguntar por WhatsApp</a>
      </div>
      <ul class="pd-trust"><li>100% original</li><li>Envíos a todo Colombia</li><li>Asesoría gratis por WhatsApp</li></ul>
    </div>
  </div>
  <section class="pd-sec"><h2>Descripción</h2><p class="pd-txt">${esc(X.t||p.desc||"")}</p>
    ${X.o?`<div class="pd-chars"><div><small>Ideal para</small><span>${X.o.map(esc).join(" · ")}</span></div><div><small>Clima</small><span>${esc(X.c)}</span></div><div><small>Intensidad</small><span class="int i-${slug(X.i)}"><i></i><i></i><i></i>${esc(X.i)}</span></div></div>`:""}
  </section>
  <section class="pd-sec"><h2>Pirámide olfativa</h2>
    <div class="pyr">${(p.notes||[]).map((n,i)=>`<div><span class="nic">${n.e}</span><small>${LV3[i]?LV3[i][0]:"Nota"}</small><b>${esc(n.n)}</b><em>${LV3[i]?LV3[i][1]:""}</em></div>`).join("")}</div>
  </section>
  <section class="pd-sec"><h2>Detalles</h2>
    <dl class="pd-dl"><div><dt>Marca</dt><dd>${esc(p.brand)}</dd></div><div><dt>Familia olfativa</dt><dd>${esc(p.fam||"")}</dd></div><div><dt>Concentración</dt><dd>${esc(p.conc)}</dd></div><div><dt>Presentación</dt><dd>${p.ml} ml</dd></div><div><dt>Género</dt><dd>${esc(p.g)}</dd></div><div><dt>Categoría</dt><dd>${esc(p.cat)}</dd></div></dl>
  </section>
  ${rel.length?`<section class="pd-sec"><h2>También te puede gustar</h2><div class="grid">${rel.map(card).join("")}</div></section>`:""}`;
  document.title=`${p.brand} ${p.name} · Upperfumes`;
}
function addN(id,n){const p=P(id);let k=0;for(let i=0;i<n;i++){if((cart[id]||0)>=p.stock)break;cart[id]=(cart[id]||0)+1;k++}
  lastAdded=id;save();badge(true);toast(k?`${k} × ${p.name} agregado${k>1?"s":""}`:"No hay más unidades disponibles")}

/* ---------- carrito / pedidos ---------- */
function addCart(id){const p=P(id);if((cart[id]||0)>=p.stock){toast("No hay más unidades disponibles");return}cart[id]=(cart[id]||0)+1;lastAdded=id;save();badge(true);toast(p.name+" agregado")}
function badge(bump){const n=Object.values(cart).reduce((a,b)=>a+b,0);$("badge").hidden=!n;$("badge").textContent=n;cartBar(bump)}
const units=()=>Object.keys(cart).filter(k=>cart[k]>0&&P(k)).reduce((a,k)=>a+cart[k],0);
const volOn=()=>units()>=DESC_MIN;
const lineP=p=>volOn()?Math.round(price(p)*(1-DESC_VOL/100)/100)*100:price(p);   // precio por unidad con el descuento por volumen
function cartBar(bump){
  const ids=Object.keys(cart).filter(k=>cart[k]>0&&P(k)),n=units(),t=ids.reduce((a,k)=>a+lineP(P(k))*cart[k],0);
  const show=n>0,bar=$("cartbar");
  bar.hidden=!show;document.body.classList.toggle("has-cart",show);if(!n){bar.innerHTML="";return}
  const p=P(lastAdded&&cart[lastAdded]?lastAdded:ids[ids.length-1]);
  const sub=volOn()?`${DESC_VOL}% de descuento aplicado`:`${esc(p.name)}${ids.length>1?" y "+(ids.length-1)+" más":""}`;
  bar.innerHTML=`<div class="thumb">${visual(p,20)}</div><div class="grow"><b>${n} perfume${n>1?"s":""} · ${cop(t)}</b><small>${sub}</small></div><button onclick="openCart()">Ver carrito</button>`;
  if(bump){bar.classList.remove("bump");void bar.offsetWidth;bar.classList.add("bump")}
}
function openCart(){
  const ids=Object.keys(cart).filter(k=>cart[k]>0&&P(k));
  if(!ids.length){openSheet(`<h3 class="t">Tu carrito</h3><p class="empty">Aún no has agregado perfumes.</p><button class="primary" onclick="closeSheet();go('tienda')">Ver catálogo</button>`);return}
  let sub=0,tot=0;const ls=ids.map(k=>{const p=P(k),q=cart[k];sub+=price(p)*q;tot+=lineP(p)*q;
    return `<div class="row"><div class="thumb">${visual(p,26)}</div><div class="grow"><b>${esc(p.name)}</b><small>${cop(price(p))} c/u</small></div><div class="qty"><button onclick="chg(${p.id},-1)" aria-label="Quitar">−</button><span>${q}</span><button onclick="chg(${p.id},1)" aria-label="Agregar">+</button></div></div>`}).join("");
  const n=units(),falta=DESC_MIN-n;
  const vol=volOn()?`<div class="vol on">Descuento por volumen aplicado: ${DESC_VOL}% por llevar ${DESC_MIN} o más perfumes.</div>`
    :`<div class="vol">Agrega ${falta} perfume${falta>1?"s":""} más y obtén ${DESC_VOL}% de descuento en todo tu pedido.</div>`;
  openSheet(`<h3 class="t">Tu carrito</h3>${ls}${vol}
    ${volOn()?`<div class="total sm"><span>Subtotal</span><span>${cop(sub)}</span></div><div class="total sm"><span>Descuento ${DESC_VOL}%</span><span>−${cop(sub-tot)}</span></div>`:""}
    <div class="total"><span>Total</span><b>${cop(tot)}</b></div><button class="primary" onclick="checkout('detal')">Pedir por WhatsApp</button>`);
}
function chg(id,d){const p=P(id);cart[id]=Math.min(p.stock,Math.max(0,(cart[id]||0)+d));if(!cart[id])delete cart[id];save();badge();openCart()}
function makeInvoice({cliente,tel,tipo,items,estado,metodo,origen}){
  const inv={id:"FV-"+String(S.seq++).padStart(4,"0"),fecha:today(),cliente,tel:tel||"",tipo,metodo:metodo||"Por definir",estado,origen:origen||"admin",
    items:items.map(i=>{const p=P(i.pid);return{pid:i.pid,name:p.brand+" "+p.name,qty:i.qty,price:i.price,cost:p.compra}})};
  inv.total=inv.items.reduce((a,i)=>a+i.qty*i.price,0);
  inv.items.forEach(i=>{const p=P(i.pid);p.stock=Math.max(0,p.stock-i.qty)});
  S.invoices.unshift(inv);save();return inv;
}
function checkout(tipo){
  if(!session){closeSheet();go("cuenta");toast("Inicia sesión para hacer tu pedido");return}
  const desc=volOn();
  const items=Object.keys(cart).filter(k=>cart[k]>0&&P(k)).map(k=>({pid:+k,qty:cart[k],price:lineP(P(k))}));
  if(!items.length)return;
  const inv=makeInvoice({cliente:session.name,tel:session.phone,tipo:"detal",items,estado:"pendiente",origen:"web"});
  let m=`Hola Upperfumes, soy ${session.name}. Pedido ${inv.id}:\n`;
  inv.items.forEach(i=>m+=`• ${i.qty} x ${i.name} — ${cop(i.price)}\n`);
  if(desc)m+=`Descuento por volumen: ${DESC_VOL}% (ya incluido en los precios)\n`;
  m+=`Total: ${cop(inv.total)}`;
  cart={};save();badge();closeSheet();
  window.open(`https://wa.me/${waNum()}?text=${encodeURIComponent(m)}`,"_blank");
  toast("Pedido "+inv.id+" enviado");
}

/* ---------- mayor ---------- */
function renderW(){
  $("wLock").innerHTML=session?"":`<div class="note">Para enviar un pedido mayorista necesitas una cuenta.<br><button class="btn-line" onclick="go('cuenta')">Iniciar sesión</button></div>`;
  $("wList").innerHTML=S.products.map(p=>`<div class="row"><div class="thumb">${visual(p,26)}</div><div class="grow"><b>${esc(p.name)}</b><small>${esc(p.brand)} · ${p.ml} ml</small><small style="color:var(--gold)">Mayor ${cop(p.mayor)} <s style="color:var(--muted)">${cop(p.publico)}</s></small></div>
   <div class="qty"><button onclick="wchg(${p.id},-1)" aria-label="Quitar">−</button><span>${wcart[p.id]||0}</span><button onclick="wchg(${p.id},1)" aria-label="Agregar">+</button></div></div>`).join("");
  const u=Object.values(wcart).reduce((a,b)=>a+b,0);let t=0;for(const k in wcart)t+=P(k).mayor*wcart[k];
  $("wBar").hidden=!u;
  $("wBar").innerHTML=`<div><b>${u} uds · ${cop(t)}</b><small>${u<MIN_MAYOR?`Te faltan ${MIN_MAYOR-u} para el pedido mínimo`:"Precio mayorista aplicado"}</small></div><button onclick="checkout('mayor')" ${u<MIN_MAYOR?"disabled":""}>Enviar pedido</button>`;
}
function wchg(id,d){const p=P(id);wcart[id]=Math.min(p.stock,Math.max(0,(wcart[id]||0)+d));renderW()}

/* ---------- promos ---------- */
const COMBOS=[{t:"Dúo Carolina Herrera",d:"Good Girl + Very Good Girl",ids:[2,4],off:.1},{t:"Clásicos Gaultier",d:"Le Male + Scandal, para regalar en pareja",ids:[5,6],off:.1},{t:"Lujo árabe",d:"Amber Royal + Amber Noir",ids:[8,9],off:.12}];
function renderPromos(){
  $("combos").innerHTML=COMBOS.map((c,i)=>{const f=c.ids.reduce((a,id)=>a+P(id).publico,0);
    return `<div class="promo"><div class="imgs">${c.ids.map(id=>`<div class="thumb">${visual(P(id),26)}</div>`).join("")}</div><div><h4>${c.t}</h4><p>${c.d}</p><div class="pr">${cop(f*(1-c.off))}<s>${cop(f)}</s></div><button onclick="addCombo(${i})">Agregar combo</button></div></div>`}).join("");
  const l=S.products.filter(p=>p.promo);
  $("pgrid").innerHTML=l.length?l.map(card).join(""):`<p class="empty" style="grid-column:1/-1">Esta semana no hay productos con descuento.</p>`;
  tick();
}
function addCombo(i){COMBOS[i].ids.forEach(id=>{cart[id]=(cart[id]||0)+1;lastAdded=id});save();badge(true);toast("Combo agregado")}
function tick(){const n=new Date(),e=new Date(n);e.setDate(n.getDate()+((7-n.getDay())%7));e.setHours(23,59,59);const s=Math.max(0,(e-n)/1000);
  $("cd").innerHTML=[[Math.floor(s/86400),"días"],[Math.floor(s%86400/3600),"horas"],[Math.floor(s%3600/60),"min"]].map(([v,l])=>`<div><b>${String(v).padStart(2,"0")}</b><span>${l}</span></div>`).join("")}
setInterval(()=>{if($("v-promos").classList.contains("active"))tick()},30000);

/* ---------- cuenta ---------- */
let mode="login",role="cliente";
function renderAcc(){
  if(session)return isAdmin()?renderAdmin():renderProfile();
  $("acc").innerHTML=`<div class="sh"><h2>${mode==="login"?"Inicia sesión":"Crea tu cuenta"}</h2><div class="rule"></div></div><div class="panel">
  <div class="seg"><button aria-pressed="${mode==="login"}" onclick="mode='login';renderAcc()">Ingresar</button><button aria-pressed="${mode==="reg"}" onclick="mode='reg';renderAcc()">Registrarme</button></div>
  ${mode==="reg"?`<label>Tipo de cuenta</label><div class="role"><button aria-pressed="${role==="cliente"}" onclick="role='cliente';renderAcc()"><b>Cliente</b>Compra y sigue tus pedidos</button><button aria-pressed="${role==="admin"}" onclick="role='admin';renderAcc()"><b>Administrador</b>Inventario y contabilidad</button></div>
  <label for="fN">Nombre</label><input class="f" id="fN" autocomplete="name"><label for="fT">Celular</label><input class="f" id="fT" inputmode="tel" autocomplete="tel">`:""}
  <label for="fE">Correo</label><input class="f" id="fE" type="email" autocomplete="email">
  <label for="fP">Contraseña</label><input class="f" id="fP" type="password" autocomplete="${mode==="login"?"current-password":"new-password"}">
  ${mode==="reg"&&role==="admin"?`<label for="fC">Código de administrador</label><input class="f" id="fC"><p class="hint">Lo entrega el dueño de la tienda.</p>`:""}
  <p class="err" id="err"></p><button class="primary" onclick="${mode==="login"?"login()":"reg()"}">${mode==="login"?"Ingresar":"Crear cuenta"}</button></div>`;
}
function login(){const e=$("fE").value.trim().toLowerCase(),p=$("fP").value,u=S.users.find(x=>x.email===e&&x.pass===p);
  if(!u){$("err").textContent="Correo o contraseña incorrectos.";return}session={name:u.name,email:u.email,role:u.role,phone:u.phone||""};save();toast("Bienvenido, "+u.name.split(" ")[0]);renderAcc()}
function reg(){const n=$("fN").value.trim(),t=$("fT").value.trim(),e=$("fE").value.trim().toLowerCase(),p=$("fP").value;
  if(!n||!e||!p)return $("err").textContent="Completa nombre, correo y contraseña.";
  if(p.length<6)return $("err").textContent="La contraseña debe tener al menos 6 caracteres.";
  if(S.users.some(x=>x.email===e))return $("err").textContent="Ese correo ya tiene cuenta.";
  if(role==="admin"&&$("fC").value.trim()!==ADMIN_CODE)return $("err").textContent="El código de administrador no es válido.";
  S.users.push({name:n,email:e,pass:p,phone:t,role,fecha:today()});session={name:n,email:e,role,phone:t};save();toast("Cuenta creada");renderAcc()}
function logout(){session=null;save();mode="login";renderAcc()}
function renderProfile(){
  const mine=S.invoices.filter(i=>i.cliente===session.name&&i.origen==="web");
  $("acc").innerHTML=`<div class="sh"><h2>Tu cuenta</h2><div class="rule"></div></div><div class="panel"><div class="who"><div class="av">${esc(session.name[0])}</div><div><b>${esc(session.name)}</b><br><small style="color:var(--muted)">${esc(session.email)}</small><br><span class="pill g">Cliente</span></div></div></div>
  <div class="sh"><h2 style="font-size:19px">Mis pedidos</h2></div>${mine.length?mine.map(i=>`<div class="row"><div class="grow"><b>${i.id} · ${cop(i.total)}</b><small>${i.fecha} · ${i.items.length} referencias</small></div>${statePill(i.estado)}</div>`).join(""):`<p class="empty">Aún no tienes pedidos.</p>`}
  <button class="ghost" onclick="logout()">Cerrar sesión</button>`;
}
const statePill=s=>`<span class="pill ${s==="pagada"?"ok":s==="pendiente"?"warn":"bad"}">${s==="pagada"?"Pagada":s==="pendiente"?"Pendiente":"Anulada"}</span>`;

/* ---------- ADMIN ---------- */
function renderAdmin(){
  const tabs=[["resumen","Resumen"],["inventario","Inventario"],["compras","Compras"],["facturas","Facturas"],["clientes","Clientes"],["contabilidad","Contabilidad"],["usuarios","Usuarios"],["empresa","Empresa"]];
  $("acc").innerHTML=`<div class="sh"><h2>Administración</h2><p>${esc(session.name)}</p></div>
  <div class="atabs" role="tablist">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${atab===k}" onclick="atab='${k}';renderAdmin()">${l}</button>`).join("")}</div><div id="ab"></div>`;
  ({resumen:aResumen,inventario:aInv,compras:aCompras,facturas:aFact,clientes:aClientes,contabilidad:aConta,usuarios:aUsers,empresa:aEmpresa})[atab]();
}
const month=d=>d.slice(0,7);
function totals(m){
  const inv=S.invoices.filter(i=>i.estado==="pagada"&&(!m||month(i.fecha)===m));
  const ventas=inv.reduce((a,i)=>a+i.total,0), costo=inv.reduce((a,i)=>a+i.items.reduce((b,x)=>b+x.cost*x.qty,0),0);
  const gastos=S.expenses.filter(e=>!m||month(e.fecha)===m).reduce((a,e)=>a+e.monto,0);
  const compras=S.purchases.filter(c=>!m||month(c.fecha)===m).reduce((a,c)=>a+pTotal(c),0);
  const cxc=S.invoices.filter(i=>i.estado==="pendiente").reduce((a,i)=>a+i.total,0);
  return{ventas,costo,bruta:ventas-costo,gastos,neta:ventas-costo-gastos,compras,cxc,n:inv.length};
}
function aResumen(){
  const m=month(today()),t=totals(m),valInv=S.products.reduce((a,p)=>a+p.stock*p.compra,0),low=S.products.filter(p=>p.stock<=3);
  $("ab").innerHTML=`<div class="kpis">
   <div class="kpi"><span>Ventas del mes</span><b class="g">${cop(t.ventas)}</b></div><div class="kpi"><span>Utilidad neta del mes</span><b class="${t.neta<0?"neg":""}">${cop(t.neta)}</b></div>
   <div class="kpi"><span>Por cobrar</span><b>${cop(t.cxc)}</b></div><div class="kpi"><span>Inventario a costo</span><b>${cop(valInv)}</b></div></div>
   <div class="toolbar"><button class="btn-line" onclick="formFactura()">Nueva factura</button><button class="btn-line" onclick="formCompra()">Registrar compra</button></div>
   <div class="sh"><h2 style="font-size:19px">Stock bajo</h2><p>3 unidades o menos</p></div>
   ${low.length?low.map(p=>`<div class="row"><div class="thumb">${visual(p,26)}</div><div class="grow"><b>${esc(p.name)}</b><small>${esc(p.proveedor)}</small></div><b class="${p.stock?"stock-low":"stock-out"}">${p.stock} uds</b></div>`).join(""):`<p class="empty">Todo el inventario tiene buen stock.</p>`}
   <div class="sh"><h2 style="font-size:19px">Últimos pedidos</h2></div>${S.invoices.slice(0,4).map(invRow).join("")||`<p class="empty">Aún no hay facturas.</p>`}
   <button class="ghost" onclick="logout()">Cerrar sesión</button>`;
}
/* inventario */
function aInv(){
  $("ab").innerHTML=`<div class="toolbar"><button class="btn-line" onclick="formProducto()">Agregar producto</button><button class="btn-line" onclick="exportInv()">Exportar CSV</button></div>
  <div class="search" style="margin-top:12px"><input id="iq" placeholder="Buscar en inventario" oninput="invList()" aria-label="Buscar en inventario"></div><div id="il"></div>`;invList();
}
function invList(){
  const q=($("iq").value||"").toLowerCase();
  $("il").innerHTML=S.products.filter(p=>(p.brand+" "+p.name+" "+p.proveedor).toLowerCase().includes(q)).map(p=>{const mg=p.publico?Math.round((p.publico-p.compra)/p.publico*100):0;
   return `<div class="inv"><div class="inv-top"><div class="thumb">${visual(p,26)}</div><div class="grow"><b>${esc(p.brand)} ${esc(p.name)}</b><small>${p.ml} ml · ${esc(p.cat)}</small></div><b class="${p.stock===0?"stock-out":p.stock<=3?"stock-low":""}">${p.stock} uds</b></div>
   <div class="inv-grid"><div><span>Compra</span><b>${cop(p.compra)}</b></div><div><span>Público</span><b>${cop(p.publico)}</b></div><div><span>Mayor</span><b>${cop(p.mayor)}</b></div></div>
   <div class="inv-foot"><span>${esc(p.proveedor)} · margen ${mg}%${p.promo?` · promo −${p.promo}%`:""}</span><button onclick="formProducto(${p.id})">Editar</button></div></div>`}).join("");
}
function formProducto(id){
  const p=id?P(id):{brand:"",name:"",ml:100,g:"Unisex",cat:"Árabes",conc:"Eau de Parfum",fam:"",stock:0,compra:0,publico:0,mayor:0,proveedor:"",promo:0};
  openSheet(`<h3 class="t">${id?"Editar producto":"Nuevo producto"}</h3>
  <div class="two"><div><label>Marca</label><input class="f" id="pB" value="${esc(p.brand)}"></div><div><label>Nombre</label><input class="f" id="pN" value="${esc(p.name)}"></div></div>
  <div class="two"><div><label>Género</label><select class="f" id="pG">${["Femenino","Masculino","Unisex"].map(o=>`<option ${o===p.g?"selected":""}>${o}</option>`).join("")}</select></div><div><label>Categoría</label><select class="f" id="pC">${["Árabes","Diseñador"].map(o=>`<option ${o===p.cat?"selected":""}>${o}</option>`).join("")}</select></div></div>
  <div class="two"><div><label>Mililitros</label><input class="f" id="pM" inputmode="numeric" value="${p.ml}"></div><div><label>Stock</label><input class="f" id="pS" inputmode="numeric" value="${p.stock}"></div></div>
  <div class="two"><div><label>Precio de compra</label><input class="f" id="pCo" inputmode="numeric" value="${p.compra}"></div><div><label>Precio al público</label><input class="f" id="pPu" inputmode="numeric" value="${p.publico}"></div></div>
  <div class="two"><div><label>Precio al por mayor</label><input class="f" id="pMa" inputmode="numeric" value="${p.mayor}"></div><div><label>Promo (%)</label><input class="f" id="pPr" inputmode="numeric" value="${p.promo||0}"></div></div>
  <label>Dónde se compró (proveedor)</label><input class="f" id="pPv" value="${esc(p.proveedor)}">
  <p class="err" id="err"></p><button class="primary" onclick="saveProducto(${id||0})">Guardar producto</button>`);
}
function saveProducto(id){
  const v={brand:$("pB").value.trim(),name:$("pN").value.trim(),g:$("pG").value,cat:$("pC").value,ml:num($("pM").value),stock:num($("pS").value),compra:num($("pCo").value),publico:num($("pPu").value),mayor:num($("pMa").value),promo:Math.min(90,num($("pPr").value)),proveedor:$("pPv").value.trim()||"Por definir"};
  if(!v.brand||!v.name)return $("err").textContent="Escribe la marca y el nombre.";
  if(!v.publico)return $("err").textContent="Escribe el precio al público.";
  if(id)Object.assign(P(id),v);else S.products.push({...v,id:Math.max(...S.products.map(p=>p.id))+1,conc:"Eau de Parfum",fam:"",notes:[],desc:"",glass:["#2a2620","#8C6F1F"],shape:"square"});
  save();closeSheet();aInv();toast("Producto guardado");
}
/* fotos: se guardan en este dispositivo (IndexedDB) */
let _idb;function idb(){return _idb||(_idb=new Promise((res,rej)=>{const r=indexedDB.open("upperfumes_fotos",1);r.onupgradeneeded=()=>r.result.createObjectStore("f");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))}
async function fotoPut(id,blob){try{const d=await idb();await new Promise((res,rej)=>{const tx=d.transaction("f","readwrite");tx.objectStore("f").put(blob,id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)});return true}catch(e){return false}}
async function fotoGet(id){try{const d=await idb();return await new Promise(res=>{const r=d.transaction("f").objectStore("f").get(id);r.onsuccess=()=>res(r.result||null);r.onerror=()=>res(null)})}catch(e){return null}}
function compress(file,max=1600,q=.75){return new Promise((res,rej)=>{const img=new Image(),u=URL.createObjectURL(file);
  img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement("canvas");c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext("2d").drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?res(b):rej(new Error("img")),"image/jpeg",q)};
  img.onerror=()=>{URL.revokeObjectURL(u);rej(new Error("img"))};img.src=u})}
function verFoto(id){fotoGet(id).then(b=>{if(!b)return toast("Esa foto no está guardada en este celular");openSheet(`<h3 class="t">Foto de la factura</h3><img class="shot" style="max-height:none" src="${URL.createObjectURL(b)}" alt="Foto de la factura">`)})}

/* IA para leer facturas (si el visor lo permite) */
let AI=null;(async()=>{try{if(!window.claude||!claude.use)return;const s=await claude.use("sample");if(!s)return;const l=await s.limits().catch(()=>null);if(l&&l.images)AI=s}catch(e){}})();

/* compras */
const its=c=>c.items||[{pid:c.pid,qty:c.qty,costo:c.costo}];
const pTotal=c=>its(c).reduce((a,x)=>a+x.qty*x.costo,0);
function aCompras(){
  const t=S.purchases.reduce((a,c)=>a+pTotal(c),0);
  $("ab").innerHTML=`<div class="kpis"><div class="kpi"><span>Compras registradas</span><b>${S.purchases.length}</b></div><div class="kpi"><span>Total invertido</span><b class="g">${cop(t)}</b></div></div>
  <div class="toolbar"><button class="btn-line" onclick="formCompra()">Registrar compra</button></div>
  ${S.purchases.length?S.purchases.map(c=>{const u=its(c).reduce((a,x)=>a+x.qty,0);return `<button class="row" style="width:100%;text-align:left" onclick="verCompra(${c.id})"><div class="grow"><b>${esc(c.proveedor)}${c.photoId?" 📷":""}</b><small>${c.fecha}${c.ref?" · Fact. "+esc(c.ref):""} · ${u} uds</small><small>${its(c).map(x=>esc(P(x.pid)?.name||"Eliminado")+" ×"+x.qty).join(", ")}</small></div><b style="font-weight:500">${cop(pTotal(c))}</b></button>`}).join(""):`<p class="empty">Registra la primera compra. Sube la foto de la factura del proveedor y marca qué perfumes llegaron; el stock se actualiza solo.</p>`}`;
}
function verCompra(id){const c=S.purchases.find(x=>x.id===id);
  openSheet(`<h3 class="t">${esc(c.proveedor)}</h3><p class="hint">${c.fecha}${c.ref?" · Factura "+esc(c.ref):""}</p>
  ${c.photoId?`<img class="shot" id="cph" alt="Factura del proveedor" hidden>`:`<p class="hint">Sin foto de factura.</p>`}
  ${its(c).map(x=>`<div class="row"><div class="thumb">${P(x.pid)?visual(P(x.pid),26):""}</div><div class="grow"><b>${esc(P(x.pid)?.name||"Producto eliminado")}</b><small>${x.qty} × ${cop(x.costo)}</small></div><span>${cop(x.qty*x.costo)}</span></div>`).join("")}
  <div class="total"><span>Total</span><b>${cop(pTotal(c))}</b></div>`);
  if(c.photoId)fotoGet(c.photoId).then(b=>{const el=$("cph");if(!el)return;if(b){el.src=URL.createObjectURL(b);el.hidden=false}else el.outerHTML=`<p class="hint">La foto está guardada en otro dispositivo.</p>`});
}
let CP=null;
function formCompra(){CP={blob:null,url:null,proveedor:"",nuevo:false,items:{},fecha:today(),ref:"",q:"",miss:[],msg:""};drawCompra()}
function drawCompra(keep){
  openSheet(`<h3 class="t">Registrar compra</h3>
  <div class="step">1. Foto de la factura</div><div id="cpPhoto"></div>
  <div class="step">2. Proveedor</div><div id="cpProv"></div>
  <div class="step">3. ¿Qué llegó?</div>
  <div class="search" style="margin-bottom:0"><input placeholder="Buscar perfume" value="${esc(CP.q)}" oninput="CP.q=this.value;cpList()" aria-label="Buscar perfume"></div>
  <div id="cpList"></div>
  <div class="two"><div><label for="cF">Fecha</label><input class="f" id="cF" type="date" value="${CP.fecha}" onchange="CP.fecha=this.value"></div><div><label for="cR">N° factura proveedor</label><input class="f" id="cR" value="${esc(CP.ref)}" oninput="CP.ref=this.value"></div></div>
  <div class="sumbar" id="cpSum"></div>`,keep);
  cpPhoto();cpProv();cpList();cpSum();
}
function cpPhoto(){
  $("cpPhoto").innerHTML=CP.url?`<img class="shot" src="${CP.url}" alt="Factura del proveedor">
   <div class="two" style="margin-top:8px"><label class="btn-line fileb">Cambiar foto<input type="file" accept="image/*" onchange="pickCompra(this)"></label>${AI?`<button class="btn-gold" style="margin:0" id="aiBtn" onclick="leerFactura()">Leer con IA</button>`:`<span></span>`}</div>
   <p class="aimsg" id="aiMsg">${CP.msg||(AI?"La IA propone proveedor, perfumes, cantidades y precios. Revisa antes de guardar.":"")}</p>${CP.miss.length?`<p class="miss">Sin identificar: ${CP.miss.map(esc).join(", ")}. Agrégalos a mano si aplican.</p>`:""}`
  :`<label class="upload"><input type="file" accept="image/*" onchange="pickCompra(this)">📷 Tomar o subir foto de la factura</label><p class="hint">Opcional, pero queda como soporte de la compra.</p>`;
}
async function pickCompra(inp){const f=inp.files&&inp.files[0];if(!f)return;
  try{CP.blob=await compress(f);CP.url=URL.createObjectURL(CP.blob);CP.msg="";CP.miss=[];cpPhoto()}catch(e){toast("No se pudo leer esa imagen")}}
function cpProv(){
  $("cpProv").innerHTML=`<div class="chips wrap">${S.providers.map((p,i)=>`<button class="chip" aria-pressed="${!CP.nuevo&&CP.proveedor===p}" onclick="CP.nuevo=false;CP.proveedor=S.providers[${i}];cpProv()">${esc(p)}</button>`).join("")}
  <button class="chip" aria-pressed="${CP.nuevo}" onclick="CP.nuevo=true;if(S.providers.includes(CP.proveedor))CP.proveedor='';cpProv();setTimeout(()=>$('npv')&&$('npv').focus(),0)">+ Nuevo proveedor</button></div>
  ${CP.nuevo?`<input class="f" id="npv" style="margin-top:8px" placeholder="Nombre del proveedor" value="${esc(CP.proveedor)}" oninput="CP.proveedor=this.value">`:""}`;
}
function cpList(){
  const q=CP.q.toLowerCase(),it=id=>CP.items[id]||{qty:0,costo:P(id).compra};
  const l=S.products.filter(p=>(p.brand+" "+p.name).toLowerCase().includes(q)).sort((a,b)=>(it(b.id).qty>0)-(it(a.id).qty>0));
  $("cpList").innerHTML=l.map(p=>{const x=it(p.id);return `<div class="row ${x.qty?"sel":""}" style="padding-left:6px;padding-right:6px"><div class="thumb">${visual(p,26)}</div>
   <div class="grow"><b>${esc(p.brand)} ${esc(p.name)}</b><small>${p.ml} ml · stock ${p.stock}</small>${x.qty?`<div class="cost"><span>Costo c/u</span><input class="f" inputmode="numeric" value="${x.costo}" aria-label="Costo ${esc(p.name)}" onchange="CP.items[${p.id}].costo=num(this.value);cpSum()"></div>`:""}</div>
   <div class="qty"><button onclick="cpQ(${p.id},-1)" aria-label="Quitar">−</button><span>${x.qty}</span><button onclick="cpQ(${p.id},1)" aria-label="Agregar">+</button></div></div>`}).join("")||`<p class="empty">No está en el catálogo. Créalo en Inventario > Agregar producto.</p>`;
}
function cpQ(id,d){const x=CP.items[id]||{qty:0,costo:P(id).compra};x.qty=Math.max(0,x.qty+d);CP.items[id]=x;cpList();cpSum()}
function cpSum(){const s=Object.values(CP.items).filter(x=>x.qty>0),u=s.reduce((a,x)=>a+x.qty,0),t=s.reduce((a,x)=>a+x.qty*x.costo,0);
  $("cpSum").innerHTML=`<div class="total" style="margin-top:0"><span>${u} uds · ${s.length} referencias</span><b>${cop(t)}</b></div><p class="err" id="err" style="margin-top:4px;min-height:0"></p><button class="primary" onclick="saveCompra()">Guardar compra</button>`}
async function leerFactura(){
  const b=$("aiBtn");b.disabled=true;b.textContent="Leyendo…";$("aiMsg").textContent="Analizando la foto, puede tardar unos segundos.";
  const cat=S.products.map(p=>`${p.id}: ${p.brand} ${p.name} ${p.ml}ml`).join("\n");
  const prompt=`La imagen es la foto de una factura de compra a un proveedor de perfumes en Colombia. Extrae sus datos.
Catálogo de la tienda (id: producto):
${cat}
Proveedores ya conocidos: ${S.providers.join(", ")||"ninguno"}
Responde SOLO con JSON, sin texto adicional, con esta forma:
{"proveedor":"nombre del proveedor (usa el nombre conocido si coincide)","numero":"número de factura o vacío","fecha":"YYYY-MM-DD o vacío","items":[{"id":id del catálogo,"cantidad":número,"costo_unitario":precio unitario en pesos como número entero}],"no_identificados":["descripción de líneas que no correspondan claramente a un producto del catálogo"]}
Asigna una línea a un id solo si es claramente el mismo perfume. Si el precio es total de la línea, divídelo por la cantidad.`;
  try{const r=await AI.json(prompt,{images:[CP.blob],modelTier:"default"});
    if(r.proveedor){const m=S.providers.find(p=>p.toLowerCase()===String(r.proveedor).trim().toLowerCase());CP.proveedor=m||String(r.proveedor).trim();CP.nuevo=!m}
    if(r.numero)CP.ref=String(r.numero);if(/^\d{4}-\d{2}-\d{2}$/.test(r.fecha||""))CP.fecha=r.fecha;
    let n=0;(r.items||[]).forEach(i=>{const p=P(i.id);const q=Math.round(+i.cantidad||0);if(p&&q>0){CP.items[p.id]={qty:q,costo:Math.round(+i.costo_unitario)||p.compra};n++}});
    CP.miss=Array.isArray(r.no_identificados)?r.no_identificados.map(String):[];
    CP.msg=n?`Encontré ${n} referencia${n>1?"s":""}. Revisa cantidades, precios y proveedor antes de guardar.`:"No identifiqué productos del catálogo. Márcalos abajo.";
    drawCompra(true);
  }catch(e){CP.msg=e&&e.code==="not_granted"?"Debes aprobar el uso de IA para leer facturas. Mientras tanto márcalos abajo.":e&&e.code==="rate_limited"?"La IA está ocupada, intenta en un momento o márcalos abajo.":"No pude leer la factura. Marca los perfumes abajo.";cpPhoto()}
}
async function saveCompra(){
  const items=Object.entries(CP.items).filter(([,v])=>v.qty>0).map(([k,v])=>({pid:+k,qty:v.qty,costo:v.costo})),prov=(CP.proveedor||"").trim(),err=m=>$("err").textContent=m;
  if(!prov)return err("Elige o escribe el proveedor.");
  if(!items.length)return err("Marca al menos un perfume con su cantidad.");
  if(items.some(i=>!i.costo))return err("Falta el costo de algún perfume.");
  let photoId=null;if(CP.blob){photoId="c"+Date.now();if(!await fotoPut(photoId,CP.blob)){photoId=null;toast("La foto no se pudo guardar")}}
  S.purchases.unshift({id:Date.now(),fecha:CP.fecha||today(),proveedor:prov,ref:CP.ref.trim(),photoId,items});
  items.forEach(i=>{const p=P(i.pid);p.stock+=i.qty;p.compra=i.costo;p.proveedor=prov});
  if(!S.providers.some(x=>x.toLowerCase()===prov.toLowerCase()))S.providers.push(prov);
  const u=items.reduce((a,i)=>a+i.qty,0);save();closeSheet();atab="compras";renderAdmin();toast(`Compra guardada · +${u} uds al inventario`);
}
/* facturas */
let fFilter="todas";
const invRow=i=>`<button class="row" style="width:100%;text-align:left" onclick="verFactura('${i.id}')"><div class="grow"><b>${i.id} · ${esc(i.cliente)}${i.photoId?" 📷":""}</b><small>${i.fecha} · ${i.tipo==="mayor"?"Por mayor":"Detal"}${i.origen==="web"?" · pedido web":""}</small></div><div style="text-align:right"><b style="font-weight:500">${cop(i.total)}</b><br>${statePill(i.estado)}</div></button>`;
function aFact(){
  const l=S.invoices.filter(i=>fFilter==="todas"||i.estado===fFilter);
  $("ab").innerHTML=`<div class="toolbar"><button class="btn-line" onclick="formFactura()">Nueva factura</button></div>
  <div class="chips" style="margin-top:12px">${[["todas","Todas"],["pendiente","Pendientes"],["pagada","Pagadas"],["anulada","Anuladas"]].map(([k,t])=>`<button class="chip" aria-pressed="${fFilter===k}" onclick="fFilter='${k}';aFact()">${t}</button>`).join("")}</div>
  ${l.length?l.map(invRow).join(""):`<p class="empty">No hay facturas en esta vista. Los pedidos de la tienda llegan aquí como pendientes.</p>`}`;
}
let lines=[],FV={blob:null,url:null};
function formFactura(){leadConv=null;lines=[{pid:S.products[0].id,qty:1}];FV={blob:null,url:null};drawFactura()}
function drawFactura(keep){
  const v=keep||{c:"",t:"",tipo:"detal",m:"Efectivo",e:"pagada"};
  const pr=l=>{const p=P(l.pid);return v.tipo==="mayor"?p.mayor:price(p)};
  const tot=lines.reduce((a,l)=>a+pr(l)*l.qty,0);
  openSheet(`<h3 class="t">Nueva factura</h3>
  <div class="two"><div><label for="vC">Cliente</label><input class="f" id="vC" value="${esc(v.c)}"></div><div><label for="vT">Celular</label><input class="f" id="vT" inputmode="tel" value="${esc(v.t)}"></div></div>
  <div class="two"><div><label for="vTi">Tipo de venta</label><select class="f" id="vTi" onchange="drawFactura(fv())"><option value="detal" ${v.tipo==="detal"?"selected":""}>Detal</option><option value="mayor" ${v.tipo==="mayor"?"selected":""}>Por mayor</option></select></div>
  <div><label for="vM">Método de pago</label><select class="f" id="vM">${["Efectivo","Transferencia","Nequi","Daviplata","Tarjeta"].map(o=>`<option ${o===v.m?"selected":""}>${o}</option>`).join("")}</select></div></div>
  <label>Productos</label>${lines.map((l,i)=>`<div class="line-item"><select class="f" aria-label="Producto" onchange="lines[${i}].pid=+this.value;drawFactura(fv())">${S.products.map(p=>`<option value="${p.id}" ${p.id==l.pid?"selected":""}>${esc(p.brand+" "+p.name)} (${p.stock})</option>`).join("")}</select><input class="f" inputmode="numeric" value="${l.qty}" aria-label="Cantidad" onchange="lines[${i}].qty=Math.max(1,num(this.value));drawFactura(fv())"><button class="x" aria-label="Quitar" onclick="lines.splice(${i},1);if(!lines.length)lines.push({pid:S.products[0].id,qty:1});drawFactura(fv())">×</button></div>`).join("")}
  <button class="ghost" onclick="lines.push({pid:S.products[0].id,qty:1});drawFactura(fv())">Agregar otro producto</button>
  <label for="vE">Estado</label><select class="f" id="vE"><option value="pagada" ${v.e==="pagada"?"selected":""}>Pagada</option><option value="pendiente" ${v.e==="pendiente"?"selected":""}>Pendiente</option></select>
  <label>Foto del comprobante (opcional)</label>
  ${FV.url?`<img class="shot" src="${FV.url}" alt="Comprobante"><label class="btn-line fileb" style="margin-top:8px">Cambiar foto<input type="file" accept="image/*" onchange="pickFV(this)"></label>`:`<label class="upload"><input type="file" accept="image/*" onchange="pickFV(this)">📷 Subir foto (transferencia, recibo…)</label>`}
  <div class="total"><span>Total</span><b>${cop(tot)}</b></div><p class="err" id="err"></p>
  <button class="primary" onclick="saveFactura()">Crear factura</button>`,!!keep);
}
const fv=()=>({c:$("vC").value,t:$("vT").value,tipo:$("vTi").value,m:$("vM").value,e:$("vE").value});
async function pickFV(inp){const f=inp.files&&inp.files[0];if(!f)return;try{FV.blob=await compress(f);FV.url=URL.createObjectURL(FV.blob);drawFactura(fv())}catch(e){toast("No se pudo leer esa imagen")}}
async function saveFactura(){
  const v=fv();if(!v.c.trim())return $("err").textContent="Escribe el nombre del cliente.";
  const need={};lines.forEach(l=>need[l.pid]=(need[l.pid]||0)+l.qty);
  for(const k in need){if(P(k).stock<need[k])return $("err").textContent=`No hay stock suficiente de ${P(k).name} (quedan ${P(k).stock}).`}
  const inv=makeInvoice({cliente:v.c.trim(),tel:v.t,tipo:v.tipo,metodo:v.m,estado:v.e,items:lines.map(l=>({pid:l.pid,qty:l.qty,price:v.tipo==="mayor"?P(l.pid).mayor:price(P(l.pid))}))});
  if(FV.blob){const id="v"+Date.now();if(await fotoPut(id,FV.blob)){inv.photoId=id;save()}}
  if(leadConv){S.leads=(S.leads||[]).filter(l=>l.id!==leadConv);leadConv=null;save()}
  atab="facturas";renderAdmin();toast("Factura "+inv.id+" creada");verFactura(inv.id);
}
const fdate=d=>new Date(d+"T12:00:00").toLocaleDateString("es-CO",{day:"2-digit",month:"long",year:"numeric"});
const stName=s=>s==="pagada"?"PAGADA":s==="pendiente"?"PENDIENTE DE PAGO":"ANULADA";
function paper(i){const C=S.company;
  const info=[C.nit&&"NIT/CC "+C.nit,C.telefono&&"Tel/WhatsApp "+C.telefono,C.email,[C.direccion,C.ciudad].filter(Boolean).join(", "),C.instagram&&"IG "+C.instagram].filter(Boolean);
  return `<div class="paper"><div class="pp-head"><div class="pp-logo"><span class="mono"><span class="u">U</span><span class="p">P</span></span><div><b>${esc((C.nombre||"Upperfumes").toUpperCase())}</b><small>fragancias que te elevan</small></div></div><div class="pp-no"><small>FACTURA DE VENTA</small><b>${i.id}</b></div></div>
  <div class="pp-body"><div class="pp-cols"><div><h5>EMITIDA POR</h5><b>${esc(C.nombre||"Upperfumes")}</b><br>${info.map(esc).join("<br>")}</div>
  <div><h5>CLIENTE</h5><b>${esc(i.cliente)}</b>${i.tel?"<br>"+esc(i.tel):""}<br>${fdate(i.fecha)}<br>${i.tipo==="mayor"?"Venta por mayor":"Venta al detal"} · ${esc(i.metodo)}</div></div>
  <table class="pp-t"><thead><tr><th>Producto</th><th class="r">Cant.</th><th class="r">Precio</th><th class="r">Subtotal</th></tr></thead><tbody>
  ${i.items.map(x=>`<tr><td>${esc(x.name)}</td><td class="r">${x.qty}</td><td class="r">${cop(x.price)}</td><td class="r">${cop(x.qty*x.price)}</td></tr>`).join("")}</tbody></table>
  <div class="pp-total"><span>TOTAL</span><span>${cop(i.total)}</span></div>
  <div style="text-align:right"><span class="pp-stamp">${stName(i.estado)}</span></div>
  <div class="pp-foot">${esc(C.pie||"")}<br>Documento interno de venta. No reemplaza la factura electrónica DIAN.</div></div></div>`}
function verFactura(id){
  const i=S.invoices.find(x=>x.id===id);
  openSheet(`${paper(i)}
  <div class="two" style="margin-top:12px"><button class="btn-gold" style="margin:0" onclick="pdfFactura('${i.id}')">Descargar PDF</button><button class="btn-line" onclick="sendInv('${i.id}')">Enviar por WhatsApp</button></div>
  ${i.photoId?`<button class="ghost" onclick="verFoto('${i.photoId}')">Ver foto adjunta</button>`:`<label class="ghost fileb">📷 Adjuntar foto del comprobante<input type="file" accept="image/*" onchange="attachFV('${i.id}',this)"></label>`}
  ${i.estado==="pendiente"?`<label for="pm">Método de pago</label><select class="f" id="pm">${["Efectivo","Transferencia","Nequi","Daviplata","Tarjeta"].map(o=>`<option ${o===i.metodo?"selected":""}>${o}</option>`).join("")}</select><button class="primary" onclick="setEstado('${i.id}','pagada')">Marcar como pagada</button>`:""}
  ${i.estado!=="anulada"?`<button class="ghost" style="color:var(--bad)" onclick="if(confirm('¿Anular ${i.id}? El stock vuelve al inventario.'))setEstado('${i.id}','anulada')">Anular factura</button>`:""}`);
  setTimeout(()=>prepShare(id),50);
}
async function attachFV(id,inp){const f=inp.files&&inp.files[0];if(!f)return;try{const b=await compress(f),pid="v"+Date.now();if(!await fotoPut(pid,b))return toast("No se pudo guardar la foto");S.invoices.find(x=>x.id===id).photoId=pid;save();verFactura(id);if(atab==="facturas")aFact();toast("Foto adjuntada")}catch(e){toast("No se pudo leer esa imagen")}}
function setEstado(id,e){const i=S.invoices.find(x=>x.id===id);
  if(e==="anulada")i.items.forEach(x=>{const p=P(x.pid);if(p)p.stock+=x.qty});
  if(e==="pagada"&&$("pm"))i.metodo=$("pm").value;
  i.estado=e;save();renderAdmin();verFactura(id);toast(e==="pagada"?"Factura pagada":"Factura anulada")}
const PRE={};
function invImage(id){const i=S.invoices.find(x=>x.id===id);
  return (async()=>{if(!window.html2canvas)throw new Error("h2c");
    const box=document.createElement("div");box.style.cssText="position:fixed;left:-10000px;top:0;width:420px;background:#fff";box.innerHTML=paper(i);document.body.appendChild(box);
    try{if(document.fonts&&document.fonts.ready)await document.fonts.ready;const c=await html2canvas(box.firstElementChild,{scale:2.5,backgroundColor:"#ffffff",logging:false});
      return await new Promise((r,j)=>c.toBlob(b=>b?r(b):j(new Error("png")),"image/png"))}finally{box.remove()}})()}
function prepShare(id){const i=S.invoices.find(x=>x.id===id);
  PRE[id]=Promise.all([invImage(id).catch(()=>null),i.photoId?fotoGet(i.photoId):null])}
function invText(i){const C=S.company;let m=`*${C.nombre||"Upperfumes"}* · Factura ${i.id}\nFecha: ${fdate(i.fecha)}\nCliente: ${i.cliente}\n\n`;i.items.forEach(x=>m+=`• ${x.qty} x ${x.name}: ${cop(x.qty*x.price)}\n`);return m+`\n*Total: ${cop(i.total)}*\nEstado: ${stName(i.estado).toLowerCase()}\n\n${C.pie||""}`}
function waLink(i){const to=String(i.tel||"").replace(/\D/g,"");return `https://wa.me/${to?(to.startsWith("57")?to:"57"+to):""}?text=${encodeURIComponent(invText(i))}`}
async function sendInv(id){const i=S.invoices.find(x=>x.id===id);
  if(!PRE[id])prepShare(id);
  const [img,foto]=await PRE[id];
  const files=[];if(img)files.push(new File([img],`${i.id}-upperfumes.png`,{type:"image/png"}));if(foto)files.push(new File([foto],`${i.id}-comprobante.jpg`,{type:"image/jpeg"}));
  if(files.length&&navigator.canShare&&navigator.canShare({files})){
    try{await navigator.share({files,text:invText(i)});return}catch(e){if(e&&e.name==="AbortError")return}}
  if(img&&DL){try{await DL.save({filename:`${i.id}-upperfumes.png`,data:img});toast("Imagen guardada: adjúntala en el chat de WhatsApp")}catch(e){if(e&&e.code==="cancelled")return}}
  else toast("Este navegador solo permite enviar el texto");
  window.open(waLink(i),"_blank");
}
function buildPDF(i){
  const {jsPDF}=window.jspdf,d=new jsPDF({unit:"mm",format:"a4"}),C=S.company,W=210,M=16;
  const G=[212,175,55],B=[10,10,10],CR=[245,245,220],GR=[110,110,110],DG=[154,123,31];
  d.setFillColor(...B);d.rect(0,0,W,44,"F");
  d.setFont("times","normal");d.setTextColor(...G);d.setFontSize(34);d.text("U",M,25);d.text("P",M+7.2,31);
  d.setFontSize(19);d.text((C.nombre||"Upperfumes").toUpperCase(),M+26,23,{charSpace:1.5});
  d.setFontSize(9.5);d.setTextColor(...CR);d.text("fragancias que te elevan",M+26,30.5,{charSpace:.3});
  d.setFont("helvetica","bold");d.setFontSize(8.5);d.setTextColor(...G);d.text("FACTURA DE VENTA",W-M,18,{align:"right"});
  d.setFont("times","normal");d.setFontSize(18);d.text(i.id,W-M,27,{align:"right"});
  d.setFont("helvetica","normal");d.setFontSize(9);d.setTextColor(...CR);d.text(fdate(i.fecha),W-M,34,{align:"right"});
  let y=58;d.setFont("helvetica","bold");d.setFontSize(8);d.setTextColor(...DG);d.text("EMITIDA POR",M,y);d.text("CLIENTE",112,y);
  y+=6;d.setFontSize(11);d.setTextColor(20,20,20);d.text(C.nombre||"Upperfumes",M,y);d.text(i.cliente,112,y,{maxWidth:82});
  d.setFont("helvetica","normal");d.setFontSize(9);d.setTextColor(...GR);
  const ci=[C.nit&&"NIT/CC "+C.nit,C.telefono&&"Tel/WhatsApp "+C.telefono,C.email,[C.direccion,C.ciudad].filter(Boolean).join(", "),C.instagram&&"Instagram "+C.instagram].filter(Boolean);
  const cl=[i.tel&&"Cel. "+i.tel,(i.tipo==="mayor"?"Venta por mayor":"Venta al detal"),"Pago: "+i.metodo].filter(Boolean);
  ci.forEach((l,k)=>d.text(l,M,y+5+k*4.6));cl.forEach((l,k)=>d.text(l,112,y+5+k*4.6));
  y+=8+Math.max(ci.length,cl.length)*4.6+6;
  d.setDrawColor(...G);d.setLineWidth(.5);d.line(M,y,W-M,y);
  y+=6;d.setFont("helvetica","bold");d.setFontSize(8);d.setTextColor(...DG);
  d.text("PRODUCTO",M,y);d.text("CANT.",128,y,{align:"right"});d.text("PRECIO",160,y,{align:"right"});d.text("SUBTOTAL",W-M,y,{align:"right"});
  y+=3;d.setLineWidth(.2);d.setDrawColor(220,214,190);d.line(M,y,W-M,y);
  d.setFont("helvetica","normal");d.setFontSize(10);d.setTextColor(20,20,20);
  i.items.forEach(x=>{const nl=d.splitTextToSize(x.name,92);if(y+nl.length*5+6>262){d.addPage();y=20}
    y+=6;d.text(nl,M,y);d.text(String(x.qty),128,y,{align:"right"});d.text(cop(x.price),160,y,{align:"right"});d.text(cop(x.qty*x.price),W-M,y,{align:"right"});
    y+=(nl.length-1)*4.5+3;d.line(M,y,W-M,y)});
  y+=8;d.setFillColor(...B);d.rect(110,y,W-M-110,12,"F");d.setFont("times","normal");d.setFontSize(13);d.setTextColor(...G);
  d.text("TOTAL",114,y+8);d.text(cop(i.total),W-M-4,y+8,{align:"right"});
  y+=20;d.setDrawColor(...DG);d.setLineWidth(.5);d.setFont("helvetica","bold");d.setFontSize(9);d.setTextColor(...DG);
  const st=stName(i.estado),sw=d.getTextWidth(st)+8;d.rect(W-M-sw,y,sw,8);d.text(st,W-M-sw/2,y+5.4,{align:"center"});
  d.setDrawColor(...G);d.setLineWidth(.3);d.line(M,272,W-M,272);
  d.setFont("helvetica","normal");d.setFontSize(9);d.setTextColor(...GR);
  d.text(C.pie||"",W/2,278,{align:"center"});d.setFontSize(7.5);d.text("Documento interno de venta. No reemplaza la factura electrónica DIAN.",W/2,283,{align:"center"});
  return d.output("blob");
}
async function pdfFactura(id){const i=S.invoices.find(x=>x.id===id);
  if(!window.jspdf)return toast("El generador de PDF no cargó, revisa tu conexión");
  if(!DL)return toast("Las descargas no están disponibles en esta vista");
  try{await DL.save({filename:`${i.id}-${(S.company.nombre||"upperfumes").toLowerCase().replace(/\s+/g,"-")}.pdf`,data:buildPDF(i)})}catch(e){if(e&&e.code!=="cancelled")toast("No se pudo generar el PDF")}}
/* empresa */
function aEmpresa(){const C=S.company,f=(k,l,ph,t)=>`<label for="e_${k}">${l}</label><input class="f" id="e_${k}" ${t||""} placeholder="${ph||""}" value="${esc(C[k]||"")}">`;
  $("ab").innerHTML=`<div class="sh"><h2 style="font-size:19px">Datos de la empresa</h2><p>Aparecen en las facturas y en el botón de WhatsApp de la tienda.</p></div><div class="panel">
  ${f("nombre","Nombre comercial","Upperfumes")}${f("nit","NIT o cédula","")}${f("telefono","Teléfono / WhatsApp","300 559 8061",'inputmode="tel"')}${f("email","Correo","","type=email")}${f("direccion","Dirección","")}${f("ciudad","Ciudad","")}${f("instagram","Instagram","@upperfumes")}${f("pie","Mensaje al pie de la factura","")}
  <button class="primary" onclick="saveEmpresa()">Guardar datos</button></div>
  <div class="sh"><h2 style="font-size:19px">Proveedores</h2></div>${S.providers.length?S.providers.map((p,i)=>`<div class="row"><div class="grow"><b>${esc(p)}</b></div><button class="x" aria-label="Quitar ${esc(p)}" onclick="if(confirm('¿Quitar este proveedor de la lista?')){S.providers.splice(${i},1);save();aEmpresa()}">×</button></div>`).join(""):`<p class="empty">Los proveedores se agregan al registrar compras.</p>`}
  <button class="ghost" onclick="logout()">Cerrar sesión</button>`}
function saveEmpresa(){["nombre","nit","telefono","email","direccion","ciudad","instagram","pie"].forEach(k=>S.company[k]=$("e_"+k).value.trim());save();toast("Datos guardados")}
/* contabilidad */
let cMonth=null;
function aConta(){
  cMonth=cMonth||month(today());const t=totals(cMonth);
  const ms=[];const d=new Date(cMonth+"-01T12:00:00");for(let k=5;k>=0;k--){const x=new Date(d);x.setMonth(d.getMonth()-k);ms.push(x.toISOString().slice(0,7))}
  const data=ms.map(m=>{const r=totals(m);return{m,i:r.ventas,e:r.costo+r.gastos}}),mx=Math.max(1,...data.map(x=>Math.max(x.i,x.e)));
  const mn=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const exp=S.expenses.filter(e=>month(e.fecha)===cMonth);
  $("ab").innerHTML=`<label for="cm">Mes</label><input class="f" type="month" id="cm" value="${cMonth}" onchange="cMonth=this.value;aConta()">
  <div class="sh" style="margin-top:18px"><h2 style="font-size:19px">Estado de resultados</h2></div>
  <div class="pl"><div><span>Ventas (${t.n} facturas pagadas)</span><span>${cop(t.ventas)}</span></div><div><span>Costo de lo vendido</span><span>− ${cop(t.costo)}</span></div><div><span>Utilidad bruta</span><b style="font-weight:500">${cop(t.bruta)}</b></div><div><span>Gastos operativos</span><span>− ${cop(t.gastos)}</span></div><div class="t"><span>Utilidad neta</span><span style="${t.neta<0?"color:var(--bad)":""}">${cop(t.neta)}</span></div></div>
  <div class="kpis"><div class="kpi"><span>Compras de inventario</span><b>${cop(t.compras)}</b></div><div class="kpi"><span>Cuentas por cobrar</span><b>${cop(t.cxc)}</b></div></div>
  <div class="sh"><h2 style="font-size:19px">Últimos 6 meses</h2></div>
  <div class="bars">${data.map(x=>`<div class="col"><div class="pair"><div class="bi" style="height:${x.i/mx*100}%" title="Ventas ${cop(x.i)}"></div><div class="be" style="height:${x.e/mx*100}%" title="Costos y gastos ${cop(x.e)}"></div></div><span>${mn[+x.m.slice(5)-1]}</span></div>`).join("")}</div>
  <div class="legend"><span><i style="background:var(--gold)"></i>Ventas</span><span><i style="background:var(--muted)"></i>Costos y gastos</span></div>
  <div class="sh"><h2 style="font-size:19px">Gastos del mes</h2><p>Envíos, publicidad, empaques, arriendo y otros</p></div>
  <div class="toolbar" style="margin-top:0"><button class="btn-line" onclick="formGasto()">Registrar gasto</button><button class="btn-line" onclick="exportConta()">Exportar CSV</button></div>
  ${exp.length?exp.map(e=>`<div class="row"><div class="grow"><b>${esc(e.concepto)}</b><small>${e.fecha} · ${esc(e.cat)}</small></div><span>${cop(e.monto)}</span><button class="x" aria-label="Eliminar gasto" onclick="if(confirm('¿Eliminar este gasto?')){S.expenses=S.expenses.filter(x=>x.id!==${e.id});save();aConta()}">×</button></div>`).join(""):`<p class="empty">No hay gastos registrados en este mes.</p>`}`;
}
function formGasto(){openSheet(`<h3 class="t">Registrar gasto</h3><label>Concepto</label><input class="f" id="gC" placeholder="Ej: envío Servientrega"><div class="two"><div><label>Categoría</label><select class="f" id="gK">${["Envíos","Publicidad","Empaques","Arriendo","Servicios","Comisiones","Otros"].map(o=>`<option>${o}</option>`).join("")}</select></div><div><label>Monto</label><input class="f" id="gM" inputmode="numeric"></div></div><label>Fecha</label><input class="f" type="date" id="gF" value="${today()}"><p class="err" id="err"></p><button class="primary" onclick="saveGasto()">Guardar gasto</button>`)}
function saveGasto(){const c=$("gC").value.trim(),m=num($("gM").value);if(!c||!m)return $("err").textContent="Escribe concepto y monto.";S.expenses.unshift({id:Date.now(),concepto:c,cat:$("gK").value,monto:m,fecha:$("gF").value||today()});save();closeSheet();aConta();toast("Gasto registrado")}
/* usuarios */
function aUsers(){$("ab").innerHTML=`<div class="kpis"><div class="kpi"><span>Clientes</span><b>${S.users.filter(u=>u.role==="cliente").length}</b></div><div class="kpi"><span>Administradores</span><b>${S.users.filter(u=>u.role==="admin").length}</b></div></div>
  ${S.users.map(u=>`<div class="row"><div class="av" style="width:38px;height:38px;font-size:16px">${esc(u.name[0])}</div><div class="grow"><b>${esc(u.name)}</b><small>${esc(u.email)}${u.phone?" · "+esc(u.phone):""}</small></div><span class="pill ${u.role==="admin"?"g":""}">${u.role==="admin"?"Admin":"Cliente"}</span></div>`).join("")}`}

/* ---------- CLIENTES ---------- */
let ctab="compradores",leadConv=null,LF=null;
const phoneKey=t=>{const d=String(t||"").replace(/\D/g,"");return d.length>=10?d.slice(-10):""};
const waTo=(tel,msg)=>{const d=String(tel||"").replace(/\D/g,"");return `https://wa.me/${d?(d.startsWith("57")?d:"57"+d):""}?text=${encodeURIComponent(msg)}`};
function buyers(){
  const m={};
  S.invoices.filter(i=>i.estado!=="anulada").forEach(i=>{
    const k=phoneKey(i.tel)||"n:"+String(i.cliente||"").trim().toLowerCase();if(k==="n:")return;
    const c=m[k]||(m[k]={k,nombre:i.cliente,tel:i.tel||"",inv:[],total:0,ult:""});
    c.inv.push(i);if(i.estado==="pagada")c.total+=i.total;
    if(i.fecha>=c.ult){c.ult=i.fecha;c.nombre=i.cliente||c.nombre;if(i.tel)c.tel=i.tel}
  });
  return Object.values(m).sort((a,b)=>b.ult.localeCompare(a.ult));
}
function aClientes(){
  const b=buyers(),L=S.leads||[];
  $("ab").innerHTML=`<div class="seg" style="margin-top:14px"><button aria-pressed="${ctab==="compradores"}" onclick="ctab='compradores';aClientes()">Compradores (${b.length})</button><button aria-pressed="${ctab==="interesados"}" onclick="ctab='interesados';aClientes()">Interesados (${L.length})</button></div>
  ${ctab==="compradores"?`<p class="hint" style="margin:0">Se llena solo con cada factura que generas.</p>
   <div class="search" style="margin-top:10px"><input id="cq" placeholder="Buscar por nombre o celular" oninput="cList()" aria-label="Buscar cliente"></div><div id="cl"></div>`
  :`<div class="toolbar"><button class="btn-line" onclick="formLead()">Agregar interesado</button></div><div id="cl"></div>`}`;
  ctab==="compradores"?cList():lList();
}
function cList(){
  const q=($("cq")&&$("cq").value||"").toLowerCase().trim(),b=buyers().filter(c=>!q||c.nombre.toLowerCase().includes(q)||String(c.tel).replace(/\D/g,"").includes(q.replace(/\D/g,"")||"~"));
  $("cl").innerHTML=b.length?b.map(c=>`<button class="row" style="width:100%;text-align:left" onclick="verCliente('${esc(c.k)}')"><div class="av" style="width:38px;height:38px;font-size:16px">${esc((c.nombre||"?")[0].toUpperCase())}</div><div class="grow"><b>${esc(c.nombre)}</b><small>${c.inv.length} compra${c.inv.length>1?"s":""} · última ${fdate(c.ult)}</small></div><b style="font-weight:500">${cop(c.total)}</b></button>`).join("")
  :`<p class="empty">${q?"No hay clientes con esa búsqueda.":"Aún no hay compradores. Aparecen aquí cuando generas una factura."}</p>`;
}
function verCliente(k){
  const c=buyers().find(x=>x.k===k);if(!c)return;
  const pend=c.inv.filter(i=>i.estado==="pendiente").reduce((a,i)=>a+i.total,0);
  const fav={};c.inv.forEach(i=>i.items.forEach(x=>fav[x.name]=(fav[x.name]||0)+x.qty));
  const top=Object.entries(fav).sort((a,b)=>b[1]-a[1])[0];
  const first=c.nombre.split(" ")[0];
  openSheet(`<h3 class="t">${esc(c.nombre)}</h3><p class="hint" style="margin:0">${c.tel?esc(c.tel):"Sin celular registrado"}</p>
  <div class="kpis"><div class="kpi"><span>Total comprado</span><b class="g">${cop(c.total)}</b></div><div class="kpi"><span>Compras</span><b>${c.inv.length}</b></div>
  <div class="kpi"><span>Última compra</span><b style="font-size:15px">${fdate(c.ult)}</b></div><div class="kpi"><span>Por cobrar</span><b style="font-size:15px">${cop(pend)}</b></div></div>
  ${top?`<p class="hint">Su perfume más comprado: <b style="color:var(--ink)">${esc(top[0])}</b></p>`:""}
  <label>Historial</label>${c.inv.map(i=>`<div class="cl-buy"><div style="display:flex;justify-content:space-between;gap:8px"><b style="font-weight:500">${fdate(i.fecha)}</b>${statePill(i.estado)}</div>
   ${i.items.map(x=>`<div>${x.qty} × ${esc(x.name)} · ${cop(x.price)} c/u</div>`).join("")}
   <small>${i.tipo==="mayor"?"Por mayor":"Detal"} · ${esc(i.metodo)} · Total ${cop(i.total)} · <a href="#" onclick="event.preventDefault();verFactura('${i.id}')" style="color:var(--gold)">${i.id}</a></small></div>`).join("")}
  ${c.tel?`<a class="wa" href="${waTo(c.tel,`Hola ${first}, te saluda ${S.company.nombre||"Upperfumes"}. `)}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
  <a class="ghost" style="display:block;text-align:center" href="${waTo(c.tel,`Hola ${first}, te saluda ${S.company.nombre||"Upperfumes"}. ¿Cómo te ha ido con ${top?top[0]:"tu perfume"}? Nos ayudaría mucho tu opinión.`)}" target="_blank" rel="noopener">Pedir opinión por WhatsApp</a>`:""}`);
}
const MEDIOS=["Instagram","WhatsApp","Facebook","TikTok","Referido","En persona","Otro"];
function lList(){
  const L=S.leads||[];
  $("cl").innerHTML=L.length?L.map(l=>`<div class="row" style="align-items:flex-start"><div class="grow"><b>${esc(l.nombre)}</b><small>${l.tel?esc(l.tel)+" · ":""}${esc(l.medio)} · ${fdate(l.fecha)}</small>
   ${l.pids.length?`<div class="cl-sum">${l.pids.filter(id=>P(id)).map(id=>`<span class="pill g">${esc(P(id).name)}</span>`).join("")}</div>`:""}
   ${l.nota?`<small style="display:block;margin-top:4px">${esc(l.nota)}</small>`:""}
   <div style="display:flex;gap:14px;margin-top:8px;font-size:13px">
    ${l.tel?`<a href="${waTo(l.tel,leadMsg(l))}" target="_blank" rel="noopener" style="color:var(--gold)">WhatsApp</a>`:""}
    <button style="color:var(--gold)" onclick="convLead(${l.id})">Vendido</button>
    <button style="color:var(--muted)" onclick="formLead(${l.id})">Editar</button></div></div></div>`).join("")
  :`<p class="empty">No hay interesados. Agrega a quien te pregunte por un perfume y aún no haya comprado.</p>`;
}
function leadMsg(l){const n=l.pids.filter(id=>P(id)).map(id=>P(id).name);return `Hola ${l.nombre.split(" ")[0]}, te saluda ${S.company.nombre||"Upperfumes"}. ${n.length?`Te escribo por ${n.join(", ")}, `:""}¿todavía te interesa? Tenemos disponibilidad.`}
function formLead(id){
  const l=id?(S.leads||[]).find(x=>x.id===id):null;
  LF=l?{...l,pids:[...l.pids]}:{nombre:"",tel:"",medio:"Instagram",pids:[],nota:"",ok:false};LF.id=id||null;drawLead();
}
function drawLead(){
  openSheet(`<h3 class="t">${LF.id?"Editar interesado":"Nuevo interesado"}</h3>
  <div class="two"><div><label for="lN">Nombre</label><input class="f" id="lN" value="${esc(LF.nombre)}"></div><div><label for="lT">Celular</label><input class="f" id="lT" inputmode="tel" value="${esc(LF.tel)}"></div></div>
  <label for="lM">¿Cómo llegó?</label><select class="f" id="lM">${MEDIOS.map(o=>`<option ${o===LF.medio?"selected":""}>${o}</option>`).join("")}</select>
  <label>Perfumes que le interesan</label><div class="pick">${S.products.map(p=>`<button class="chip" aria-pressed="${LF.pids.includes(p.id)}" onclick="lfRead();lfTog(${p.id})">${esc(p.name)}</button>`).join("")}</div>
  <label for="lNo">Nota</label><input class="f" id="lNo" placeholder="Ej: busca algo dulce para regalar" value="${esc(LF.nota)}">
  <label class="chk"><input type="checkbox" id="lOk" ${LF.ok?"checked":""}> Autorizó que le escribamos con ofertas (Ley 1581)</label>
  <p class="err" id="err"></p><button class="primary" onclick="saveLead()">Guardar</button>
  ${LF.id?`<button class="ghost" style="color:var(--bad)" onclick="if(confirm('¿Eliminar este interesado?'))delLead(${LF.id})">Eliminar</button>`:""}`,true);
}
function lfRead(){LF.nombre=$("lN").value;LF.tel=$("lT").value;LF.medio=$("lM").value;LF.nota=$("lNo").value;LF.ok=$("lOk").checked}
function lfTog(id){const i=LF.pids.indexOf(id);i<0?LF.pids.push(id):LF.pids.splice(i,1);drawLead()}
function saveLead(){
  lfRead();if(!LF.nombre.trim())return $("err").textContent="Escribe el nombre.";
  S.leads=S.leads||[];const d={nombre:LF.nombre.trim(),tel:LF.tel.trim(),medio:LF.medio,pids:LF.pids,nota:LF.nota.trim(),ok:LF.ok};
  if(LF.id)Object.assign(S.leads.find(x=>x.id===LF.id),d);else S.leads.unshift({...d,id:Date.now(),fecha:today()});
  save();closeSheet();ctab="interesados";aClientes();toast("Interesado guardado");
}
function delLead(id){S.leads=(S.leads||[]).filter(l=>l.id!==id);save();closeSheet();aClientes();toast("Eliminado")}
function convLead(id){
  const l=(S.leads||[]).find(x=>x.id===id);if(!l)return;
  const ps=l.pids.filter(i=>P(i));lines=ps.length?ps.map(pid=>({pid,qty:1})):[{pid:S.products[0].id,qty:1}];FV={blob:null,url:null};
  drawFactura({c:l.nombre,t:l.tel,tipo:"detal",m:"Efectivo",e:"pagada"});leadConv=id;
}
/* export */
let DL=null;(async()=>{try{if(window.claude&&claude.use)DL=await claude.use("downloads")}catch(e){}})();
async function dl(name,rows){const csv="\ufeff"+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(";")).join("\n");
  if(!DL){toast("La descarga no está disponible en esta vista");return}try{await DL.save({filename:name,data:new Blob([csv],{type:"text/csv"})})}catch(e){if(e&&e.code!=="cancelled")toast("No se pudo descargar")}}
function exportInv(){dl("inventario-upperfumes.csv",[["Marca","Producto","ml","Stock","Precio compra","Precio público","Precio mayor","Proveedor","Valor inventario"],...S.products.map(p=>[p.brand,p.name,p.ml,p.stock,p.compra,p.publico,p.mayor,p.proveedor,p.stock*p.compra])])}
function exportConta(){const r=[["Fecha","Tipo","Documento","Detalle","Ingreso","Egreso"]];
  S.invoices.filter(i=>i.estado==="pagada"&&month(i.fecha)===cMonth).forEach(i=>r.push([i.fecha,"Venta",i.id,i.cliente,i.total,0]));
  S.purchases.filter(c=>month(c.fecha)===cMonth).forEach(c=>r.push([c.fecha,"Compra inventario",c.ref||"",c.proveedor+": "+its(c).map(x=>(P(x.pid)?.name||"")+" x"+x.qty).join(", "),0,pTotal(c)]));
  S.expenses.filter(e=>month(e.fecha)===cMonth).forEach(e=>r.push([e.fecha,"Gasto · "+e.cat,"",e.concepto,0,e.monto]));
  dl(`contabilidad-upperfumes-${cMonth}.csv`,r)}

function openSheet(h,keep){const st=$("sheet").scrollTop;$("sb").innerHTML=h;$("sheet").scrollTop=keep?st:0;$("sheet").classList.add("open");$("scrim").classList.add("open")}
function closeSheet(){$("sheet").classList.remove("open");$("scrim").classList.remove("open")}
renderMenu();renderHome();renderShop();badge();loadClientes();route();

/* ---------- banner principal: vitrina interactiva ---------- */
(function vitrina(){
  const V=$("vit"),B=$("vban"),tip=$("vtip"),img=$("vph");if(!V)return;
  const RMv=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let C=null,Z=[];
  const inf=v=>{const p=v.id&&P(v.id);return p?{p,brand:p.brand,name:p.name}:{brand:v.marca||"Upperfumes",name:v.nombre||"Fragancia de la vitrina"}};
  function build(){
    C={x:0,y:0,w:VFOTO.w,h:VFOTO.h};
    Z=VITRINA.map((v,i)=>{const [x1,y1,x2,y2]=v.z;return {i,v,x:x1/C.w*100,y:y1/C.h*100,w:(x2-x1)/C.w*100,h:(y2-y1)/C.h*100}});
    $("vspots").innerHTML=Z.map((z,k)=>{const o=inf(z.v);
      return `<button class="vhs" data-k="${k}" style="left:${z.x.toFixed(2)}%;top:${z.y.toFixed(2)}%;width:${z.w.toFixed(2)}%;height:${z.h.toFixed(2)}%" aria-label="${esc(o.brand+" "+o.name)}${o.p?", "+cop(price(o.p)):""}"></button>`}).join("");
    V.querySelectorAll(".vhs").forEach(b=>{const k=+b.dataset.k;
      b.addEventListener("pointerenter",()=>show(k));b.addEventListener("pointerleave",hide);b.addEventListener("focus",()=>show(k));b.addEventListener("blur",hide);
      b.addEventListener("click",()=>open(k))});
    const sc=$("vscroll");if(sc&&sc.scrollWidth>sc.clientWidth)sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)*0.5;
  }
  function show(k){const z=Z[k],o=inf(z.v);
    tip.innerHTML=`<small>${esc(o.brand)}</small><b>${esc(o.name)}</b>${o.p?`<span>${cop(price(o.p))}${o.p.promo?`<s>${cop(o.p.publico)}</s>`:""}</span><em>Clic para ver detalles</em>`:`<em>Consulta precio y disponibilidad</em>`}`;
    const up=z.y<22;tip.classList.toggle("below",up);tip.style.left=Math.max(12,Math.min(88,z.x+z.w/2))+"%";tip.style.top=(up?z.y+z.h:z.y)+"%";tip.classList.add("show");lock={x:z.x+z.w/2,y:z.y+z.h/2};start()}
  function hide(){tip.classList.remove("show");lock=null}
  function open(k){hide();const v=Z[k].v,o=inf(v);if(o.p)return ficha(o.p.id);
    const [x1,y1,x2,y2]=v.z,pad=10,bx=Math.max(0,x1-pad),by=Math.max(0,y1-pad),bw=Math.min(VFOTO.w,x2+pad)-bx,bh=Math.min(VFOTO.h,y2+pad)-by;
    const nm=v.nombre?`${o.brand} ${o.name}`:"una fragancia que vi en la vitrina de la página";
    openSheet(`<div class="vbox"><span style="aspect-ratio:${(bw/bh).toFixed(3)};background-image:url('${VFOTO.src}');background-size:${(VFOTO.w/bw*100).toFixed(1)}% auto;background-position:${(bx/(VFOTO.w-bw)*100).toFixed(2)}% ${(by/(VFOTO.h-bh)*100).toFixed(2)}%"></span></div>
      <h3 class="t">${esc(o.name)}</h3><p class="hint">${esc(o.brand)}</p>
      <p style="margin-top:10px;opacity:.85">Esta fragancia está en nuestra vitrina. Escríbenos y te contamos su precio, presentación y disponibilidad.</p>
      <a class="wa" href="https://wa.me/${waNum()}?text=${encodeURIComponent("Hola Upperfumes, quiero saber el precio y la disponibilidad de "+nm+".")}" target="_blank" rel="noopener">Consultar por WhatsApp</a>`)}
  let tx=50,ty=55,cx=50,cy=55,last=-1e9,lock=null,run=false,vis=true;
  function aim(x,y){const r=V.getBoundingClientRect();tx=(x-r.left)/r.width*100;ty=(y-r.top)/r.height*100;last=performance.now();V.classList.add("exploring");B.classList.add("used");start()}
  B.addEventListener("pointermove",e=>aim(e.clientX,e.clientY));
  B.addEventListener("pointerleave",()=>V.classList.remove("exploring"));
  V.addEventListener("touchstart",e=>aim(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  V.addEventListener("touchmove",e=>aim(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  function frame(now){
    if(!vis||document.hidden||!$("v-tienda").classList.contains("active")){run=false;return}
    let gx=tx,gy=ty;
    if(lock){gx=lock.x;gy=lock.y}
    else if(now-last>2600){V.classList.remove("exploring");if(!RMv){gx=50+34*Math.sin(now/3800);gy=60+20*Math.sin(now/2600)}}  // sin interacción: la luz recorre las repisas sola
    cx+=(gx-cx)*.08;cy+=(gy-cy)*.08;
    V.style.setProperty("--x",cx.toFixed(2)+"%");V.style.setProperty("--y",cy.toFixed(2)+"%");
    requestAnimationFrame(frame)}
  function start(){if(!run){run=true;requestAnimationFrame(frame)}}
  build();addEventListener("load",()=>{const sc=$("vscroll");if(sc&&sc.scrollWidth>sc.clientWidth)sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)*0.5});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)start()}).observe(V);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)start()});
  window.vitrinaStart=start;start();
})();
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});

