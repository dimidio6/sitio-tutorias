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

/** Iniciales de nombre y apellido, para cuando todavía no hay foto. */
function iniciales(nombre: string) {
	const partes = nombre.trim().split(/\s+/);
	const primera = partes[0]?.charAt(0) ?? "";
	const ultima = partes.length > 1 ? partes[partes.length - 1].charAt(0) : "";
	return (primera + ultima).toUpperCase();
}

export const sitio = {
	...sitioJson,
	logo: imagen(sitioJson.logo, "sitio.json (logo)"),
	horarios: {
		...sitioJson.horarios,
		imagen: imagen(sitioJson.horarios.imagen, "sitio.json (horarios)"),
	},
	hero: {
		...sitioJson.hero,
		// `foco`: qué parte de la foto se prioriza al recortarla (object-position).
		imagenes: sitioJson.hero.imagenes.flatMap((img) => {
			const resuelta = imagen(img, "sitio.json (hero)");
			return resuelta ? [{ ...resuelta, foco: img.foco ?? "center" }] : [];
		}),
	},
};

export const tutores = (
	tutoresJson as {
		id: string;
		nombre: string;
		carrera: string;
		email?: string;
		foto?: ImagenJson;
	}[]
).map((t) => ({
	...t,
	iniciales: iniciales(t.nombre),
	foto: imagen(t.foto, `tutores.json (${t.nombre})`),
}));

export const coordinadores = (
	coordinadoresJson as { id: string; nombre: string; foto?: ImagenJson }[]
).map((c) => ({
	...c,
	iniciales: iniciales(c.nombre),
	foto: imagen(c.foto, `coordinadores.json (${c.nombre})`),
}));

export const faqs = faqsJson;

/** Carreras con al menos un tutor, ordenadas alfabéticamente. */
export const carreras = [...new Set(tutores.map((t) => t.carrera))].sort(
	(a, b) => a.localeCompare(b, "es"),
);

/**
 * Correos de los tutores de cada carrera. El formulario de contacto los suma
 * como destinatarios según la carrera elegida. Los tutores sin `email` cargado
 * en tutores.json no aparecen.
 */
export const correosPorCarrera: Record<string, string[]> = {};
for (const tutor of tutores) {
	const email = tutor.email?.trim();
	if (email) (correosPorCarrera[tutor.carrera] ??= []).push(email);
}
