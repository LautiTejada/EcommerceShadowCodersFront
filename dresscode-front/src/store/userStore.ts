import { create } from "zustand";

import * as usuarioAPI from "../http/usuario";
import type { Usuario } from "../types/Usuario";
import type { Direccion } from "../types/Direccion";

interface UsuarioState {
	usuarios: Usuario[];
	direccionesUsuario: Direccion[];
	usuarioActual: Usuario | null;
	cargando: boolean;
	error: string | null;

	obtenerUsuarios: () => Promise<void>;
	obtenerUsuariosActivos: () => Promise<void>;
	obtenerUsuarioPorId: (id: number) => Promise<void>;
	crearUsuario: (usuario: Usuario) => Promise<void>;
	actualizarUsuario: (id: number, datos: Usuario) => Promise<void>;
	cambiarEstadoUsuario: (id: number) => Promise<void>;
	crearDireccionUsuario: (
		usuarioId: number,
		direccion: Direccion,
	) => Promise<void>;
	obtenerDireccionesUsuario: (usuarioId: number) => Promise<void>;
	actualizarDireccionUsuario: (
		usuarioId: number,
		direccionId: number,
		direccion: Direccion,
	) => Promise<void>;
	desactivarDireccionUsuario: (
		usuarioId: number,
		direccionId: number,
	) => Promise<void>;
	inicializarUsuario: () => Promise<void>;
	setUsuarioActual: (categoria: Usuario | null) => void;
	setDireccionesUsuario: (direcciones: Direccion[]) => void;

	limpiarError: () => void;
}

// Hydrate synchronously at module load so PrivateRoute never sees null on first render
const _syncUsuario = (() => {
	const userId = localStorage.getItem("usuario");
	const token = localStorage.getItem("token");
	if (!userId || !token) return null;
	const username = localStorage.getItem("username") ?? "";
	const rolRaw = localStorage.getItem("rol") ?? "USER";
	// Normalizar el rol a mayúsculas
	const rol = rolRaw.toUpperCase();
	return { id: Number(userId), username, rol } as any;
})();

