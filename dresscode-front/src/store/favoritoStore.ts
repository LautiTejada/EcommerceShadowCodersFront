import { create } from "zustand";
import type { Favorito } from "../types/Favorito";
import {
	obtenerMisFavoritos,
	agregarAFavoritos,
	eliminarDeFavoritos,
} from "../http/favorito";

interface FavoritoStore {
	// State
	favoritos: Favorito[];
	favoritoProductoIds: Set<number>; // Para verificación rápida
	cargando: boolean;

	// Actions
	fetchMisFavoritos: () => Promise<void>;
	agregarFavorito: (productoId: number) => Promise<void>;
	eliminarFavorito: (productoId: number) => Promise<void>;
	esFavorito: (productoId: number) => boolean;
	limpiarFavoritos: () => void;
}

export const useFavoritoStore = create<FavoritoStore>((set, get) => ({
	favoritos: [],
	favoritoProductoIds: new Set(),
	cargando: false,

	fetchMisFavoritos: async () => {
		try {
			set({ cargando: true });
			const favoritos = await obtenerMisFavoritos();
			const ids = new Set(
				favoritos
					.map((f) => f.producto.id)
					.filter((id): id is number => id !== undefined),
			);
			set({
				favoritos,
				favoritoProductoIds: ids,
			});
		} catch (error) {
			set({ favoritos: [], favoritoProductoIds: new Set() });
		} finally {
			set({ cargando: false });
		}
	},

	agregarFavorito: async (productoId: number) => {
		try {
			const nuevoFavorito = await agregarAFavoritos(productoId);
			set((state) => {
				const newIds = new Set(state.favoritoProductoIds);
				newIds.add(productoId);
				return {
					favoritos: [...state.favoritos, nuevoFavorito],
					favoritoProductoIds: newIds,
				};
			});
		} catch (error: any) {
			// Si el error es por duplicate key (ya existe en favoritos), sincronizar desde backend
			if (
				error?.message?.includes("duplicate") ||
				error?.message?.includes("already exists")
			) {
				// Sincronizar favoritos desde el backend
				try {
					const favoritos = await obtenerMisFavoritos();
					const ids = new Set(
						favoritos
							.map((f) => f.producto.id)
							.filter((id): id is number => id !== undefined),
					);
					set({
						favoritos,
						favoritoProductoIds: ids,
					});
				} catch (syncError) {
				}
			} else {
				throw error;
			}
		}
	},

	eliminarFavorito: async (productoId: number) => {
		// Optimistic update: eliminar inmediatamente del UI
		const previousFavoritos = get().favoritos;
		set((state) => {
			const newIds = new Set(state.favoritoProductoIds);
			newIds.delete(productoId);
			return {
				favoritos: state.favoritos.filter((f) => f.producto.id !== productoId),
				favoritoProductoIds: newIds,
			};
		});

		// Luego sincronizar con el backend
		try {
			await eliminarDeFavoritos(productoId);
		} catch (error) {
			// Si falla, restaurar el estado anterior
			set({
				favoritos: previousFavoritos,
				favoritoProductoIds: new Set(
					previousFavoritos
						.map((f) => f.producto.id)
						.filter((id): id is number => id !== undefined),
				),
			});
			throw error;
		}
	},

	esFavorito: (productoId: number) => {
		return get().favoritoProductoIds.has(productoId);
	},

	limpiarFavoritos: () => {
		set({
			favoritos: [],
			favoritoProductoIds: new Set(),
		});
	},
}));
