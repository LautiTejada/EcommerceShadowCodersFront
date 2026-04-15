import type { EstadoOrden } from "../types/enums/EstadoOrden";
import type { OrdenDeCompra } from "../types/OrdenDeCompra";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export const getOrdenesDeCompra = async () => {
	try {
		return await apiFetch(`${baseUrl}/ordenes`, { auth: true });
	} catch (error) {
		throw error;
	}
};

export const getOrdenDeCompra = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/ordenes/${id}`, { auth: true });
	} catch (error) {
		throw error;
	}
};

export const getOrdenesPorUsuario = async (usuarioId: number) => {
	try {
		return await apiFetch(`${baseUrl}/ordenes/usuario/${usuarioId}`, {
			auth: true,
		});
	} catch (error) {
		throw error;
	}
};

export const actualizarEstadoOrdenDeCompra = async (
	ordenId: number,
	estado: EstadoOrden,
) => {
	try {
		return await apiFetch(
			`${baseUrl}/ordenes/${ordenId}/estado?estado=${estado}`,
			{ method: "PATCH", auth: true },
		);
	} catch (error) {
		throw error;
	}
};

export const crearOrdenDeCompra = async (ordenDeCompra: OrdenDeCompra) => {
	try {
		return await apiFetch(`${baseUrl}/ordenes/crear`, {
			method: "POST",
			auth: true,
			body: JSON.stringify(ordenDeCompra),
		});
	} catch (error) {
		throw error;
	}
};
