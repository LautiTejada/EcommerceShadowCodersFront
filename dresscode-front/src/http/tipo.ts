import type { Tipo } from "../types/Tipo";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export function getTipos() {
	return apiFetch(`${baseUrl}/tipos`);
}

export function getTiposActivos() {
	return apiFetch(`${baseUrl}/tipos/active`);
}

export async function getTipoById(id: number) {
	try {
		return await apiFetch(`${baseUrl}/tipos/${id}`);
	} catch (error: any) {
		if (error.message && error.message.includes("404")) return null;
		throw error;
	}
}

export function createTipo(tipo: Tipo) {
	return apiFetch(`${baseUrl}/tipos`, {
		method: "POST",
		body: JSON.stringify(tipo),
	});
}

export function updateTipo(id: number, tipo: Tipo) {
	return apiFetch(`${baseUrl}/tipos/${id}`, {
		method: "PUT",
		body: JSON.stringify(tipo),
	});
}

export function updateTipoStatus(id: number) {
	return apiFetch(`${baseUrl}/tipos/${id}/status`, {
		method: "PUT",
	});
}

export function activateTipo(id: number) {
	return apiFetch(`${baseUrl}/tipos/${id}/activate`, {
		method: "PUT",
	});
}

export function deactivateTipo(id: number) {
	return apiFetch(`${baseUrl}/tipos/${id}/deactivate`, {
		method: "PUT",
	});
}

export async function getCategoriasByTipo(tipoId: number) {
	try {
		return await apiFetch(`${baseUrl}/tipos/${tipoId}/categorias`);
	} catch (error: any) {
		if (error.message && error.message.includes("404")) return [];
		throw error;
	}
}
