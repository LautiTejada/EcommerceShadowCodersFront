import type { ProductoTalle } from "../types/ProductoTalle";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

function handleApiError(error: unknown, context: string) {
	console.error(`Error en ${context}:`, error);
	throw new Error(`No se pudo completar la operación: ${context}`);
}

export async function getProductoTalles() {
	try {
		return await apiFetch(`${baseUrl}/producto-talles`);
	} catch (error) {
		handleApiError(error, "obtener producto talles");
	}
}

export async function createProductoTalle(
	productoId: number,
	talleId: number,
	cantidad: number,
) {
	if (!productoId || !talleId || typeof cantidad !== "number")
		throw new Error("Datos inválidos para crear producto talle");
	try {
		return await apiFetch(
			`${baseUrl}/producto-talles/crear/${productoId}/talle/${talleId}`,
			{
				method: "POST",
				body: JSON.stringify({ cantidad }),
			},
		);
	} catch (error) {
		handleApiError(
			error,
			`crear producto talle para producto ${productoId} y talle ${talleId}`,
		);
	}
}

export async function updateProductoTalleCantidad(
	idProductoTalle: number,
	cantidad: number,
) {
	if (!idProductoTalle || typeof cantidad !== "number")
		throw new Error("Datos inválidos para actualizar cantidad");
	try {
		return await apiFetch(
			`${baseUrl}/producto-talles/${idProductoTalle}/cantidad`,
			{
				method: "PUT",
				body: JSON.stringify({ cantidad }),
			},
		);
	} catch (error) {
		handleApiError(
			error,
			`actualizar cantidad de producto talle ${idProductoTalle}`,
		);
	}
}

export async function updateProductoTalle(
	id: number,
	productoTalle: ProductoTalle,
) {
	if (!id || !productoTalle)
		throw new Error("Datos inválidos para actualizar producto talle");
	try {
		return await apiFetch(`${baseUrl}/producto-talles/${id}`, {
			method: "PUT",
			body: JSON.stringify(productoTalle),
		});
	} catch (error) {
		handleApiError(error, `actualizar producto talle ${id}`);
	}
}

export async function getTotalProductoTalles(productoId: number) {
	if (!productoId) throw new Error("ID de producto inválido");
	try {
		return await apiFetch(
			`${baseUrl}/producto-talles/producto/${productoId}/cantidad-total`,
		);
	} catch (error) {
		handleApiError(
			error,
			`obtener cantidad total de producto talles para producto ${productoId}`,
		);
	}
}
