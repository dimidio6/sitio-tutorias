# Sistema de Tutorías — Facultad de Ingeniería UNPSJB

Sitio estático hecho con [Astro](https://astro.build). No necesita servidor ni base de datos: el build genera HTML, CSS y JS en `dist/`, que se puede subir a cualquier hosting.

## Comandos

```bash
npm install        # Instalar dependencias (una sola vez)
npm run dev        # Servidor de desarrollo en http://localhost:4321
npm run build      # Generar el sitio en dist/
npm run preview    # Ver el resultado del build
npm run typecheck  # Chequeo de tipos
```

## Editar el contenido

Todo el contenido está en `src/data/`:

| Archivo | Contenido |
| --- | --- |
| `sitio.json` | Título, menú, textos del hero y de cada sección, imagen de horarios, datos de contacto y pie |
| `tutores.json` | Nombre, carrera y correo de cada tutor, en el orden en que se muestran |
| `coordinadores.json` | Nombre y foto de cada coordinador |
| `faqs.json` | Preguntas frecuentes, en el orden en que se muestran |

Las imágenes van en `src/assets/` y se referencian por su ruta dentro de esa carpeta:

- `logos/`: logos de la universidad.
- `carrusel/`: fotos de la banda del inicio (se eligen en `hero.imagenes` de `sitio.json`, con su leyenda y su `foco`).
- `personas/`: fotos de tutores y coordinadores.
- `horarios.jpeg`: la grilla de horarios.

Las fotos que están en una carpeta pero no se nombran en los JSON no se muestran en la página (el build igual las copia a `dist/`, pero los visitantes no las descargan). Por ejemplo, para ponerle foto a un tutor, guardá la imagen en `src/assets/personas/` y agregá:

```json
{
	"id": "nombre-apellido",
	"nombre": "Nombre Apellido",
	"carrera": "Ingeniería Civil",
	"foto": { "archivo": "personas/nombre-apellido.jpg" }
}
```

Sin `foto` se muestra la inicial del nombre. Si un `archivo` no existe, el build falla indicando cuál falta.

## Horarios de los tutores

Los horarios se muestran como una imagen (`src/assets/horarios.jpeg`). Para actualizarlos cada cuatrimestre, reemplazá ese archivo por la nueva grilla con el mismo nombre, o cambiá `horarios.imagen.archivo` en `sitio.json`. Actualizá también el `alt` si cambia el cuatrimestre.

## Formulario de contacto

Al enviarlo se abre el programa de correo del visitante con el mensaje armado. Los destinatarios son el correo de `contacto.email` (en `sitio.json`) más el `email` de cada tutor de la carrera elegida. Un tutor con `"email": ""` no recibe copia. Tené en cuenta que los correos cargados quedan visibles en el código de la página.

## Tema claro y oscuro

El interruptor del encabezado cambia el tema y recuerda la elección en ese navegador. Sin elección previa se usa el tema del sistema. Los colores de cada tema están al principio de `src/styles/site.css`.

## Publicar

1. Definí `site` en `astro.config.mjs` con la dirección definitiva.
2. Si el sitio va a vivir en una subcarpeta (por ejemplo `/tutorias/`), definí también `base` y ajustá los enlaces del menú en `sitio.json`.
3. Ejecutá `npm run build` y subí el contenido de `dist/`.
