import { create } from "zustand";

import { getProductoTalles, createProductoTalle } from "../http/productoTalle";
import type { ProductoTalle } from "../types/ProductoTalle";

interface ProductoTalleState {
	productoTalles: ProductoTalle[];
	cargando: boolean;
	error: string | null;

	fetchProductoTalles: () => Promise<void>;
	createProductoTalle: (
		productoId: number,
		talleId: number,
		cantidad: number,
	) => Promise<void>;
	updaterProductoTalle: (
		id: number,
		productoTalle: ProductoTalle,
	) => Promise<void>;
	fetchCantidadTotal: (productoId: number) => Promise<number>;
	updateCantidadProductoTalle: (
		idProductoTalle: number,
		cantidad: number,
	) => Promise<void>;
}

export const useProductoTalleStore = create<ProductoTalleState>((set, get) => ({
	productoTalles: [],
	cargando: false,
	error: null,

	fetchProductoTalles: async () => {
		set({ cargando: true, error: null });
		try {
			const data = await getProductoTalles();
			set({ productoTalles: data });
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al obtener producto talles" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	createProductoTalle: async (productoId, talleId, cantidad) => {
		set({ cargando: true, error: null });
		try {
			await createProductoTalle(productoId, talleId, cantidad);
			await get().fetchProductoTalles();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al crear producto talle" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	updaterProductoTalle: async (_id, _productoTalle) => {
		set({ cargando: true, error: null });
		try {
			// Función no implementada
			await get().fetchProductoTalles();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al actualizar producto talle" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	fetchCantidadTotal: async (_productoId) => {
		set({ cargando: true, error: null });
		try {
			// Función no implementada
			return 0;
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al obtener cantidad total" });
			}
			return 0;
		} finally {
			set({ cargando: false });
		}
	},

	updateCantidadProductoTalle: async (_idProductoTalle, _cantidad) => {
		set({ cargando: true, error: null });
		try {
			// Función no implementada
			await get().fetchProductoTalles();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({
					error:
						error.message || "Error al actualizar cantidad de producto talle",
				});
			}
		} finally {
			set({ cargando: false });
		}
	},
}));
