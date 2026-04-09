import { create } from "zustand";

import {
	getProductoTalles,
	createProductoTalle,
	updateProductoTalleCantidad,
} from "../http/productoTalle";
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

	updateCantidadProductoTalle: async (idProductoTalle, cantidad) => {
		set({ cargando: true, error: null });
		try {
			await updateProductoTalleCantidad(idProductoTalle, cantidad);
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
