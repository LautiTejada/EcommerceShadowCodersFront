import { create } from "zustand";

import {
  getTalle,
  crearTalle,
  actualizarTalle,
  eliminarTalle,
} from "../http/talle";
import type { Talle } from "../types/Talle";

interface TalleState {
  talles: Talle[];
  talleActual: Talle | null;
  cargando: boolean;
  error: string | null;

  obtenerTalles: () => Promise<void>;
  crearTalle: (
    nuevo: Omit<Talle, "id" | "activo" | "productos">
  ) => Promise<void>;
  actualizarTalle: (id: number, talle: Partial<Talle>) => Promise<void>;
  eliminarTalle: (id: number) => Promise<void>;
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

  crearTalle: async (nuevo) => {
    set({ cargando: true, error: null });
    try {
      await crearTalle({ nombre: nuevo.tipoTalle }); // la API espera 'nombre'
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
      await actualizarTalle(id.toString(), { nombre: talle.tipoTalle! }); // la API espera 'nombre'
      await get().obtenerTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  eliminarTalle: async (id) => {
    set({ cargando: true, error: null });
    try {
      await eliminarTalle(id.toString());
      await get().obtenerTalles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al eliminar talle" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  setTalleActual: (talle) => set({ talleActual: talle }),
}));
