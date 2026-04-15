import { create } from "zustand";
import type { EstadoOrden } from "../types/enums/EstadoOrden";
import type { OrdenDeCompra } from "../types/OrdenDeCompra";
import {
	actualizarEstadoOrdenDeCompra,
	crearOrdenDeCompra,
	getOrdenDeCompra,
	getOrdenesDeCompra,
	getOrdenesPorUsuario,
} from "../http/ordenDeCompra";

interface ordenCompraState {
	ordenesCompra: OrdenDeCompra[];
	fetchOrdenesDeCompra: () => Promise<void>;
	fetchOrdenCompraById: (id: number) => Promise<void>;
	fetchOrdenesPorUsuario: (usuarioId: number) => Promise<void>;
	updateEstadoOrdenDeCompra: (
		detalleId: number,
		estado: EstadoOrden,
	) => Promise<void>;
	createOrdenDeCompra: (orden: OrdenDeCompra) => Promise<OrdenDeCompra>;
}

export const useOrdenCompraStore = create<ordenCompraState>((set, get) => ({
	ordenesCompra: [],

	fetchOrdenesDeCompra: async () => {
		try {
			const ordenes = await getOrdenesDeCompra();
			set({ ordenesCompra: ordenes });
		} catch (error) {
			throw error;
		}
	},

	fetchOrdenCompraById: async (id: number) => {
		try {
			return await getOrdenDeCompra(id);
		} catch (error) {
			throw error;
		}
	},

	fetchOrdenesPorUsuario: async (usuarioId: number) => {
		try {
			const ordenes = await getOrdenesPorUsuario(usuarioId);
			set({ ordenesCompra: ordenes });
		} catch (error) {
			throw error;
		}
	},

	updateEstadoOrdenDeCompra: async (detalleId, estado) => {
		try {
			await actualizarEstadoOrdenDeCompra(detalleId, estado);
			get().fetchOrdenesDeCompra();
		} catch (error) {
			throw error;
		}
	},

	createOrdenDeCompra: async (orden: OrdenDeCompra) => {
		try {
			const ordenCreada = await crearOrdenDeCompra(orden);
			return ordenCreada;
		} catch (error) {
			throw error;
		}
	},
}));
