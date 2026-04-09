import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getImagenesProducto() {
	return apiFetch(`${baseUrl}/imagenes-producto`);
}

export async function getImagenesProductoActivas() {
	return apiFetch(`${baseUrl}/imagenes-producto/active`);
}

export async function subirImagenProducto(
	productoId: number,
	file: File,
	principal = false,
): Promise<{ id: number; urlImagen: string; activo: boolean }> {
	const token = localStorage.getItem("token");
	const formData = new FormData();
	formData.append("image", file);
	formData.append("principal", String(principal));

	const response = await fetch(
		`${baseUrl}/imagenes-producto/upload/${productoId}`,
		{
			method: "POST",
			headers: token ? { Authorization: `Bearer ${token}` } : {},
			body: formData,
		},
	);

	if (!response.ok) {
		const msg = await response.text();
		throw new Error(msg || `Error ${response.status} subiendo imagen`);
	}
	return response.json();
}

export async function eliminarImagenProducto(id: number): Promise<void> {
	return apiFetch(`${baseUrl}/imagenes-producto/${id}`, {
		method: "DELETE",
		auth: true,
	});
}

export async function cambiarEstadoImagenProducto(id: number) {
	return apiFetch(`${baseUrl}/imagenes-producto/${id}/status`, {
		method: "PATCH",
		auth: true,
	});
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
