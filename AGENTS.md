Sitio estático del Sistema de Tutorías (Facultad de Ingeniería, UNPSJB), hecho con Astro. Una sola página en español más un 404. Sin servidor, base de datos ni CMS: debe poder publicarse como archivos estáticos en cualquier hosting.

- Contenido: `src/data/*.json`, cargado y validado en `src/lib/contenido.ts`. Las páginas no leen los JSON directamente.
- Imágenes: `src/assets/`, renderizadas con `<Image>` de `astro:assets`.
- Estilos: `src/styles/site.css` (azul institucional `#004a99`, acento naranja `#e67e22`, Poppins).
- Verificación: `npm run typecheck` y `npm run build`.
