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
| `sitio.json` | Título, menú, textos del hero y de cada sección, datos de contacto y pie |
| `tutores.json` | Nombre y carrera de cada tutor, en el orden en que se muestran |
| `coordinadores.json` | Nombre y foto de cada coordinador |
| `faqs.json` | Preguntas frecuentes, en el orden en que se muestran |

Las imágenes van en `src/assets/` y se referencian por su ruta dentro de esa carpeta. Por ejemplo, para ponerle foto a un tutor, guardá la imagen en `src/assets/personas/` y agregá:

```json
{
	"id": "nombre-apellido",
	"nombre": "Nombre Apellido",
	"carrera": "Ingeniería Civil",
	"foto": { "archivo": "personas/nombre-apellido.jpg" }
}
```

Sin `foto` se muestra la inicial del nombre. Si un `archivo` no existe, el build falla indicando cuál falta.

## Publicar

1. Definí `site` en `astro.config.mjs` con la dirección definitiva.
2. Si el sitio va a vivir en una subcarpeta (por ejemplo `/tutorias/`), definí también `base` y ajustá los enlaces del menú en `sitio.json`.
3. Ejecutá `npm run build` y subí el contenido de `dist/`.

## Pendiente

- El formulario de contacto abre el programa de correo del visitante; no envía mensajes por sí mismo.
