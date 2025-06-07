import { create } from "zustand";
import type { Direccion } from "../types/Direccion";
import { activarDireccion, cambiarEstadoDireccion, desactivarDireccion, getDireccionById, getDirecciones, getDireccionesActivas } from "../http/direccion";

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
            console.error('Error cargando direcciones:', error);
        }
    },

    fetchDireccionesActivas: async () => {
        try {
            const activas = await getDireccionesActivas();
            set({ direccionesActivas: activas });
        } catch (error) {
            console.error('Error cargando direcciones activas:', error);
        }
    },

    fetchDireccionById: async (id) => {
        try {
            return await getDireccionById(id);
        } catch (error) {
            console.error(`Error cargando dirección con id ${id}:`, error);
            return null;
        }
    },

    toggleStateDireccion: async (id) => {
        try {
            await cambiarEstadoDireccion(id);
            await get().fetchDirecciones();
        } catch (error) {
            console.error(`Error cambiando estado de dirección con id ${id}:`, error);
        }
    },

    activateDireccion: async (id) => {
        try {
            await activarDireccion(id);
            await get().fetchDirecciones();
        } catch (error) {
            console.error(`Error activando dirección con id ${id}:`, error);
        }
    },

    desactivateDireccion: async (id) => {
        try {
            await desactivarDireccion(id);
            await get().fetchDirecciones();
        } catch (error) {
            console.error(`Error desactivando dirección con id ${id}:`, error);
        }
    },
}));
