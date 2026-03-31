import type { Direccion } from "../types/Direccion";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

function handleApiError(error: unknown, context: string) {
	console.error(`Error en ${context}:`, error);
	throw new Error(`No se pudo completar la operación: ${context}`);
}

export async function getDirecciones() {
	try {
		return await apiFetch(`${baseUrl}/direcciones`);
	} catch (error) {
		handleApiError(error, "obtener direcciones");
	}
}

export async function getDireccionesActivas() {
	try {
		return await apiFetch(`${baseUrl}/direcciones/active`);
	} catch (error) {
		handleApiError(error, "obtener direcciones activas");
	}
}

export async function getDireccionById(id: number) {
	if (!id || typeof id !== "number") throw new Error("ID inválido");
	try {
		return await apiFetch(`${baseUrl}/direcciones/${id}`);
	} catch (error) {
		handleApiError(error, `obtener dirección con id ${id}`);
	}
}

export async function changeDireccionStatus(id: number) {
	if (!id || typeof id !== "number") throw new Error("ID inválido");
	try {
		return await apiFetch(`${baseUrl}/direcciones/${id}/status`, {
			method: "PUT",
		});
	} catch (error) {
		handleApiError(error, `cambiar estado de dirección ${id}`);
	}
}

export async function activateDireccion(id: number) {
	if (!id || typeof id !== "number") throw new Error("ID inválido");
	try {
		return await apiFetch(`${baseUrl}/direcciones/${id}/activate`, {
			method: "PUT",
		});
	} catch (error) {
		handleApiError(error, `activar dirección ${id}`);
	}
}

export async function deactivateDireccion(id: number) {
	if (!id || typeof id !== "number") throw new Error("ID inválido");
	try {
		return await apiFetch(`${baseUrl}/direcciones/${id}/deactivate`, {
			method: "PUT",
		});
	} catch (error) {
		handleApiError(error, `desactivar dirección ${id}`);
	}
}

export async function createDireccion(usuarioId: number, direccion: Direccion) {
	if (!usuarioId || typeof usuarioId !== "number")
		throw new Error("Usuario inválido");
	if (!direccion || typeof direccion !== "object")
		throw new Error("Dirección inválida");
	try {
		return await apiFetch(`${baseUrl}/usuarios/${usuarioId}/direcciones`, {
			method: "POST",
			body: JSON.stringify(direccion),
		});
	} catch (error) {
		handleApiError(error, `crear dirección para usuario ${usuarioId}`);
	}
}
