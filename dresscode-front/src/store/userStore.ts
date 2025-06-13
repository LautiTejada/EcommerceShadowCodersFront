import { create } from "zustand";

import * as usuarioAPI from "../http/usuario";
import type { Usuario } from "../types/Usuario";
import type { Direccion } from "../types/Direccion";

interface UsuarioState {
  usuarios: Usuario[];
  direccionesUsuario: Direccion[];
  usuarioActual: Usuario | null;
  cargando: boolean;
  error: string | null;

  obtenerUsuarios: () => Promise<void>;
  obtenerUsuariosActivos: () => Promise<void>;
  obtenerUsuarioPorId: (id: number) => Promise<void>;
  crearUsuario: (usuario: Usuario) => Promise<void>;
  actualizarUsuario: (id: number, datos: Usuario) => Promise<void>;
  cambiarEstadoUsuario: (id: number) => Promise<void>;
  activarUsuario: (id: number) => Promise<void>;
  desactivarUsuario: (id: number) => Promise<void>;
  crearDireccionUsuario: (
    usuarioId: number,
    direccion: Direccion
  ) => Promise<void>;
  obtenerDireccionesUsuario: (usuarioId: number) => Promise<void>;
  actualizarDireccionUsuario: (
    usuarioId: number,
    direccionId: number,
    direccion: Direccion
  ) => Promise<void>;
  desactivarDireccionUsuario: (
    usuarioId: number,
    direccionId: number
  ) => Promise<void>;
  inicializarUsuario: () => Promise<void>;
  setUsuarioActual: (categoria: Usuario | null) => void;

  limpiarError: () => void;
}

export const useUsuarioStore = create<UsuarioState>((set, get) => ({
  usuarios: [],
  direccionesUsuario: [],
  usuarioActual: null,
  cargando: false,
  error: null,

  obtenerUsuarios: async () => {
    set({ cargando: true, error: null });
    try {
      const data = await usuarioAPI.getUsuarios();
      set({ usuarios: data, cargando: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  obtenerUsuariosActivos: async () => {
    set({ cargando: true, error: null });
    try {
      const data = await usuarioAPI.getUsuariosActivos();
      set({ usuarios: data, cargando: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  obtenerUsuarioPorId: async (id: number) => {
    set({ cargando: true, error: null });
    try {
      const usuario = await usuarioAPI.getUsuarioPorId(id);
      console.log("usuarioActual:", usuario); // <-- agrega esto
      set({ usuarioActual: usuario, cargando: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  crearUsuario: async (usuario) => {
    set({ cargando: true, error: null });
    try {
      const nuevo = await usuarioAPI.crearUsuario(usuario);
      set((state) => ({
        usuarios: [...state.usuarios, nuevo],
        cargando: false,
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  actualizarUsuario: async (id, datos) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.updateUsuario(id, datos);
      set((state) => ({
        usuarios: state.usuarios.map((u) => (u.id === id ? actualizado : u)),
        cargando: false,
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  cambiarEstadoUsuario: async (id) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.cambiarStateUsuario(id);
      set((state) => ({
        usuarios: state.usuarios.map((u) => (u.id === id ? actualizado : u)),
        cargando: false,
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  activarUsuario: async (id) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.activateUsuario(id);
      set((state) => ({
        usuarios: state.usuarios.map((u) => (u.id === id ? actualizado : u)),
        cargando: false,
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  desactivarUsuario: async (id) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.desactivateUsuario(id);
      set((state) => ({
        usuarios: state.usuarios.map((u) => (u.id === id ? actualizado : u)),
        cargando: false,
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  obtenerDireccionesUsuario: async (usuarioId) => {
    try {
      const direcciones = await usuarioAPI.getDireccionesDeUsuario(usuarioId);
      console.log("Respuesta cruda del backend:", direcciones);
      const direccionesValidas = Array.isArray(direcciones)
        ? direcciones.filter(
            (d) =>
              typeof d === "object" &&
              d !== null &&
              "calle" in d &&
              "numero" in d
          )
        : [];
      set({ direccionesUsuario: direccionesValidas });
    } catch (error) {
      console.log("Error obteniendo direcciones de usuario:", error);
    }
  },

  crearDireccionUsuario: async (usuarioId, direccion) => {
    try {
      await usuarioAPI.createDireccionDeUsuario(usuarioId, direccion);
      await get().obtenerDireccionesUsuario(usuarioId);
    } catch (error) {
      console.log("Error creando dirección de usuario:", error);
    }
  },

  actualizarDireccionUsuario: async (usuarioId, direccionId, direccion) => {
    try {
      await usuarioAPI.updateDireccionDeUsuario(
        usuarioId,
        direccionId,
        direccion
      );
      await get().obtenerDireccionesUsuario(usuarioId);
    } catch (error) {
      console.log("Error actualizando dirección de usuario:", error);
    }
  },

  desactivarDireccionUsuario: async (usuarioId, direccionId) => {
    try {
      await usuarioAPI.desactivarDireccionDeUsuario(usuarioId, direccionId);
      await get().obtenerDireccionesUsuario(usuarioId);
    } catch (error) {
      console.log("Error desactivando dirección de usuario:", error);
    }
  },

  inicializarUsuario: async () => {
    const userId = localStorage.getItem("usuario");
    if (userId) {
      await get().obtenerUsuarioPorId(Number(userId));
    }
  },

  limpiarError: () => set({ error: null }),

  setUsuarioActual: (usuario) => set({ usuarioActual: usuario }),
}));
