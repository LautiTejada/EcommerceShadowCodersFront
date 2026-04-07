import type { MarcaItem } from "../types/MarcaItem";
import { apiFetch } from "./apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

export const getMarcas = async (): Promise<MarcaItem[]> => {
	return await apiFetch(`${baseUrl}/marcas`, { method: "GET", auth: true });
};

export const getMarcasActivas = async (): Promise<MarcaItem[]> => {
	return await apiFetch(`${baseUrl}/marcas/active`, {
		method: "GET",
		auth: true,
	});
};

export const getMarcaById = async (id: number): Promise<MarcaItem> => {
	return await apiFetch(`${baseUrl}/marcas/${id}`, {
		method: "GET",
		auth: true,
	});
};

export const crearMarca = async (nombreMarca: string): Promise<MarcaItem> => {
	return await apiFetch(`${baseUrl}/marcas`, {
		method: "POST",
		auth: true,
		body: JSON.stringify({ nombreMarca }),
	});
};

export const actualizarMarca = async (
	id: number,
	nombreMarca: string,
): Promise<MarcaItem> => {
	return await apiFetch(`${baseUrl}/marcas/${id}`, {
		method: "PUT",
		auth: true,
		body: JSON.stringify({ nombreMarca }),
	});
};

export const eliminarMarca = async (id: number): Promise<void> => {
	return await apiFetch(`${baseUrl}/marcas/${id}`, {
		method: "DELETE",
		auth: true,
	});
};

export const cambiarEstadoMarca = async (id: number): Promise<MarcaItem> => {
	return await apiFetch(`${baseUrl}/marcas/${id}/status`, {
		method: "PATCH",
		auth: true,
	});
};
