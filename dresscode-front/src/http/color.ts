import type { ColorItem } from "../types/ColorItem";
import { apiFetch } from "./apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

export const getColores = async (): Promise<ColorItem[]> => {
	return await apiFetch(`${baseUrl}/colores`, { method: "GET", auth: true });
};

export const getColoresActivos = async (): Promise<ColorItem[]> => {
	return await apiFetch(`${baseUrl}/colores/active`, {
		method: "GET",
		auth: true,
	});
};

export const getColorById = async (id: number): Promise<ColorItem> => {
	return await apiFetch(`${baseUrl}/colores/${id}`, {
		method: "GET",
		auth: true,
	});
};

export const crearColor = async (nombreColor: string): Promise<ColorItem> => {
	return await apiFetch(`${baseUrl}/colores`, {
		method: "POST",
		auth: true,
		body: JSON.stringify({ nombreColor }),
	});
};

export const actualizarColor = async (
	id: number,
	nombreColor: string,
): Promise<ColorItem> => {
	return await apiFetch(`${baseUrl}/colores/${id}`, {
		method: "PUT",
		auth: true,
		body: JSON.stringify({ nombreColor }),
	});
};

export const eliminarColor = async (id: number): Promise<void> => {
	return await apiFetch(`${baseUrl}/colores/${id}`, {
		method: "DELETE",
		auth: true,
	});
};

export const cambiarEstadoColor = async (id: number): Promise<ColorItem> => {
	return await apiFetch(`${baseUrl}/colores/${id}/status`, {
		method: "PATCH",
		auth: true,
	});
};
