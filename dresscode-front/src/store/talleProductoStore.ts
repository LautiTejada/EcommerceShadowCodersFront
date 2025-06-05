import { create } from "zustand";

import {
  getProductoTalles,
  crearProductoTalle,
  actualizarProductoTalle,
  eliminarProductoTalle,
} from "../http/productoTalle";
import type { ProductoTalle } from "../types/ProductoTalle";

interface ProductoTalleState {
  productoTalles: ProductoTalle[];
  cargando: boolean;
  error: string | null;

  obtenerProductoTalles: () => Promise<void>;
  crearProductoTalle: (pt: {
    productoId: string;
    talleId: string;
    cantidad: number;
  }) => Promise<void>;
  actualizarProductoTalle: (
    id: number,
    pt: { productoId: string; talleId: string; cantidad: number }
  ) => Promise<void>;
  eliminarProductoTalle: (id: number) => Promise<void>;
}

export const useProductoTalleStore = create<ProductoTalleState>((set, get) => ({
  productoTalles: [],
  cargando: false,
  error: null,

  obtenerProductoTalles: async () => {
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

  crearProductoTalle: async ({ productoId, talleId, cantidad }) => {
    set({ cargando: true, error: null });
    try {
      await crearProductoTalle({ productoId, talleId, stock: cantidad });
      await get().obtenerProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al crear producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  actualizarProductoTalle: async (id, { productoId, talleId, cantidad }) => {
    set({ cargando: true, error: null });
    try {
      await actualizarProductoTalle(id.toString(), {
        productoId,
        talleId,
        stock: cantidad,
      });
      await get().obtenerProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  eliminarProductoTalle: async (id) => {
    set({ cargando: true, error: null });
    try {
      await eliminarProductoTalle(id.toString());
      await get().obtenerProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al eliminar producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },
}));
