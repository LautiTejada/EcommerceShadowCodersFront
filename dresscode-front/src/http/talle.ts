// Removed unused import of Producto
import type { Talle } from "../types/Talle";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getTalles() {
	return apiFetch(`${baseUrl}/talles`);
}

export async function createTalle(talle: Talle) {
	return apiFetch(`${baseUrl}/talles`, {
		method: "POST",
		body: JSON.stringify(talle),
	});
}

export async function updateTalle(id: number, talle: Talle) {
	return apiFetch(`${baseUrl}/talles/${id}`, {
		method: "PUT",
		body: JSON.stringify(talle),
	});
}

export async function activateTalle(id: number) {
	return apiFetch(`${baseUrl}/talles/${id}/activate`, { method: "PUT" });
}

export async function deactivateTalle(id: number) {
	return apiFetch(`${baseUrl}/talles/${id}/desactivate`, { method: "PUT" });
}

export async function assignTalleToProducto(
	productoId: number,
	talleId: number,
) {
	return apiFetch(`${baseUrl}/${talleId}/productos/${productoId}`, {
		method: "POST",
	});
}
