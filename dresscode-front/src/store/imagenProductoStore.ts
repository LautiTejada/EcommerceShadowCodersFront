import { create } from "zustand";
import type { ImagenProducto } from "../types/ImagenProducto";
import {
	cambiarEstadoImagenProducto,
	eliminarImagenProducto,
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
			}
		},

		fetchImagenesActivas: async () => {
			try {
				const imagenesActivasFromApi = await getImagenesProducto();
				set({ imagenesActivas: imagenesActivasFromApi });
			} catch (error) {
			}
		},

		fetchImagenById: async (id) => {
			try {
				return await getImagenesProducto();
			} catch (error) {
				return null;
			}
		},

		updateImagen: async (id) => {
			try {
				await get().fetchImagenes();
			} catch (error) {
			}
		},

		deleteImagen: async (id) => {
			try {
				await eliminarImagenProducto(id);
				await get().fetchImagenes();
			} catch (error) {
			}
		},

		toggleStateImagen: async (id) => {
			try {
				await cambiarEstadoImagenProducto(id);
				await get().fetchImagenes();
			} catch (error) {
			}
		},

		activateImagen: async (id) => {
			try {
				await cambiarEstadoImagenProducto(id);
				await get().fetchImagenesActivas();
			} catch (error) {
			}
		},

		desactivateImagen: async (id) => {
			try {
				await cambiarEstadoImagenProducto(id);
				await get().fetchImagenesActivas();
			} catch (error) {
			}
		},
	}),
);
