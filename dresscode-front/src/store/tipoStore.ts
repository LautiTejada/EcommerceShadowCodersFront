import { create } from "zustand";
import type { Tipo } from "../types/Tipo";
import {
	createTipo,
	getCategoriasByTipo,
	getTipoById,
	getTiposActivos,
	updateTipoStatus,
	updateTipo,
} from "../http/tipo";

interface TipoState {
	tipos: Tipo[];
	tipoActual: Tipo | null;
	cargando: boolean;
	error: string | null;

	obtenerTiposActivos: () => Promise<void>;
	obtenerTipoPorId: (id: number) => Promise<Tipo | null>;
	crearTipo: (nuevoTipo: Tipo) => Promise<void>;
	actualizarTipo: (id: number, tipo: Tipo) => Promise<void>;
	setTipoActual: (tipo: Tipo | null) => void;
	activarTipo: (id: number) => Promise<void>;
	desactivarTipo: (id: number) => Promise<void>;
}

export const tipoStore = create<TipoState>((set, get) => ({
	tipos: [],
	tipoActual: null,
	cargando: false,
	error: null,

	obtenerTiposActivos: async () => {
		set({ cargando: true, error: null });
		try {
			const tipos = await getTiposActivos();
			set({ tipos });
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al obtener tipos activos" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	obtenerTipoPorId: async (id) => {
		set({ cargando: true, error: null });
		try {
			const tipo = await getTipoById(id);
			set({ tipoActual: tipo });
			return tipo;
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al obtener tipo por ID" });
			}
			return null;
		} finally {
			set({ cargando: false });
		}
	},

	crearTipo: async (nuevoTipo: Tipo) => {
		set({ cargando: true, error: null });
		try {
			await createTipo(nuevoTipo);
			await get().obtenerTiposActivos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al crear tipo" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	actualizarTipo: async (id: number, tipo: Tipo) => {
		set({ cargando: true, error: null });
		try {
			await updateTipo(id, tipo);
			await get().obtenerTiposActivos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al actualizar tipo" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	cambiarEstadoTipo: async (id: number) => {
		set({ cargando: true, error: null });
		try {
			await updateTipoStatus(id);
			await get().obtenerTiposActivos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al cambiar estado" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	activarTipo: async (id) => {
		set({ cargando: true, error: null });
		try {
			await updateTipoStatus(id);
			await get().obtenerTiposActivos();
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al activar tipo" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	desactivarTipo: async (id) => {
		set({ cargando: true, error: null });
		try {
			await updateTipoStatus(id);
			await get().obtenerTiposActivos();
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al desactivar tipo" });
			}
		} finally {
			set({ cargando: false });
		}
	},

	traerCategoriasPorTipo: async (tipoId: number) => {
		set({ cargando: true, error: null });
		try {
			const categorias = await getCategoriasByTipo(tipoId);
			return categorias;
		} catch (error: unknown) {
			if (error instanceof Error) {
				set({ error: error.message || "Error al obtener categorías por tipo" });
			}
			return [];
		} finally {
			set({ cargando: false });
		}
	},

	setTipoActual: (tipo) => set({ tipoActual: tipo }),
}));
