import { create } from "zustand";

import {
  getProductoTalles,
  crearProductoTalle,
  actualizarProductoTalle,
} from "../http/productoTalle";
import type { ProductoTalle } from "../types/ProductoTalle";

interface ProductoTalleState {
  productoTalles: ProductoTalle[];
  cargando: boolean;
  error: string | null;

  obtenerProductoTalles: () => Promise<void>;
  crearProductoTalle: (productoTalle: ProductoTalle) => Promise<void>;
  actualizarProductoTalle: (
    id: number,
    productoTalle: ProductoTalle
  ) => Promise<void>;
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

  crearProductoTalle: async (productoTalle) => {
    set({ cargando: true, error: null });
    try {
      await crearProductoTalle(productoTalle);
      await get().obtenerProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al crear producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  actualizarProductoTalle: async (id, productoTalle) => {
    set({ cargando: true, error: null });
    try {
      await actualizarProductoTalle(id, productoTalle);
      await get().obtenerProductoTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar producto talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },
}));
