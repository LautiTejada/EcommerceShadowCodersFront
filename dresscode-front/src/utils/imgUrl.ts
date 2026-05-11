export const BASE_URL =
	import.meta.env.VITE_API_URL?.replace("/api", "") ?? "http://localhost:8080";

/**
 * Resuelve la URL final de una imagen de producto.
 * - URLs absolutas (http/https) se devuelven tal cual.
 * - Rutas relativas se preprenden con BASE_URL.
 */
export const resolveImgSrc = (url: string): string => {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	return `${BASE_URL}${encodeURI(url.startsWith("/") ? url : `/${url}`)}`;
};
