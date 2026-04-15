import { create } from "zustand";
import {
	eliminarProductoDeDescuento,
	getDescuentoById,
	getDescuentos,
	getDescuentosActivos,
	traerProductosPorDescuento,
	createDescuento,
	updateDescuento,
	changeDescuentoStatus,
	agregarProductoADescuento,
} from "../http/descuento";
import type { Descuento } from "../types/Descuento";
import type { Producto } from "../types/Producto";
import { useProductoStore } from "./productoStore";

interface DescuentoState {
	descuentos: Descuento[];
	descuentoActual: Descuento | null;
	descuentosActivos: Descuento[];
	productos: Producto[];
	setDescuentoActual: (descuento: Descuento | null) => void;
	fetchDescuentos: () => Promise<void>;
	fetchDescuentosActivos: () => Promise<void>;
	addDescuento: (descuento: Descuento) => Promise<void>;
	updateDescuento: (id: number, descuento: Descuento) => Promise<void>;
	fetchDescuentoById: (id: number) => Promise<Descuento | null>;
	fetchProductosPorDescuento: (descuentoId: number) => Promise<void>;
	agregarProductoADescuento: (
		descuentoId: number,
		productoId: number,
	) => Promise<void>;
	eliminarProductoDeDescuento: (
		descuentoId: number,
		productoId: number,
	) => Promise<void>;
	toggleDescuentoStatus: (id: number) => Promise<void>;
	activateDescuento: (id: number) => Promise<void>;
	desactivateDescuento: (id: number) => Promise<void>;
}

export const useDescuentoStore = create<DescuentoState>((set, get) => ({
	descuentos: [],
	descuentoActual: null,
	descuentosActivos: [],
	productos: [],

	setDescuentoActual: (descuento) => set({ descuentoActual: descuento }),

	fetchDescuentos: async () => {
		try {
			const descuentosFromApi = await getDescuentos();
			set({ descuentos: descuentosFromApi });
		} catch (error) {
		}
	},
	fetchDescuentosActivos: async () => {
		try {
			const descuentosFromApi = await getDescuentosActivos();
			set({ descuentos: descuentosFromApi });
		} catch (error) {
		}
	},

	fetchDescuentoById: async (id) => {
		try {
			return await getDescuentoById(id);
		} catch (error) {
			return null;
		}
	},

	addDescuento: async (descuento) => {
		try {
			await createDescuento(descuento);
			await get().fetchDescuentos();
		} catch (error) {
		}
	},

	updateDescuento: async (id, descuento) => {
		try {
			await updateDescuento(id, descuento);
			await get().fetchDescuentos();
		} catch (error) {
		}
	},

	toggleDescuentoStatus: async (id: number) => {
		try {
			await changeDescuentoStatus(id);
			await get().fetchDescuentos();
		} catch (error) {
		}
	},

	fetchProductosPorDescuento: async (descuentoId: number) => {
		try {
			const productosDescuento = await traerProductosPorDescuento(descuentoId);
			set({ productos: productosDescuento });
		} catch (error) {
		}
	},
	agregarProductoADescuento: async (descuentoId, productoId) => {
		try {
			await agregarProductoADescuento(descuentoId, productoId);
			await get().fetchDescuentos();
			await get().fetchDescuentosActivos();
			const { fetchProductos, fetchProductosActivos } =
				useProductoStore.getState();
			await fetchProductos();
			await fetchProductosActivos();
		} catch (error: any) {
			if (error.status === 409) {
				throw new Error("El producto ya está agregado a este descuento.");
			}
			throw error;
		}
	},
	eliminarProductoDeDescuento: async (descuentoId, productoId) => {
		try {
			await eliminarProductoDeDescuento(descuentoId, productoId);
			await get().fetchDescuentos();
			await get().fetchDescuentosActivos();
			const { fetchProductos, fetchProductosActivos } =
				useProductoStore.getState();
			await fetchProductos();
			await fetchProductosActivos();
		} catch (error) {
			throw error;
		}
	},

	activateDescuento: async (id: number) => {
		try {
			await changeDescuentoStatus(id);
			await get().fetchDescuentos();
		} catch (error) {
		}
	},

	desactivateDescuento: async (id: number) => {
		try {
			await changeDescuentoStatus(id);
			await get().fetchDescuentos();
		} catch (error) {
		}
	},
}));
