// Removed unused import of Producto
import type { Talle } from "../types/Talle";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getTalles() {
	return apiFetch(`${baseUrl}/talles`);
}

export async function getTallesActivos() {
	return apiFetch(`${baseUrl}/talles/active`);
}

export async function getTalleById(id: number) {
	return apiFetch(`${baseUrl}/talles/${id}`);
}

export async function createTalle(talle: Talle) {
	return apiFetch(`${baseUrl}/talles`, {
		method: "POST",
		auth: true,
		body: JSON.stringify(talle),
	});
}

export async function updateTalle(id: number, talle: Talle) {
	return apiFetch(`${baseUrl}/talles/${id}`, {
		method: "PUT",
		auth: true,
		body: JSON.stringify(talle),
	});
}

export async function cambiarEstadoTalle(id: number) {
	return apiFetch(`${baseUrl}/talles/${id}/status`, {
		method: "PATCH",
		auth: true,
	});
}

export async function eliminarTalle(id: number) {
	return apiFetch(`${baseUrl}/talles/${id}`, {
		method: "DELETE",
		auth: true,
	});
}

export async function assignTalleToProducto(
	productoId: number,
	talleId: number,
) {
	return apiFetch(`${baseUrl}/${talleId}/productos/${productoId}`, {
		method: "POST",
	});
}
