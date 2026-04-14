import { apiFetch } from "./apiFetch";
import type { Banner, CreateBannerRequest } from "../types/Banner";

const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Upload de archivo de imagen para banner
 */
export const uploadBannerImagen = async (
	file: File,
): Promise<{ filename: string; path: string; size: number }> => {
	const formData = new FormData();
	formData.append("file", file);

	const response = await fetch(`${baseUrl}/upload/banner`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
		},
		body: formData,
	});

	if (!response.ok) {
		let errorMsg = `HTTP error! status: ${response.status}`;
		try {
			const data = await response.json();
			if (typeof data.message === "object" && data.message !== null) {
				const validationErrors = Object.entries(data.message)
					.map(([field, error]) => `${field}: ${error}`)
					.join(", ");
				errorMsg = validationErrors || errorMsg;
			} else {
				errorMsg =
					data.message || data.error || JSON.stringify(data) || errorMsg;
			}
		} catch {
			const text = await response.text();
			errorMsg = text || errorMsg;
		}
		throw new Error(errorMsg);
	}

	return response.json();
};

/**
 * Obtener todos los banners activos
 */
export const obtenerBanners = async (): Promise<Banner[]> => {
	return apiFetch(`${baseUrl}/banners`, {
		method: "GET",
	});
};

/**
 * Obtener banner por ID
 */
export const obtenerBannerPorId = async (id: number): Promise<Banner> => {
	return apiFetch(`${baseUrl}/banners/${id}`, {
		method: "GET",
	});
};

/**
 * Crear nuevo banner (ADMIN)
 */
export const crearBanner = async (
	data: CreateBannerRequest,
): Promise<Banner> => {
	return apiFetch(`${baseUrl}/banners`, {
		method: "POST",
		auth: true,
		body: JSON.stringify(data),
	});
};

/**
 * Actualizar banner (ADMIN)
 */
export const actualizarBanner = async (
	id: number,
	data: Partial<CreateBannerRequest>,
): Promise<Banner> => {
	return apiFetch(`${baseUrl}/banners/${id}`, {
		method: "PUT",
		auth: true,
		body: JSON.stringify(data),
	});
};

/**
 * Eliminar banner (ADMIN)
 */
export const eliminarBanner = async (id: number): Promise<void> => {
	return apiFetch(`${baseUrl}/banners/${id}`, {
		method: "DELETE",
		auth: true,
	});
};

/**
 * Toggle banner activo/inactivo (ADMIN)
 */
export const toggleBanner = async (id: number): Promise<Banner> => {
	return apiFetch(`${baseUrl}/banners/${id}/toggle`, {
		method: "PATCH",
		auth: true,
	});
};
