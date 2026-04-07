import type { Categoria } from "../types/Categoria";
import type { PagedResponse } from "../types/PagedResponse";
import type { Producto } from "../types/Producto";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
	try {
		return await apiFetch(`${baseUrl}/productos`);
	} catch (error) {
		console.error("Error fetching productos:", error);
		throw error;
	}
};

export const getProductosActivos = async () => {
	try {
		return await apiFetch(`${baseUrl}/productos/active`);
	} catch (error) {
		console.error("Error fetching active productos:", error);
		throw error;
	}
};

export const addProductoConCategoria = async (
	producto: Producto,
	categoriaId: number,
) => {
	try {
		return await apiFetch(`${baseUrl}/productos/${categoriaId}`, {
			method: "POST",
			auth: true,
			body: JSON.stringify(producto),
		});
	} catch (error) {
		console.error("Error creating producto with category:", error);
		throw error;
	}
};

export const getProductoById = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/productos/${id}`);
	} catch (error) {
		console.error("Error fetching producto:", error);
		throw error;
	}
};

export const updateProducto = async (id: number, producto: Producto) => {
	try {
		return await apiFetch(`${baseUrl}/productos/${id}`, {
			method: "PUT",
			auth: true,
			body: JSON.stringify(producto),
		});
	} catch (error) {
		console.error("Error updating producto:", error);
		throw error;
	}
};

export const cambiarEstadoProducto = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/productos/${id}/status`, {
			method: "PATCH",
			auth: true,
		});
	} catch (error) {
		console.error("Error changing producto status:", error);
		throw error;
	}
};

export const getProductosPorCategoria = async (categoria: Categoria) => {
	try {
		return await apiFetch(`${baseUrl}/productos/categoria/${categoria.id}`);
	} catch (error) {
		console.error("Error fetching productos by category:", error);
		throw error;
	}
};

export const getProductosFiltrados = async (filtros: any) => {
	const params = new URLSearchParams();
	if (filtros.tipos?.length)
		filtros.tipos.forEach((id: string) => params.append("tipoIds", id));
	if (filtros.categorias?.length)
		filtros.categorias.forEach((id: string) =>
			params.append("categoriaIds", id),
		);
	if (filtros.marcas?.length)
		filtros.marcas.forEach((marca: string) => params.append("marcas", marca));
	if (filtros.precioMin) params.append("precioMin", filtros.precioMin);
	if (filtros.precioMax) params.append("precioMax", filtros.precioMax);
	return apiFetch(`${baseUrl}/productos/filtrar?${params.toString()}`);
};

export const getProductosPaged = async ({
	page = 0,
	size = 12,
	sort = "",
	filtros = {},
}: {
	page?: number;
	size?: number;
	sort?: string;
	filtros?: any;
}): Promise<PagedResponse<Producto>> => {
	const params = new URLSearchParams();
	params.append("page", String(page));
	params.append("size", String(size));
	if (sort) params.append("sort", sort);
	if (filtros.tipos?.length)
		filtros.tipos.forEach((id: string) => params.append("tipoIds", id));
	if (filtros.categorias?.length)
		filtros.categorias.forEach((id: string) =>
			params.append("categoriaIds", id),
		);
	if (filtros.marcas?.length)
		filtros.marcas.forEach((marca: string) => params.append("marcas", marca));
	if (filtros.precioMin) params.append("precioMin", filtros.precioMin);
	if (filtros.precioMax) params.append("precioMax", filtros.precioMax);
	return apiFetch(`${baseUrl}/productos/paged?${params.toString()}`);
};
