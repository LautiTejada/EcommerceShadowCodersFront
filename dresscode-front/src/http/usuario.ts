import type { Direccion } from "../types/Direccion";
import type { Usuario } from "../types/Usuario";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export const getUsuarios = async () => {
	return apiFetch(`${baseUrl}/usuarios`);
};

export const getUsuariosActivos = async () => {
	return apiFetch(`${baseUrl}/usuarios/active`);
};

export const getUsuarioPorId = async (id: number) => {
	return apiFetch(`${baseUrl}/usuarios/${id}`, { auth: true });
};

export const crearUsuario = async (usuario: Usuario) => {
	return apiFetch(`${baseUrl}/usuarios`, {
		method: "POST",
		body: JSON.stringify(usuario),
	});
};

export const updateUsuario = async (id: number, usuario: Usuario) => {
	return apiFetch(`${baseUrl}/usuarios/${id}`, {
		method: "PUT",
		body: JSON.stringify({
			username: usuario.username,
			email: usuario.email,
			password: usuario.password,
			activo: usuario.activo,
			rol: usuario.rol,
		}),
	});
};

export const cambiarStateUsuario = async (id: number) => {
	return apiFetch(`${baseUrl}/usuarios/${id}/status`, {
		method: "PUT",
	});
};

export const activateUsuario = async (id: number) => {
	return apiFetch(`${baseUrl}/usuarios/${id}/activate`, {
		method: "PUT",
	});
};

export const desactivateUsuario = async (id: number) => {
	return apiFetch(`${baseUrl}/usuarios/${id}/deactivate`, {
		method: "PUT",
	});
};

export const createDireccionDeUsuario = async (
	usuarioId: number,
	direccion: Direccion,
) => {
	return apiFetch(`${baseUrl}/usuarios/${usuarioId}/direcciones`, {
		method: "POST",
		body: JSON.stringify(direccion),
	});
};

export const updateDireccionDeUsuario = async (
	usuarioId: number,
	direccionId: number,
	direccion: Direccion,
) => {
	return apiFetch(
		`${baseUrl}/usuarios/${usuarioId}/direcciones/${direccionId}`,
		{
			method: "PUT",
			body: JSON.stringify(direccion),
		},
	);
};

export const getDireccionesDeUsuario = async (usuarioId: number) => {
	return apiFetch(`${baseUrl}/usuarios/${usuarioId}/direcciones`);
};

export const desactivarDireccionDeUsuario = async (
	usuarioId: number,
	direccionId: number,
) => {
	return apiFetch(
		`${baseUrl}/usuarios/${usuarioId}/direcciones/${direccionId}/desactivar`,
		{
			method: "PUT",
		},
	);
};
