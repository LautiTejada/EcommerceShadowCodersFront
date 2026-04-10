import { apiFetch } from "./apiFetch";
import type { Favorito } from "../types/Favorito";

const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Obtener mis favoritos
 */
export const obtenerMisFavoritos = async (): Promise<Favorito[]> => {
	return apiFetch(`${baseUrl}/favoritos`, {
		method: "GET",
		auth: true,
	});
};

/**
 * Obtener favoritos de un usuario específico (ADMIN o propietario)
 */
export const obtenerFavoritosDeUsuario = async (
	usuarioId: number,
): Promise<Favorito[]> => {
	return apiFetch(`${baseUrl}/favoritos/usuario/${usuarioId}`, {
		method: "GET",
		auth: true,
	});
};

/**
 * Verificar si un producto está en favoritos
 */
export const verificarFavorito = async (
	productoId: number,
): Promise<boolean> => {
	return apiFetch(`${baseUrl}/favoritos/producto/${productoId}`, {
		method: "GET",
		auth: true,
	});
};

/**
 * Agregar producto a favoritos
 */
export const agregarAFavoritos = async (
	productoId: number,
): Promise<Favorito> => {
	return apiFetch(`${baseUrl}/favoritos/${productoId}`, {
		method: "POST",
		auth: true,
	});
};

/**
 * Eliminar producto de favoritos
 */
export const eliminarDeFavoritos = async (
	productoId: number,
): Promise<void> => {
	return apiFetch(`${baseUrl}/favoritos/${productoId}`, {
		method: "DELETE",
		auth: true,
	});
};
