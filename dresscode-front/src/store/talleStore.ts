import { create } from "zustand";

import {
  getTalle,
  crearTalle,
  actualizarTalle,
} from "../http/talle";
import type { Talle } from "../types/Talle";

interface TalleState {
  talles: Talle[];
  talleActual: Talle | null;
  cargando: boolean;
  error: string | null;

  obtenerTalles: () => Promise<void>;
  crearTalle: (
    nuevoTalle: Talle
  ) => Promise<void>;
  actualizarTalle: (id: number, talle: Talle) => Promise<void>;
  setTalleActual: (talle: Talle | null) => void;
}

export const talleStore = create<TalleState>((set, get) => ({
  talles: [],
  talleActual: null,
  cargando: false,
  error: null,

  obtenerTalles: async () => {
    set({ cargando: true, error: null });
    try {
      const talles = await getTalle();
      set({ talles });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al obtener talles" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  crearTalle: async (talle) => {
    set({ cargando: true, error: null });
    try {
      await crearTalle(talle);
      await get().obtenerTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al crear talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  actualizarTalle: async (id, talle) => {
    set({ cargando: true, error: null });
    try {
      await actualizarTalle(id, talle);
      await get().obtenerTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },


  setTalleActual: (talle) => set({ talleActual: talle }),
}));
