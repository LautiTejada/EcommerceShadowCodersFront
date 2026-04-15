import { create } from "zustand";
import type { Banner, CreateBannerRequest } from "../types/Banner";
import {
	uploadBannerImagen,
	obtenerBanners,
	obtenerBannerPorId,
	crearBanner,
	actualizarBanner,
	eliminarBanner,
	toggleBanner,
} from "../http/banner";

interface BannerStore {
	// State
	banners: Banner[];
	bannerActual: Banner | null;
	cargando: boolean;
	error: string | null;
	uploadingImage: boolean;

	// Actions
	uploadImagen: (file: File) => Promise<string>; // Returns filename
	fetchBanners: () => Promise<void>;
	fetchBannerPorId: (id: number) => Promise<void>;
	createBanner: (data: CreateBannerRequest) => Promise<void>;
	updateBanner: (
		id: number,
		data: Partial<CreateBannerRequest>,
	) => Promise<void>;
	deleteBanner: (id: number) => Promise<void>;
	toggleBannerActivo: (id: number) => Promise<void>;
	limpiar: () => void;
}

export const useBannerStore = create<BannerStore>((set) => ({
	banners: [],
	bannerActual: null,
	cargando: false,
	error: null,
	uploadingImage: false,

	uploadImagen: async (file: File) => {
		try {
			set({ uploadingImage: true, error: null });
			const result = await uploadBannerImagen(file);
			set({ uploadingImage: false });
			return result.filename;
		} catch (error: any) {
			set({ error: error.message, uploadingImage: false });
			throw error;
		}
	},

	fetchBanners: async () => {
		try {
			set({ cargando: true, error: null });
			const banners = await obtenerBanners();
			set({ banners, cargando: false });
		} catch (error: any) {
			set({ error: error.message, cargando: false });
		}
	},

	fetchBannerPorId: async (id: number) => {
		try {
			set({ cargando: true, error: null });
			const banner = await obtenerBannerPorId(id);
			set({ bannerActual: banner, cargando: false });
		} catch (error: any) {
			set({ error: error.message, bannerActual: null, cargando: false });
		}
	},

	createBanner: async (data: CreateBannerRequest) => {
		try {
			set({ cargando: true, error: null });
			const nuevosBanner = await crearBanner(data);
			set((state) => ({
				banners: [...state.banners, nuevosBanner],
				cargando: false,
			}));
		} catch (error: any) {
			set({ error: error.message, cargando: false });
			throw error;
		}
	},

	updateBanner: async (id: number, data: Partial<CreateBannerRequest>) => {
		try {
			set({ cargando: true, error: null });
			const bannerActualizado = await actualizarBanner(id, data);
			set((state) => ({
				banners: state.banners.map((b) =>
					b.id === id ? bannerActualizado : b,
				),
				bannerActual:
					state.bannerActual?.id === id
						? bannerActualizado
						: state.bannerActual,
				cargando: false,
			}));
		} catch (error: any) {
			set({ error: error.message, cargando: false });
			throw error;
		}
	},

	deleteBanner: async (id: number) => {
		try {
			set({ cargando: true, error: null });
			await eliminarBanner(id);
			set((state) => ({
				banners: state.banners.filter((b) => b.id !== id),
				bannerActual: state.bannerActual?.id === id ? null : state.bannerActual,
				cargando: false,
			}));
		} catch (error: any) {
			set({ error: error.message, cargando: false });
			throw error;
		}
	},

	toggleBannerActivo: async (id: number) => {
		try {
			set({ cargando: true, error: null });
			const bannerActualizado = await toggleBanner(id);
			set((state) => ({
				banners: state.banners.map((b) =>
					b.id === id ? bannerActualizado : b,
				),
				bannerActual:
					state.bannerActual?.id === id
						? bannerActualizado
						: state.bannerActual,
				cargando: false,
			}));
		} catch (error: any) {
			set({ error: error.message, cargando: false });
			throw error;
		}
	},

	limpiar: () => {
		set({ banners: [], bannerActual: null, error: null });
	},
}));
