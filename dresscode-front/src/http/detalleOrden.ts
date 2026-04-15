import type { DetalleOrden } from "../types/DetalleOrden";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getDetalleOrdenById(id: number) {
	try {
		return await apiFetch(`${baseUrl}/detalles-orden/${id}`);
	} catch (error) {
		throw error;
	}
}

export async function getDetallesOrden() {
	try {
		return await apiFetch(`${baseUrl}/detalles-orden`);
	} catch (error) {
		throw error;
	}
}

export async function getDetallesOrdenActivos() {
	try {
		return await apiFetch(`${baseUrl}/detalles-orden/active`);
	} catch (error) {
		throw error;
	}
}

export async function createDetalleOrden(detalle: DetalleOrden) {
	try {
		return await apiFetch(`${baseUrl}/detalles-orden`, {
			method: "POST",
			body: JSON.stringify(detalle),
		});
	} catch (error) {
		throw error;
	}
}

export async function updateDetalleOrden(
	detalleId: number,
	nuevaCantidad: number,
) {
	try {
		return await apiFetch(`${baseUrl}/detalles-orden/${detalleId}`, {
			method: "PUT",
			body: JSON.stringify({ cantidad: nuevaCantidad }),
		});
	} catch (error) {
		throw error;
	}
}

export async function getDetallesOrdenByOrdenId(ordenId: number) {
	try {
		return await apiFetch(`${baseUrl}/detalles-orden/orden/${ordenId}`);
	} catch (error) {
		throw error;
	}
}
