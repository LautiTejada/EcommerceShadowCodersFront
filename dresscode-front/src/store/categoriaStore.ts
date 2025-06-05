import { create } from "zustand";
import type { Categoria } from "../types/Categoria";
import {
  getCategorias,
  crearCategoria,
  eliminarCategoria,
  actualizarCategoria,
} from "../http/categoria";

interface CategoriaState {
  categorias: Categoria[];
  fetchCategorias: () => Promise<void>;
  addCategoria: (categoria: { nombre: string }) => Promise<void>;
  deleteCategoria: (id: string) => Promise<void>;
  updateCategoria: (id: string, categoria: { nombre: string }) => Promise<void>;
}

export const useCategoriaStore = create<CategoriaState>((set, get) => ({
  categorias: [],

  fetchCategorias: async () => {
    try {
      const categoriasFromApi = await getCategorias();
      set({ categorias: categoriasFromApi });
    } catch (error) {
      console.error("Error cargando categorías en el store:", error);
    }
  },

  addCategoria: async (categoria) => {
    try {
      const nuevaCategoria = await crearCategoria(categoria);
      set((state) => ({
        categorias: [...state.categorias, nuevaCategoria],
      }));
    } catch (error) {
      console.error("Error agregando categoría:", error);
    }
  },

  deleteCategoria: async (id) => {
    try {
      await eliminarCategoria(id);
      set((state) => ({
        categorias: state.categorias.filter((cat) => cat.id !== parseInt(id)),
      }));
    } catch (error) {
      console.error("Error eliminando categoría:", error);
    }
  },

  updateCategoria: async (id, categoria) => {
    try {
      const categoriaActualizada = await actualizarCategoria(id, categoria);
      set((state) => ({
        categorias: state.categorias.map((cat) =>
          cat.id === parseInt(id) ? categoriaActualizada : cat
        ),
      }));
    } catch (error) {
      console.error("Error actualizando categoría:", error);
    }
  },
}));
