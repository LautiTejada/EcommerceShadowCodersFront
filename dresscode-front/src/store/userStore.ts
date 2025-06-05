// src/store/useUsuarioStore.ts
import { create } from "zustand";

import * as usuarioAPI from "../http/usuario"; // Ajustá el path si es distinto
import type { Usuario } from "../types/Usuario";

interface UsuarioState {
  usuarios: Usuario[];
  usuarioActual: Usuario | null;
  cargando: boolean;
  error: string | null;

  obtenerUsuarios: () => Promise<void>;
  obtenerUsuarioPorId: (id: number) => Promise<void>;
  crearUsuario: (usuario: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  actualizarUsuario: (
    id: number,
    datos: { username: string; email: string; password: string }
  ) => Promise<void>;
  eliminarUsuario: (id: number) => Promise<void>;
  cambiarEstado: (id: number) => Promise<void>;
  activar: (id: number) => Promise<void>;
  desactivar: (id: number) => Promise<void>;
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
      // Adaptar el objeto para la API si es necesario
      const nuevo = await usuarioAPI.crearUsuario({
        nombre: usuario.username, // la API espera 'nombre'
        email: usuario.email,
        password: usuario.password,
      });
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
      const actualizado = await usuarioAPI.actualizarUsuario(id, {
        nombre: datos.username, // la API espera 'nombre'
        email: datos.email,
        password: datos.password,
      });
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

  eliminarUsuario: async (id) => {
    set({ cargando: true, error: null });
    try {
      await usuarioAPI.eliminarUsuario(id);
      set((state) => ({
        usuarios: state.usuarios.filter((u) => u.id !== id),
        cargando: false,
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, cargando: false });
      }
    }
  },

  cambiarEstado: async (id) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.cambiarEstadoUsuario(id);
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

  activar: async (id) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.activarUsuario(id);
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

  desactivar: async (id) => {
    set({ cargando: true, error: null });
    try {
      const actualizado = await usuarioAPI.desactivarUsuario(id);
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
