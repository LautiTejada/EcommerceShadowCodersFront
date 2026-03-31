import { create } from "zustand";
import type { DetalleOrden } from "../types/DetalleOrden";
import {
	createDetalleOrden,
	getDetalleOrdenById,
	getDetallesOrden,
	getDetallesOrdenActivos,
	getDetallesOrdenByOrdenId,
	updateDetalleOrden,
} from "../http/detalleOrden";

interface DetalleOrdenState {
	detallesOrden: DetalleOrden[];
	detallesOrdenActivos: DetalleOrden[];
	fetchDetalleOrdenById: (id: number) => Promise<DetalleOrden | null>;
	fetchDetallesOrden: () => Promise<void>;
	fetchDetallesOrdenActivos: () => Promise<void>;
	addDetalleOrden: (detalle: DetalleOrden) => Promise<void>;
	updateDetalleOrden: (id: number, nuevaCantidad: number) => Promise<void>;
	fetchDetallesOrdenByOrdenId: (ordenId: number) => Promise<DetalleOrden[]>;
}

export const useDetalleOrdenStore = create<DetalleOrdenState>((set, get) => ({
	detallesOrden: [],
	detallesOrdenActivos: [],

	fetchDetalleOrdenById: async (id: number) => {
		try {
			return await getDetalleOrdenById(id);
		} catch (error) {
			console.error("Error cargando detalle de orden:", error);
			throw error;
		}
	},

	fetchDetallesOrden: async () => {
		try {
			const detallesFromApi = await getDetallesOrden();
			set({ detallesOrden: detallesFromApi });
		} catch (error) {
			console.error("Error cargando detalles de orden:", error);
		}
	},

	fetchDetallesOrdenActivos: async () => {
		try {
			const detallesActivosFromApi = await getDetallesOrdenActivos();
			set({ detallesOrdenActivos: detallesActivosFromApi });
		} catch (error) {
			console.error("Error cargando detalles de orden activos:", error);
		}
	},

	addDetalleOrden: async (detalle) => {
		try {
			await createDetalleOrden(detalle);
			await get().fetchDetallesOrden();
		} catch (error) {
			console.error("Error creando detalle de orden:", error);
		}
	},

	updateDetalleOrden: async (id, nuevaCantidad) => {
		try {
			await updateDetalleOrden(id, nuevaCantidad);
			await get().fetchDetallesOrden();
		} catch (error) {
			console.error("Error actualizando detalle de orden:", error);
		}
	},

	fetchDetallesOrdenByOrdenId: async (ordenId: number) => {
		try {
			const detalles = await getDetallesOrdenByOrdenId(ordenId);
			return detalles;
		} catch (error) {
			console.error("Error cargando detalles de orden por ID de orden:", error);
			throw error;
		}
	},
}));
