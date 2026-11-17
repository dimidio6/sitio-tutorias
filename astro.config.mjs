import { defineConfig } from "astro/config";

export default defineConfig({
	// Cuando se conozca la dirección definitiva del sitio, definila acá para
	// que se generen la URL canónica y las imágenes para redes con ruta absoluta:
	// site: "https://ejemplo.unp.edu.ar",
	output: "static",
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	devToolbar: { enabled: false },
});
