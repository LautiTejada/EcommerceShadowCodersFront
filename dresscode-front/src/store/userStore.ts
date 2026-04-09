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

	limpiarError: () => void;
}

// Hydrate synchronously at module load so PrivateRoute never sees null on first render
const _syncUsuario = (() => {
	const userId = localStorage.getItem("usuario");
	const token = localStorage.getItem("token");
	if (!userId || !token) return null;
	const username = localStorage.getItem("username") ?? "";
	const rol = localStorage.getItem("rol") ?? "USER";
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
			// Guardar el rol en localStorage
			if (usuario.rol) {
				localStorage.setItem("rol", usuario.rol);
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
			const direcciones = await usuarioAPI.getDireccionesDeUsuario(usuarioId);

			const direccionesValidas = Array.isArray(direcciones)
				? direcciones.filter(
						(d) =>
							typeof d === "object" &&
							d !== null &&
							"calle" in d &&
							"numero" in d,
					)
				: [];
			set({ direccionesUsuario: direccionesValidas });
		} catch (error) {}
	},

	crearDireccionUsuario: async (usuarioId, direccion) => {
		try {
			await usuarioAPI.createDireccionDeUsuario(usuarioId, direccion);
			await get().obtenerDireccionesUsuario(usuarioId);
		} catch (error) {}
	},

	actualizarDireccionUsuario: async (usuarioId, direccionId, direccion) => {
		try {
			await usuarioAPI.updateDireccionDeUsuario(
				usuarioId,
				direccionId,
				direccion,
			);
			await get().obtenerDireccionesUsuario(usuarioId);
		} catch (error) {}
	},

	desactivarDireccionUsuario: async (usuarioId, direccionId) => {
		try {
			await usuarioAPI.desactivarDireccionDeUsuario(usuarioId, direccionId);
			await get().obtenerDireccionesUsuario(usuarioId);
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
			// Keep the cached version; token may have expired — clear on 401 if needed
		}
	},

	limpiarError: () => set({ error: null }),

	setUsuarioActual: (usuario) => set({ usuarioActual: usuario }),
}));
