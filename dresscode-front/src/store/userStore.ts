
import { create } from "zustand";

import * as usuarioAPI from "../http/usuario"; 
import type { Usuario } from "../types/Usuario";

interface UsuarioState {
  usuarios: Usuario[];
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
  limpiarError: () => void;
}

export const useUsuarioStore = create<UsuarioState>((set) => ({
  usuarios: [],
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

  limpiarError: () => set({ error: null }),
}));
