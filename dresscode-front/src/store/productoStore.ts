import { create } from "zustand";
import type { Categoria } from "../types/Categoria";
import type { Producto } from "../types/Producto";
import {
	cambiarEstadoProducto,
	addProductoConCategoria,
	getProductoById,
	getProductos,
	getProductosActivos,
	getProductosFiltrados,
	getProductosPorCategoria,
	updateProducto,
	getProductosPaged,
} from "../http/producto";
import type { PagedResponse } from "../types/PagedResponse";

interface ProductoState {
	productos: Producto[];
	productosActivos: Producto[];
	productoActual: Producto | null;
	// Paginación
	pagedProductos: Producto[];
	totalPages: number;
	totalElements: number;
	page: number;
	size: number;
	fetchProductos: () => Promise<void>;
	fetchProductosActivos: () => Promise<void>;
	agregarProductoConCategoria: (
		producto: Producto,
		categoriaId: number,
	) => Promise<Producto>;
	fetchProductoById: (id: number) => Promise<Producto | null>;
	editarProducto: (id: number, producto: Producto) => Promise<void>;
	activarProducto: (id: number) => Promise<void>;
	desactivarProducto: (id: number) => Promise<void>;
	fetchProductosPorCategoria: (categoria: Categoria) => Promise<void>;
	setProductoActual: (producto: Producto | null) => void;
	fetchProductosFiltrados: (filtros: any) => Promise<void>;
	fetchProductosPaged: (args: {
		page?: number;
		size?: number;
		sortBy?: string;
		sortDir?: string;
		filtros?: any;
	}) => Promise<void>;
}
export const useProductoStore = create<ProductoState>((set, get) => ({
	productos: [],
	productosActivos: [],
	productoActual: null,
	pagedProductos: [],
	totalPages: 0,
	totalElements: 0,
	page: 0,
	size: 12,
	fetchProductosPaged: async ({
		page = 0,
		size = 12,
		sortBy = "id",
		sortDir = "asc",
		filtros = {},
	}) => {
		const paged: PagedResponse<Producto> = await getProductosPaged({
			page,
			size,
			sortBy,
			sortDir,
			filtros,
		});
		const rawContent = Array.isArray(paged?.content)
			? paged.content
			: Array.isArray(paged as any)
				? (paged as any)
				: [];
		// Filtrar items que son solo IDs (number) y normalizar descuentosProducto → descuentos
		const content = rawContent
			.filter((p: any) => p && typeof p === "object" && p.id !== undefined)
			.map((p: any) => ({
				...p,
				descuentos: p.descuentos ?? p.descuentosProducto ?? [],
			}));
		set({
			pagedProductos: content,
			totalPages: paged?.totalPages ?? 0,
			totalElements: paged?.totalElements ?? content.length,
			page: paged?.number ?? 0,
			size: paged?.size ?? size,
		});
	},
	fetchProductos: async () => {
		try {
			const productosFromApi = await getProductos();
			set({ productos: productosFromApi });
		} catch (error) {}
	},
	fetchProductosActivos: async () => {
		try {
			const productos = await getProductosActivos();
			set({ productosActivos: productos });
		} catch {
			// /activos puede fallar (ej: bug Hibernate en backend); se ignora silenciosamente
		}
	},
	agregarProductoConCategoria: async (producto, categoriaId) => {
		try {
			const nuevoProducto = await addProductoConCategoria(
				producto,
				categoriaId,
			);
			get().fetchProductos();
			return nuevoProducto;
		} catch (error) {
			throw error;
		}
	},
	fetchProductoById: async (id) => {
		try {
			const producto = await getProductoById(id);
			set({ productoActual: producto });
			return producto;
		} catch (error) {
			set({ productoActual: null });
			return null;
		}
	},
	editarProducto: async (id, producto) => {
		await updateProducto(id, producto);
		await get().fetchProductos();
		await get().fetchProductosActivos();
	},
	activarProducto: async (id) => {
		try {
			await cambiarEstadoProducto(id, true);
			await get().fetchProductosPaged({ page: 0, size: 100 });
		} catch (error) {}
	},
	desactivarProducto: async (id) => {
		try {
			await cambiarEstadoProducto(id, false);
			await get().fetchProductosPaged({ page: 0, size: 100 });
		} catch (error) {}
	},
	fetchProductosPorCategoria: async (categoria) => {
		try {
			const productos = await getProductosPorCategoria(categoria);
			set({ productos });
		} catch (error) {}
	},
	fetchProductosFiltrados: async (filtros) => {
		try {
			const productos = await getProductosFiltrados(filtros);
			set({ productosActivos: productos });
		} catch (error) {}
	},
	setProductoActual: (producto) => set({ productoActual: producto }),
}));
