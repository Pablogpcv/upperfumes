# Upperfumes · Fragancias que te elevan

Tienda web móvil de perfumes de diseñador y árabes originales, con envíos a toda Colombia.

**Ver la página:** https://pablogpcv.github.io/upperfumes/

## Estructura del proyecto

```
upperfumes/
├── index.html              # Estructura de la página (HTML)
├── css/
│   └── styles.css          # Estilos: colores, tipografía, diseño
├── js/
│   └── app.js              # Lógica: catálogo, carrito, mayoristas, promos, admin
└── assets/
    └── img/
        ├── tienda/         # Fondo e imágenes generales de la tienda
        ├── perfumes/       # Foto cuadrada de cada perfume (tarjetas del catálogo)
        └── fichas/         # Ficha completa de cada perfume (precio, notas, descripción)
```

## Cómo editar

| Quiero cambiar…                          | Archivo                         |
|------------------------------------------|---------------------------------|
| Textos o secciones de la página          | `index.html`                    |
| Colores, tamaños, fuentes                | `css/styles.css`                |
| Perfumes, precios, WhatsApp, funciones   | `js/app.js`                     |
| La foto de un perfume                    | `assets/img/perfumes/`          |
| La ficha completa de un perfume          | `assets/img/fichas/`            |

Para cambiar una foto, sube una nueva imagen con **el mismo nombre** en `assets/img/perfumes/`.

Cada cambio que se guarde (commit) en la rama `main` se publica solo en GitHub Pages en 1–2 minutos.

## Catálogo

57 perfumes entre diseñador, nicho y árabes. Los precios de cada perfume están en `js/app.js`
(campo `pub`). Si cambias precios del catálogo base, sube en 1 el número `CAT_VER` para que
se actualicen también en los navegadores que ya abrieron la página.
