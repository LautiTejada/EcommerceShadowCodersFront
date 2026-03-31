import { create } from "zustand";
import type { ImagenProducto } from "../types/ImagenProducto";
import {
	activarImagenProducto,
	desactivarImagenProducto,
	getImagenesProducto,
} from "../http/imagenProducto";

interface imagenProductoState {
	imagenes: ImagenProducto[];
	imagenesActivas: ImagenProducto[];
	fetchImagenes: () => Promise<void>;
	fetchImagenesActivas: () => Promise<void>;
	fetchImagenById: (id: number) => Promise<ImagenProducto | null>;
	updateImagen: (id: number, imagen: ImagenProducto) => Promise<void>;
	deleteImagen: (id: number) => Promise<void>;
	toggleStateImagen: (id: number) => Promise<void>;
	activateImagen: (id: number) => Promise<void>;
	desactivateImagen: (id: number) => Promise<void>;
}

export const useImagenProductoStore = create<imagenProductoState>(
	(set, get) => ({
		imagenes: [],
		imagenesActivas: [],

		fetchImagenes: async () => {
			try {
				const imagenesFromApi = await getImagenesProducto();
				set({ imagenes: imagenesFromApi });
			} catch (error) {
				console.error("Error fetching imagenes:", error);
			}
		},

		fetchImagenesActivas: async () => {
			try {
				const imagenesActivasFromApi = await getImagenesProducto();
				set({ imagenesActivas: imagenesActivasFromApi });
			} catch (error) {
				console.error("Error fetching active imagenes:", error);
			}
		},

		fetchImagenById: async (id) => {
			try {
				return await getImagenesProducto();
			} catch (error) {
				console.error(`Error fetching imagen con id ${id}:`, error);
				return null;
			}
		},

		updateImagen: async (id) => {
			try {
				await get().fetchImagenes();
			} catch (error) {
				console.error(`Error updating imagen con id ${id}:`, error);
			}
		},

		deleteImagen: async (id) => {
			try {
				await get().fetchImagenes();
			} catch (error) {
				console.error(`Error deleting imagen con id ${id}:`, error);
			}
		},

		toggleStateImagen: async (id) => {
			try {
				await get().fetchImagenes();
			} catch (error) {
				console.error(`Error toggling state of imagen con id ${id}:`, error);
			}
		},

		activateImagen: async (id) => {
			try {
				await activarImagenProducto(id);
				await get().fetchImagenesActivas();
			} catch (error) {
				console.error(`Error activating imagen con id ${id}:`, error);
			}
		},

		desactivateImagen: async (id) => {
			try {
				await desactivarImagenProducto(id);
				await get().fetchImagenesActivas();
			} catch (error) {
				console.error(`Error desactivating imagen con id ${id}:`, error);
			}
		},
	}),
);
