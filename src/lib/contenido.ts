/**
 * Contenido del sitio.
 *
 * Todo lo editable vive en `src/data/*.json` y las imágenes en `src/assets/`.
 * Este módulo solo lo carga y resuelve cada `archivo` de imagen contra
 * `src/assets/`, para que el build falle con un mensaje claro si falta una.
 */
import type { ImageMetadata } from "astro";
import sitioJson from "../data/sitio.json";
import tutoresJson from "../data/tutores.json";
import coordinadoresJson from "../data/coordinadores.json";
import faqsJson from "../data/faqs.json";

interface ImagenJson {
	archivo: string;
	alt?: string;
}

export interface Imagen {
	src: ImageMetadata;
	alt?: string;
}

const archivos = import.meta.glob<{ default: ImageMetadata }>(
	"../assets/**/*.{png,jpg,jpeg,webp,avif,svg}",
	{ eager: true },
);

function imagen(ref: ImagenJson | undefined, origen: string): Imagen | null {
	if (!ref) return null;
	const modulo = archivos[`../assets/${ref.archivo}`];
	if (!modulo) {
		throw new Error(
			`${origen}: no existe la imagen "src/assets/${ref.archivo}".`,
		);
	}
	return { src: modulo.default, alt: ref.alt };
}

export const sitio = {
	...sitioJson,
	logo: imagen(sitioJson.logo, "sitio.json (logo)"),
	hero: {
		...sitioJson.hero,
		imagenes: sitioJson.hero.imagenes.flatMap((img) => {
			const resuelta = imagen(img, "sitio.json (hero)");
			return resuelta ? [resuelta] : [];
		}),
	},
};

export const tutores = (
	tutoresJson as { id: string; nombre: string; carrera: string; foto?: ImagenJson }[]
).map((t) => ({ ...t, foto: imagen(t.foto, `tutores.json (${t.nombre})`) }));

export const coordinadores = (
	coordinadoresJson as { id: string; nombre: string; foto?: ImagenJson }[]
).map((c) => ({
	...c,
	foto: imagen(c.foto, `coordinadores.json (${c.nombre})`),
}));

export const faqs = faqsJson;

/** Carreras con al menos un tutor, ordenadas alfabéticamente. */
export const carreras = [...new Set(tutores.map((t) => t.carrera))].sort(
	(a, b) => a.localeCompare(b, "es"),
);
