import { create } from "zustand";
import {
  activarDescuento,
  actualizarDescuento,
  agregarProductoADescuento as apiAgregarProductoADescuento,
  cambiarEstadoDescuento,
  crearDescuento,
  desactivarDescuento,
  eliminarProductoDeDescuento as apiEliminarProductoDeDescuento,
  getDescuentoById,
  getDescuentos,
  getDescuentosActivos,
  traerProductosPorDescuento,
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
    productoId: number
  ) => Promise<void>;
  eliminarProductoDeDescuento: (
    descuentoId: number,
    productoId: number
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
      console.error("Error cargando descuentos: ", error);
    }
  },
  fetchDescuentosActivos: async () => {
    try {
      const descuentosFromApi = await getDescuentosActivos();
      set({ descuentos: descuentosFromApi });
    } catch (error) {
      console.error("Error cargando descuentos: ", error);
    }
  },

  fetchDescuentoById: async (id) => {
    try {
      return await getDescuentoById(id);
    } catch (error) {
      console.error(`Error cargando descuento por id ${id}: `, error);
      return null;
    }
  },

  addDescuento: async (descuento) => {
    try {
      await crearDescuento(descuento);
      await get().fetchDescuentos();
    } catch (error) {
      console.error("Error creando descuento: ", error);
    }
  },

  updateDescuento: async (id, descuento) => {
    try {
      await actualizarDescuento(id, descuento);
      await get().fetchDescuentos();
    } catch (error) {
      console.error(`Error al actualizar el descuento con id ${id}: `, error);
    }
  },

  toggleDescuentoStatus: async (id: number) => {
    try {
      await cambiarEstadoDescuento(id);
      await get().fetchDescuentos();
    } catch (error) {
      console.error(`Error al cambiar estado descuento con id ${id}:`, error);
    }
  },

  fetchProductosPorDescuento: async (descuentoId: number) => {
    try {
      const productosDescuento = await traerProductosPorDescuento(descuentoId);
      set({ productos: productosDescuento });
    } catch (error) {
      console.error(`Error cargando descuento por id ${descuentoId}: `, error);
    }
  },
  agregarProductoADescuento: async (descuentoId, productoId) => {
    try {
      await apiAgregarProductoADescuento(descuentoId, productoId);
      await get().fetchDescuentos();
      await get().fetchDescuentosActivos();
      const { fetchProductos, fetchProductosActivos } =
        useProductoStore.getState();
      await fetchProductos();
      await fetchProductosActivos();
    } catch (error: any) {
      // Manejo de error 409
      if (error.status === 409) {
        throw new Error("El producto ya está agregado a este descuento.");
      }
      throw error;
    }
  },
  eliminarProductoDeDescuento: async (descuentoId, productoId) => {
    try {
      await apiEliminarProductoDeDescuento(descuentoId, productoId);
      await get().fetchDescuentos();
      await get().fetchDescuentosActivos();
      const { fetchProductos, fetchProductosActivos } =
        useProductoStore.getState();
      await fetchProductos();
      await fetchProductosActivos();
    } catch (error) {
      console.error(
        `Error eliminando producto ${productoId} del descuento ${descuentoId}:`,
        error
      );
      throw error;
    }
  },

  activateDescuento: async (id: number) => {
    try {
      await activarDescuento(id);
      await get().fetchDescuentos();
    } catch (error) {
      console.error(`Error al activar descuento con id ${id}:`, error);
    }
  },

  desactivateDescuento: async (id: number) => {
    try {
      await desactivarDescuento(id);
      await get().fetchDescuentos();
    } catch (error) {
      console.error(`Error al desactivar descuento con id ${id}:`, error);
    }
  },
}));
