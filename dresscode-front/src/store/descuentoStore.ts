import { create } from "zustand";
import { activarDescuento, actualizarDescuento, cambiarEstadoDescuento, crearDescuento, desactivarDescuento, getDescuentoById, getDescuentos, getDescuentosActivos } from "../http/descuento";
import type { Descuento } from "../types/Descuento";

interface DescuentoState {
    descuentos : Descuento[];
    descuentosActivos : Descuento[];
    fetchDescuentos: () => Promise<void>;
    fetchDescuentosActivos: () => Promise<void>;
    addDescuento: (descuento: Descuento) => Promise<void>;
    updateDescuento : (id : number, descuento :Descuento) => Promise<void>;
    fetchDescuentoById:(id : number)=>Promise<Descuento | null>;
    toggleDescuentoStatus : (id: number) => Promise<void>;
    activateDescuento: (id: number) => Promise<void>;
    desactivateDescuento: (id: number) => Promise<void>;
}

export const useDescuentoStore = create<DescuentoState>((set, get)=> ({
    descuentos: [],
    descuentosActivos: [],

    fetchDescuentos: async () => {
        try {
            const descuentosFromApi = await getDescuentos();
            set({descuentos : descuentosFromApi })
        } catch (error) {
            console.error('Error cargando descuentos: ', error);
        }
    },

    fetchDescuentosActivos: async () => {
        try {
            const descuentosFromApi = await getDescuentosActivos();
            set({descuentos : descuentosFromApi })
        } catch (error) {
            console.error('Error cargando descuentos: ', error);
        }
    },

    fetchDescuentoById : async (id) => {
        try {
            return await getDescuentoById(id);
        } catch (error) {
            console.error(`Error cargando descuento por id ${id}: `, error);
            return null
        }
    },

    addDescuento : async (descuento) => {
        try {
            await crearDescuento(descuento);
            await get().fetchDescuentos()
        } catch (error) {
            console.error('Error creando descuento: ', error);
        }
    },

    updateDescuento : async (id, descuento) => {
        try {
            await actualizarDescuento(id, descuento)
            await get().fetchDescuentos();
        } catch (error) {
            console.error(`Error al actualizar el descuento con id ${id}: `, error);
            
        }
    },

    toggleDescuentoStatus : async (id: number) => {
        try {
            await cambiarEstadoDescuento(id);
            await get().fetchDescuentos();
        } catch (error) {
            console.error(`Error al cambiar estado descuento con id ${id}:`, error);
        }
    },

    activateDescuento: async (id : number) => {
        try {
            await activarDescuento(id);
            await get().fetchDescuentos();
        } catch (error) {
            console.error(`Error al activar descuento con id ${id}:`, error);
        }
    },

    desactivateDescuento: async (id : number) => {
        try {
            await desactivarDescuento(id);
            await get().fetchDescuentos();
        } catch (error) {
            console.error(`Error al desactivar descuento con id ${id}:`, error);
        }
    },

}))