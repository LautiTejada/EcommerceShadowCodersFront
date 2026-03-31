import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getImagenesProducto() {
	return apiFetch(`${baseUrl}/imagenes-producto`);
}

export async function getImagenesProductoActivas() {
	return apiFetch(`${baseUrl}/imagenes-producto/active`);
}

export async function getImagenesProductoByProductoId(productoId: number) {
	try {
		return await apiFetch(
			`${baseUrl}/imagenes-producto/producto/${productoId}`,
		);
	} catch (error) {
		console.error("Error fetching imagenes producto by productoId:", error);
		throw error;
	}
}

export async function activarImagenProducto(id: number) {
	try {
		return await apiFetch(`${baseUrl}/imagenes-producto/${id}/activate`, {
			method: "PUT",
		});
	} catch (error) {
		console.error("Error activating imagen producto:", error);
		throw error;
	}
}

export async function desactivarImagenProducto(id: number) {
	try {
		return await apiFetch(`${baseUrl}/imagenes-producto/${id}/deactivate`, {
			method: "PUT",
		});
	} catch (error) {
		console.error("Error deactivating imagen producto:", error);
		throw error;
	}
}
