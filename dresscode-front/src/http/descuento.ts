import type { Descuento } from "../types/Descuento";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getDescuentos() {
	return apiFetch(`${baseUrl}/descuentos`);
}

export async function getDescuentosActivos() {
	return apiFetch(`${baseUrl}/descuentos/active`);
}

export async function getDescuentoById(id: number) {
	return apiFetch(`${baseUrl}/descuentos/${id}`);
}

export async function createDescuento(descuento: Descuento) {
	return apiFetch(`${baseUrl}/descuentos`, {
		method: "POST",
		auth: true,
		body: JSON.stringify(descuento),
	});
}

export async function updateDescuento(id: number, descuento: Descuento) {
	return apiFetch(`${baseUrl}/descuentos/${id}`, {
		method: "PUT",
		auth: true,
		body: JSON.stringify(descuento),
	});
}

export async function changeDescuentoStatus(id: number) {
	return apiFetch(`${baseUrl}/descuentos/${id}/status`, {
		method: "PATCH",
		auth: true,
	});
}

export async function traerProductosPorDescuento(descuentoId: number) {
	return apiFetch(`${baseUrl}/descuentos/${descuentoId}/productos`);
}

export async function agregarProductoADescuento(
	descuentoId: number,
	productoId: number,
) {
	return apiFetch(
		`${baseUrl}/descuentos/${descuentoId}/productos/${productoId}`,
		{ method: "POST", auth: true },
	);
}

export async function eliminarProductoDeDescuento(
	descuentoId: number,
	productoId: number,
) {
	return apiFetch(
		`${baseUrl}/descuentos/${descuentoId}/productos/${productoId}`,
		{ method: "DELETE", auth: true },
	);
}
