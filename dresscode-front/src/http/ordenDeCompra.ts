import type { EstadoOrden } from "../types/enums/EstadoOrden";
import type { OrdenDeCompra } from "../types/OrdenDeCompra";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

export const getOrdenesDeCompra = async () => {
	try {
		return await apiFetch(`${baseUrl}/ordenes`, { auth: true });
	} catch (error) {
		console.error("Error fetching ordenes de compra:", error);
		throw error;
	}
};

export const getOrdenDeCompra = async (id: number) => {
	try {
		return await apiFetch(`${baseUrl}/ordenes/${id}`, { auth: true });
	} catch (error) {
		console.error("Error fetching orden de compra:", error);
		throw error;
	}
};

export const getOrdenesPorUsuario = async (usuarioId: number) => {
	try {
		return await apiFetch(`${baseUrl}/ordenes/usuario/${usuarioId}`, {
			auth: true,
		});
	} catch (error) {
		console.error("Error fetching orden de compra por usuario:", error);
		throw error;
	}
};

export const actualizarEstadoOrdenDeCompra = async (
	ordenId: number,
	estado: EstadoOrden,
) => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch(
			`${baseUrl}/ordenes/${ordenId}/estado?estado=${estado}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error updating estado orden:", error);
		throw error;
	}
};

export const crearOrdenDeCompra = async (ordenDeCompra: OrdenDeCompra) => {
	try {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("Token de autenticación no encontrado");
		}

		const response = await fetch(`${baseUrl}/ordenes/crear`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(ordenDeCompra),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error creating orden de compra:", error);
		throw error;
	}
};
