import type { Categoria } from "../types/Categoria";
import type { PagedResponse } from "../types/PagedResponse";
import type { Producto } from "../types/Producto";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
	try {
		return await apiFetch(`${baseUrl}/productos`);
	} catch (error) {
		throw error;
	}
};

export const getProductosActivos = async () => {
	try {
		return await apiFetch(`${baseUrl}/productos/activos`);
	} catch (error) {
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
		throw error;
	}
};

export const getProductoById = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/productos/${id}`);
	} catch (error) {
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
		throw error;
	}
};

export const getProductosPorCategoria = async (categoria: Categoria) => {
	try {
		return await apiFetch(`${baseUrl}/productos/categoria/${categoria.id}`);
	} catch (error) {
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
	sortBy = "id",
	sortDir = "asc",
	filtros = {},
}: {
	page?: number;
	size?: number;
	sortBy?: string;
	sortDir?: string;
	filtros?: any;
}): Promise<PagedResponse<Producto>> => {
	const params = new URLSearchParams();
	params.append("page", String(page));
	params.append("size", String(size));
	params.append("sortBy", sortBy);
	params.append("sortDir", sortDir);
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
