import { create } from "zustand";
import type { Categoria } from "../types/Categoria";
import {
	getCategoriasActivas,
	getCategoriaById,
	crearCategoria,
	actualizarCategoria,
	cambiarEstadoCategoria,
	activarCategoria,
	desactivarCategoria,
} from "../http/categoria";

interface CategoriaState {
	categorias: Categoria[];
	categoriaActual: Categoria | null;
	categoriasActivas: Categoria[];
	fetchCategoriasActivas: () => Promise<void>;
	fetchCategoriaById: (id: number) => Promise<Categoria | null>;
	addCategoria: (categoria: Categoria, idTipo: number) => Promise<void>;
	updateCategoria: (
		id: number,
		categoria: Categoria,
		tipoId: number,
	) => Promise<void>;
	toggleCategoriaStatus: (id: number) => Promise<void>;
	activateCategoria: (id: number) => Promise<void>;
	desactivateCategoria: (id: number) => Promise<void>;
	setCategoriaActual: (categoria: Categoria | null) => void;
}

export const useCategoriaStore = create<CategoriaState>((set, get) => ({
	categorias: [],
	categoriaActual: null,
	categoriasActivas: [],

	fetchCategoriasActivas: async () => {
		try {
			const activas = await getCategoriasActivas();
			set({ categoriasActivas: activas });
		} catch (error) {
			console.error("Error cargando categorías activas:", error);
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

	addCategoria: async (categoria, idTipo) => {
		try {
			await crearCategoria(categoria, idTipo);
			await get().fetchCategoriasActivas();
		} catch (error) {
			console.error("Error creando categoría:", error);
		}
	},

	updateCategoria: async (id, categoria, tipoId) => {
		try {
			await actualizarCategoria(id, categoria, tipoId);
			await get().fetchCategoriasActivas();
		} catch (error) {
			console.error("Error actualizando categoría:", error);
		}
	},

	toggleCategoriaStatus: async (id) => {
		try {
			await cambiarEstadoCategoria(id);
			await get().fetchCategoriasActivas();
		} catch (error) {
			console.error("Error cambiando estado de categoría:", error);
		}
	},

	activateCategoria: async (id) => {
		try {
			await activarCategoria(id);
			await get().fetchCategoriasActivas();
		} catch (error) {
			console.error("Error activando categoría:", error);
		}
	},

	desactivateCategoria: async (id) => {
		try {
			await desactivarCategoria(id);

			set((state) => ({
				categoriasActivas: state.categoriasActivas.filter((c) => c.id !== id),
			}));
		} catch (error) {
			console.error("Error desactivando categoría:", error);
		}
	},

	setCategoriaActual: (categoria) => set({ categoriaActual: categoria }),
}));
