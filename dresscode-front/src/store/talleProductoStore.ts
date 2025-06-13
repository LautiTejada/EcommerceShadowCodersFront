import { create } from "zustand";

import {
  getProductoTalles,
  crearProductoTalle,
  actualizarProductoTalle,
  obtenerCantidadTotal,
  actualizarCantidadProductoTalle,
} from "../http/productoTalle";
import type { ProductoTalle } from "../types/ProductoTalle";

interface ProductoTalleState {
  productoTalles: ProductoTalle[];
  cargando: boolean;
  error: string | null;

  fetchProductoTalles: () => Promise<void>;
  createProductoTalle: (productoTalle: ProductoTalle) => Promise<void>;
  updaterProductoTalle: (
    id: number,
    productoTalle: ProductoTalle
  ) => Promise<void>;
   fetchCantidadTotal: (productoId: number) => Promise<number>;
   updateCantidadProductoTalle: (idProductoTalle: number, cantidad: number) => Promise<void>;
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

  createProductoTalle: async (productoTalle) => {
    set({ cargando: true, error: null });
    try {
      await crearProductoTalle(productoTalle);
      await get().fetchProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al crear producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  updaterProductoTalle: async (id, productoTalle) => {
    set({ cargando: true, error: null });
    try {
      await actualizarProductoTalle(id, productoTalle);
      await get().fetchProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  fetchCantidadTotal: async (productoId) => {
    set({ cargando: true, error: null });
    try {
      const cantidadTotal = await obtenerCantidadTotal(productoId);
      return cantidadTotal;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al obtener cantidad total" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  updateCantidadProductoTalle: async (idProductoTalle, cantidad) => {
    set({ cargando: true, error: null });
    try {
      await actualizarCantidadProductoTalle(idProductoTalle, cantidad);
      await get().fetchProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar cantidad de producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },
}));
