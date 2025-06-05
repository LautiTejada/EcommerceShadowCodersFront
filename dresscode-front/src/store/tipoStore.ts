import { create } from "zustand";
import type { Tipo } from "../types/Tipo";
import {
  getTipos,
  crearTipo,
  actualizarTipo,
  eliminarTipo,
  cambiarEstadoTipo,
} from "../http/tipo";

interface TipoState {
  tipos: Tipo[];
  tipoActual: Tipo | null;
  cargando: boolean;
  error: string | null;

  obtenerTipos: () => Promise<void>;
  crearTipo: (
    nuevoTipo: Omit<Tipo, "id" | "activo" | "categorias">
  ) => Promise<void>;
  actualizarTipo: (id: number, tipo: Partial<Tipo>) => Promise<void>;
  eliminarTipo: (id: number) => Promise<void>;
  cambiarEstadoTipo: (id: number) => Promise<void>;
  setTipoActual: (tipo: Tipo | null) => void;
}

export const tipoStore = create<TipoState>((set, get) => ({
  tipos: [],
  tipoActual: null,
  cargando: false,
  error: null,

  obtenerTipos: async () => {
    set({ cargando: true, error: null });
    try {
      const tipos = await getTipos();
      set({ tipos });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al obtener tipos" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  crearTipo: async (nuevoTipo) => {
    set({ cargando: true, error: null });
    try {
      await crearTipo(nuevoTipo);
      await get().obtenerTipos(); // actualiza la lista
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al crear tipo" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  actualizarTipo: async (id, tipo) => {
    set({ cargando: true, error: null });
    try {
      await actualizarTipo(id, tipo);
      await get().obtenerTipos();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al actualizar tipo" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  eliminarTipo: async (id) => {
    set({ cargando: true, error: null });
    try {
      await eliminarTipo(id);
      await get().obtenerTipos();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al eliminar tipo" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  cambiarEstadoTipo: async (id) => {
    set({ cargando: true, error: null });
    try {
      await cambiarEstadoTipo(id);
      await get().obtenerTipos();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message || "Error al cambiar estado" });
      }
    } finally {
      set({ cargando: false });
    }
  },

  setTipoActual: (tipo) => set({ tipoActual: tipo }),
}));
