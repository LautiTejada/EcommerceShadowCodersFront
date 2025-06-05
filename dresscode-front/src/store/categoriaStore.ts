import { create } from 'zustand';
import type { Categoria } from '../types/Categoria';
import { getCategorias } from '../http/categoria';

interface CategoriaState {
  categorias: Categoria[];
  fetchCategorias: () => Promise<void>;
}

export const useCategoriaStore = create<CategoriaState>((set) => ({
  categorias: [],

  fetchCategorias: async () => {
    try {
      const categoriasFromApi = await getCategorias();
      set({ categorias: categoriasFromApi });
    } catch (error) {
      console.error('Error cargando categorías en el store:', error);
    }
  },
}));
