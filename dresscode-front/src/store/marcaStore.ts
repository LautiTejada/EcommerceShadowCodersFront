import { create } from "zustand";
import type { MarcaItem } from "../types/MarcaItem";
import {
	getMarcas,
	getMarcasActivas,
	crearMarca,
	actualizarMarca,
	eliminarMarca,
	cambiarEstadoMarca,
} from "../http/marca";

interface MarcaState {
	marcas: MarcaItem[];
	marcasActivas: MarcaItem[];
	fetchMarcas: () => Promise<void>;
	fetchMarcasActivas: () => Promise<void>;
	addMarca: (nombreMarca: string) => Promise<void>;
	updateMarca: (id: number, nombreMarca: string) => Promise<void>;
	deleteMarca: (id: number) => Promise<void>;
	toggleMarcaStatus: (id: number) => Promise<void>;
}

export const useMarcaStore = create<MarcaState>((set, get) => ({
	marcas: [],
	marcasActivas: [],

	fetchMarcas: async () => {
		const marcas = await getMarcas();
		set({ marcas });
	},

	fetchMarcasActivas: async () => {
		const marcasActivas = await getMarcasActivas();
		set({ marcasActivas });
	},

	addMarca: async (nombreMarca) => {
		await crearMarca(nombreMarca);
		await get().fetchMarcas();
	},

	updateMarca: async (id, nombreMarca) => {
		await actualizarMarca(id, nombreMarca);
		await get().fetchMarcas();
	},

	deleteMarca: async (id) => {
		await eliminarMarca(id);
		set((state) => ({
			marcas: state.marcas.filter((m) => m.id !== id),
			marcasActivas: state.marcasActivas.filter((m) => m.id !== id),
		}));
	},

	toggleMarcaStatus: async (id) => {
		await cambiarEstadoMarca(id);
		await get().fetchMarcas();
	},
}));
