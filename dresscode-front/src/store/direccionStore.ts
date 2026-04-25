import { create } from "zustand";
import type { Direccion } from "../types/Direccion";
import {
	changeDireccionStatus,
	getDireccionById,
	getDirecciones,
	getDireccionesActivas,
} from "../http/direccion";

interface DireccionState {
	direcciones: Direccion[];
	direccionesActivas: Direccion[];
	fetchDirecciones: () => Promise<void>;
	fetchDireccionesActivas: () => Promise<void>;
	fetchDireccionById: (id: number) => Promise<Direccion | null>;
	toggleStateDireccion: (id: number) => Promise<void>;
	activateDireccion: (id: number) => Promise<void>;
	desactivateDireccion: (id: number) => Promise<void>;
}

export const useDireccionStore = create<DireccionState>((set, get) => ({
	direcciones: [],
	direccionesActivas: [],

	fetchDirecciones: async () => {
		try {
			const direccionesFromApi = await getDirecciones();
			set({ direcciones: direccionesFromApi });
		} catch (error) {
		}
	},

	fetchDireccionesActivas: async () => {
		try {
			const activas = await getDireccionesActivas();
			set({ direccionesActivas: activas });
		} catch (error) {
		}
	},

	fetchDireccionById: async (id) => {
		try {
			return await getDireccionById(id);
		} catch (error) {
			return null;
		}
	},

	toggleStateDireccion: async (id) => {
		try {
			await changeDireccionStatus(id);
			await get().fetchDirecciones();
		} catch (error) {
		}
	},

	activateDireccion: async (id) => {
		try {
			await changeDireccionStatus(id);
			await get().fetchDirecciones();
		} catch (error) {
		}
	},

	desactivateDireccion: async (id) => {
		try {
			await changeDireccionStatus(id);
			await get().fetchDirecciones();
		} catch (error) {
		}
	},
}));
