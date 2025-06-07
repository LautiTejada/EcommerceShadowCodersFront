import { create } from "zustand";
import type { EstadoOrden } from "../types/enums/EstadoOrden";
import type { OrdenDeCompra } from "../types/OrdenDeCompra";
import {actualizarEstadoOrdenDeCompra, crearOrdenDeCompra, getOrdenDeCompra, getOrdenesDeCompra, getOrdenesPorUsuario } from "../http/ordenDeCompra";

interface ordenCompraState {
    ordenesCompra: OrdenDeCompra[];
    fetchOrdenesDeCompra: () => Promise<void>;
    fetchOrdenCompraById: (id: number) => Promise<void>;
    fetchOrdenesPorUsuario: (usuarioId: number) => Promise<void>;
    updateEstadoOrdenDeCompra: (
         detalleId: number,
         estado: EstadoOrden
    ) => Promise<void>;
    createOrdenDeCompra: (orden: OrdenDeCompra) => Promise<void>;
}


export const useOrdenCompraStore = create<ordenCompraState>((set, get) => ({

    ordenesCompra: [],

    fetchOrdenesDeCompra: async () => {
        try {
            const ordenes = await getOrdenesDeCompra();
            set({ ordenesCompra: ordenes });
        } catch (error) {
            console.error("Error fetching ordenes de compra:", error);
            throw error;
        }
    },

    fetchOrdenCompraById: async (id: number) => {
        try {
            return await getOrdenDeCompra(id);
        } catch (error) {
            console.error("Error fetching orden de compra:", error);
            throw error;
        }
    },

    fetchOrdenesPorUsuario: async (usuarioId: number) => {
        try {
            return await getOrdenesPorUsuario(usuarioId);
        } catch (error) {
            console.error("Error fetching ordenes de compra por usuario:", error);
            throw error;
        }
    },

    updateEstadoOrdenDeCompra: async (detalleId, estado) => {
        try {
            await actualizarEstadoOrdenDeCompra(detalleId, estado);
            get().fetchOrdenesDeCompra();
        } catch (error) {
            console.error("Error updating estado orden de compra:", error);
            throw error;
        }
    },

    createOrdenDeCompra: async (orden: OrdenDeCompra) => {
        try {
            await crearOrdenDeCompra(orden);
        } catch (error) {
            console.error("Error creating orden de compra:", error);
            throw error;
        }
    },

}))