export const useUsuarioStore = create<UsuarioState>((set, get) => ({
	usuarios: [],
	direccionesUsuario: [],
	usuarioActual: _syncUsuario,
	cargando: false,
	error: null,

	obtenerUsuarios: async () => {
		set({ cargando: true, error: null });
		try {
			const data = await usuarioAPI.getUsuarios();
			set({ usuarios: data, cargando: false });
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, cargando: false });
			}
		}
	},

	obtenerUsuariosActivos: async () => {
		set({ cargando: true, error: null });
		try {
			const data = await usuarioAPI.getUsuariosActivos();
			set({ usuarios: data, cargando: false });
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, cargando: false });
			}
		}
	},

	obtenerUsuarioPorId: async (id: number) => {
		set({ cargando: true, error: null });
		try {
			const usuario = await usuarioAPI.getUsuarioPorId(id);
			// Guardar el rol en localStorage y normalizar a mayúsculas
			if (usuario.rol) {
				const rolNormalizado = usuario.rol.toUpperCase();
				localStorage.setItem("rol", rolNormalizado);
				// Actualizar el rol en el usuario para asegurar consistencia
				usuario.rol = rolNormalizado as any;
			}
			set({ usuarioActual: usuario, cargando: false });
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, cargando: false });
			}
		}
	},

	crearUsuario: async (usuario) => {
		set({ cargando: true, error: null });
		try {
			const nuevo = await usuarioAPI.crearUsuario(usuario);
			set((state) => ({
				usuarios: [...state.usuarios, nuevo],
				cargando: false,
			}));
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, cargando: false });
			}
		}
	},

	actualizarUsuario: async (id, datos) => {
		set({ cargando: true, error: null });
		try {
			const actualizado = await usuarioAPI.updateUsuario(id, datos);
			set((state) => ({
				usuarios: state.usuarios.map((u) => (u.id === id ? actualizado : u)),
				cargando: false,
			}));
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, cargando: false });
			}
		}
	},

	cambiarEstadoUsuario: async (id) => {
		set({ cargando: true, error: null });
		try {
			const actualizado = await usuarioAPI.cambiarStateUsuario(id);
			set((state) => ({
				usuarios: state.usuarios.map((u) => (u.id === id ? actualizado : u)),
				cargando: false,
			}));
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, cargando: false });
			}
		}
	},

	obtenerDireccionesUsuario: async (usuarioId) => {
		try {
			const raw = await usuarioAPI.getDireccionesDeUsuario(usuarioId);
			const lista = Array.isArray(raw)
				? raw
				: Array.isArray(raw?.content)
					? raw.content
					: Array.isArray(raw?.data)
						? raw.data
						: [];
			const validas = lista.filter(
				(d: any) =>
					typeof d === "object" && d !== null && "calle" in d && "numero" in d,
			);
			set((state) => ({
				direccionesUsuario: validas,
				usuarioActual: state.usuarioActual
					? { ...state.usuarioActual, direcciones: validas }
					: null,
			}));
		} catch {
			// 403/error: usar las direcciones que ya están en usuarioActual como fallback
			const actual = get().usuarioActual as any;
			const fallback = Array.isArray(actual?.direcciones)
				? actual.direcciones
				: [];
			set({ direccionesUsuario: fallback });
		}
	},

	crearDireccionUsuario: async (usuarioId, direccion) => {
		try {
			const nueva = await usuarioAPI.createDireccionDeUsuario(
				usuarioId,
				direccion,
			);
			const nuevaDir =
				nueva && typeof nueva === "object" && "calle" in nueva
					? nueva
					: { ...direccion, id: Date.now(), activo: true };
			set((state) => {
				const lista = [...state.direccionesUsuario, nuevaDir];
				return {
					direccionesUsuario: lista,
					usuarioActual: state.usuarioActual
						? { ...state.usuarioActual, direcciones: lista }
						: null,
				};
			});
		} catch (error) {}
	},

	actualizarDireccionUsuario: async (usuarioId, direccionId, direccion) => {
		try {
			const actualizada = await usuarioAPI.updateDireccionDeUsuario(
				usuarioId,
				direccionId,
				direccion,
			);
			set((state) => {
				const lista = state.direccionesUsuario.map((d: any) =>
					d.id === direccionId
						? actualizada && "calle" in actualizada
							? actualizada
							: { ...d, ...direccion }
						: d,
				);
				return {
					direccionesUsuario: lista,
					usuarioActual: state.usuarioActual
						? { ...state.usuarioActual, direcciones: lista }
						: null,
				};
			});
		} catch (error) {}
	},

	desactivarDireccionUsuario: async (usuarioId, direccionId) => {
		try {
			await usuarioAPI.desactivarDireccionDeUsuario(usuarioId, direccionId);
			set((state) => {
				const lista = state.direccionesUsuario.map((d: any) =>
					d.id === direccionId ? { ...d, activo: false } : d,
				);
				return {
					direccionesUsuario: lista,
					usuarioActual: state.usuarioActual
						? { ...state.usuarioActual, direcciones: lista }
						: null,
				};
			});
		} catch (error) {}
	},

	inicializarUsuario: async () => {
		const userId = localStorage.getItem("usuario");
		const token = localStorage.getItem("token");

		if (!userId || !token) {
			set({ usuarioActual: null, cargando: false });
			return;
		}

		// Hydrate instantly from localStorage so routes render without waiting for the API
		const username = localStorage.getItem("username") ?? "";
		const rol = localStorage.getItem("rol") ?? "USER";
		set({
			usuarioActual: { id: Number(userId), username, rol } as any,
			cargando: false,
		});

		// Silently refresh the full user object from the API in the background
		try {
			const usuario = await usuarioAPI.getUsuarioPorId(Number(userId));
			set({ usuarioActual: usuario });
		} catch {
			// Keep the cached version if the endpoint is unavailable or user lacks permission
		}
	},

	limpiarError: () => set({ error: null }),

	setUsuarioActual: (usuario) => set({ usuarioActual: usuario }),

	setDireccionesUsuario: (direcciones) =>
		set({ direccionesUsuario: direcciones }),
}));
