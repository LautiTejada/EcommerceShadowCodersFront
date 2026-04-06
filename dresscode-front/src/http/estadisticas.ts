import { apiFetch } from "./apiFetch";

export interface DashboardStats {
	totalProductos: number;
	totalProductosActivos: number;
	totalOrdenes: number;
	totalOrdenesCompletadas: number;
	totalUsuarios: number;
	ingresosTotales: number;
	ingresosUltimoMes: number;
}

/**
 * Obtener estadísticas del dashboard
 * @requires Authorization header con token
 */
export const obtenerEstadisticasDashboard =
	async (): Promise<DashboardStats> => {
		const response = await apiFetch("estadisticas/dashboard", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Error obteniendo estadísticas");
		}

		return response.json();
	};

/**
 * Descargar estadísticas en formato CSV
 * @requires Authorization header con token
 */
export const descargarEstadisticasCSV = async (): Promise<Blob> => {
	const token = localStorage.getItem("accessToken");
	const response = await fetch(
		`${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/estadisticas/dashboard/csv`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("Error descargando CSV");
	}

	return response.blob();
};

/**
 * Obtener historial de auditoría
 * @requires Authorization header con token
 */
export const obtenerAuditoria = async () => {
	const response = await apiFetch("estadisticas/auditoria", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Error obteniendo auditoría");
	}

	return response.json();
};
