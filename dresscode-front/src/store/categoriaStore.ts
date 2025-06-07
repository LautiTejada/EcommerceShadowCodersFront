import { create } from "zustand";
import type { Categoria } from "../types/Categoria";
import {
  getCategorias,
  getCategoriasActivas,
  getCategoriaById,
  crearCategoria,
  actualizarCategoria,
  cambiarEstadoCategoria,
  activarCategoria,
  desactivarCategoria
} from '../http/categoria';

interface CategoriaState {
  categorias: Categoria[];
  categoriasActivas: Categoria[];
  fetchCategorias: () => Promise<void>;
  fetchCategoriasActivas: () => Promise<void>;
  fetchCategoriaById: (id: number) => Promise<Categoria | null>;
  addCategoria: (categoria: Categoria) => Promise<void>;
  updateCategoria: (id: number, categoria: Categoria) => Promise<void>;
  toggleCategoriaStatus: (id: number) => Promise<void>;
  activateCategoria: (id: number) => Promise<void>;
  desactivateCategoria: (id: number) => Promise<void>;
}

export const useCategoriaStore = create<CategoriaState>((set, get) => ({
  categorias: [],
  categoriasActivas: [],

  fetchCategorias: async () => {
    try {
      const categoriasFromApi = await getCategorias();
      set({ categorias: categoriasFromApi });
    } catch (error) {

      console.error('Error cargando categorías:', error);
    }
  },

  fetchCategoriasActivas: async () => {
    try {
      const activas = await getCategoriasActivas();
      set({ categoriasActivas: activas });
    } catch (error) {
      console.error('Error cargando categorías activas:', error);
    }
  },

  fetchCategoriaById: async (id) => {
    try {
      return await getCategoriaById(id);
    } catch (error) {
      console.error(`Error cargando categoría con id ${id}:`, error);
      return null;
    }
  },

  addCategoria: async (categoria) => {
    try {
      await crearCategoria(categoria);
      await get().fetchCategorias();
    } catch (error) {
      console.error('Error creando categoría:', error);

    }
  },

  updateCategoria: async (id, categoria) => {
    try {
      await actualizarCategoria(id, categoria);
      await get().fetchCategorias();
    } catch (error) {
      console.error("Error actualizando categoría:", error);
    }
  },

  toggleCategoriaStatus: async (id) => {
    try {
      await cambiarEstadoCategoria(id);
      await get().fetchCategorias();
    } catch (error) {
      console.error('Error cambiando estado de categoría:', error);
    }
  },

  activateCategoria: async (id) => {
    try {
      await activarCategoria(id);
      await get().fetchCategorias();
    } catch (error) {
      console.error('Error activando categoría:', error);
    }
  },

  desactivateCategoria: async (id) => {
    try {
      await desactivarCategoria(id);
      await get().fetchCategorias();
    } catch (error) {
      console.error('Error desactivando categoría:', error);
    }
  }
}));
