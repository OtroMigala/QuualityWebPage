# Quality Consulting Group — sitio web

Prototipo del sitio institucional y del Aula Virtual.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

## Stack

- **Astro 5** — genera HTML estático. Cero JavaScript por defecto en cada página.
- **Tailwind 4** — sistema de diseño definido en `src/styles/global.css`.
- **three.js** — solo en la escena del hero, en un chunk aparte que se carga diferido.

## Peso de la ruta crítica (home)

| Recurso                | Gzip     |
| ---------------------- | -------- |
| HTML                   | 9,8 KB   |
| CSS                    | 8,6 KB   |
| Logo (WebP)            | 28 KB    |
| **Total antes del 3D** | **~46 KB** |
| three.js (diferido)    | 114,6 KB |

three.js **no** entra en la ruta crítica. Se descarga después del evento `load`,
en un hueco libre del hilo principal, y solo si el equipo puede con él. El
respaldo estático del hero se ve desde el primer render.

## Cuándo NO se carga la escena 3D

`src/components/Hero.astro` descarta la escena si detecta cualquiera de estas
condiciones, y deja el fondo estático:

- `prefers-reduced-motion: reduce`
- Modo de ahorro de datos, o conexión 2G
- `deviceMemory < 4 GB` o menos de 4 núcleos
- WebGL no disponible

## Estructura

```
src/
├─ data/            Contenido editable sin tocar maquetación
│  ├─ site.ts       Contacto, navegación, horario
│  ├─ servicios.ts  Las 5 líneas de consultoría
│  └─ cursos.ts     Catálogo del aula
├─ layouts/Base.astro
├─ components/      Header, Footer, Hero, tarjetas
├─ scripts/hero-scene.ts   Escena 3D (procedural, sin assets)
├─ styles/global.css       Tokens de color, tipografía, componentes
└─ pages/
   ├─ index.astro
   ├─ nosotros.astro
   ├─ contacto.astro
   ├─ servicios/{index,[slug]}.astro
   └─ aula/{index,[slug],mi-aprendizaje}.astro
```

Para cambiar textos de servicios o cursos basta editar `src/data/`. No hace
falta tocar los `.astro`.

## Marca

Colores extraídos del logotipo original:

- Azul `#013175`
- Dorado `#fdbe01`

`scripts/logo.mjs` y `scripts/optimize.mjs` regeneran los archivos de
`public/brand/` a partir de `scripts/source-logo.png`. Solo hay que volver a
correrlos si cambia el logotipo.

## Pendientes antes de publicar

Buscar `⚠ PENDIENTE` en el código para ver todos. Los principales:

- [ ] Número de teléfono y correo reales de Gustavo (`src/data/site.ts`)
- [ ] Horario de atención confirmado
- [ ] URLs de redes sociales
- [ ] Cifras del hero (+12 años, +80 organizaciones)
- [ ] Texto real de «Quiénes somos», misión y visión
- [ ] Fotografías del equipo
- [ ] Logos y testimonios de clientes
- [ ] Revisión técnica del borrador de los 5 servicios
- [ ] Cargos reales de Andrea y Gustavo
- [ ] Sección de convenciones y eventos (pendiente con Gustavo)
- [ ] Páginas `/politica-de-privacidad` y `/terminos` (enlazadas, aún sin crear)

## Lo que todavía es maqueta

- El formulario de contacto **no envía correos**. Falta conectar un servicio de envío.
- El botón «Inscribirme ahora» **no cobra**. Falta la pasarela de pago.
- `/aula/mi-aprendizaje` usa datos simulados. No hay autenticación ni base de datos.
