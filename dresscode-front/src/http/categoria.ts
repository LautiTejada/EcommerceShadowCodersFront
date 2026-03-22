import type { Categoria } from "../types/Categoria";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export const getCategorias = async () => {
	try {
		return await apiFetch(`${baseUrl}/categorias/activas`);
	} catch (error) {
		console.error("Error fetching categorias:", error);
		throw error;
	}
};

export const getCategoriasActivas = async () => {
	try {
		return await apiFetch(`${baseUrl}/categorias/active`);
	} catch (error) {
		console.error("Error fetching categorias activas:", error);
		throw error;
	}
};

export const getCategoriaById = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/categorias/${id}`);
	} catch (error) {
		console.error(`Error fetching categoria with id ${id}:`, error);
		throw error;
	}
};

export const crearCategoria = async (categoria: Categoria, tipoId: number) => {
	try {
		return await apiFetch(`${baseUrl}/categorias/${tipoId}`, {
			method: "POST",
			body: JSON.stringify(categoria),
		});
	} catch (error) {
		console.error("Error creating categoria:", error);
		throw error;
	}
};

export const actualizarCategoria = async (
	idCategoria: number,
	categoria: Categoria,
	idTipo: number,
) => {
	try {
		return await apiFetch(
			`${baseUrl}/categorias/${idCategoria}/edit/${idTipo}`,
			{
				method: "PUT",
				body: JSON.stringify(categoria),
			},
		);
	} catch (error) {
		console.error("Error updating categoria:", error);
		throw error;
	}
};

export const cambiarEstadoCategoria = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/categorias/${id}/status`, {
			method: "PUT",
		});
	} catch (error) {
		console.error("Error changing categoria status:", error);
		throw error;
	}
};

export const activarCategoria = async (id: number) => {
	try {
		const response = await fetch(`${baseUrl}/categorias/${id}/activate`, {
			method: "PUT",
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error activating categoria:", error);
		throw error;
	}
};

export const desactivarCategoria = async (id: number) => {
	try {
		const response = await fetch(`${baseUrl}/categorias/${id}/deactivate`, {
			method: "PUT",
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error deactivating categoria:", error);
		throw error;
	}
};
