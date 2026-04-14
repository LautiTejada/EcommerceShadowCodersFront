/**
 * Utilidades para manejo de banners
 */

/**
 * Obtiene la URL completa de una imagen de banner
 */
export const getBannerImageUrl = (imagenNombre: string): string => {
	const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
	return `${apiUrl.replace("/api", "")}/assets/banners/${imagenNombre}`;
};

/**
 * Duración en ms para reanudar auto-play después de interacción
 */
export const AUTO_PLAY_RESUME_DELAY = 10000;
