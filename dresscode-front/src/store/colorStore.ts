import { create } from "zustand";
import type { ColorItem } from "../types/ColorItem";
import {
	getColores,
	getColoresActivos,
	crearColor,
	actualizarColor,
	eliminarColor,
	cambiarEstadoColor,
} from "../http/color";

interface ColorState {
	colores: ColorItem[];
	coloresActivos: ColorItem[];
	fetchColores: () => Promise<void>;
	fetchColoresActivos: () => Promise<void>;
	addColor: (nombreColor: string) => Promise<void>;
	updateColor: (id: number, nombreColor: string) => Promise<void>;
	deleteColor: (id: number) => Promise<void>;
	toggleColorStatus: (id: number) => Promise<void>;
}

export const useColorStore = create<ColorState>((set, get) => ({
	colores: [],
	coloresActivos: [],

	fetchColores: async () => {
		const colores = await getColores();
		set({ colores });
	},

	fetchColoresActivos: async () => {
		const coloresActivos = await getColoresActivos();
		set({ coloresActivos });
	},

	addColor: async (nombreColor) => {
		await crearColor(nombreColor);
		await get().fetchColores();
	},

	updateColor: async (id, nombreColor) => {
		await actualizarColor(id, nombreColor);
		await get().fetchColores();
	},

	deleteColor: async (id) => {
		await eliminarColor(id);
		set((state) => ({
			colores: state.colores.filter((c) => c.id !== id),
			coloresActivos: state.coloresActivos.filter((c) => c.id !== id),
		}));
	},

	toggleColorStatus: async (id) => {
		await cambiarEstadoColor(id);
		await get().fetchColores();
	},
}));
