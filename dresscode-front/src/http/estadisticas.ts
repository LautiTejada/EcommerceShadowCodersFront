import { apiFetch } from "./apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

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
 * @requires token en localStorage
 */
export const obtenerEstadisticasDashboard =
	async (): Promise<DashboardStats> => {
		return await apiFetch(`${baseUrl}/estadisticas/dashboard`, {
			method: "GET",
			auth: true,
		});
	};

/**
 * Descargar estadísticas en formato CSV
 * @requires token en localStorage
 */
export const descargarEstadisticasCSV = async (): Promise<Blob> => {
	const token = localStorage.getItem("token");
	const response = await fetch(`${baseUrl}/estadisticas/dashboard/csv`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Error descargando CSV");
	}

	return response.blob();
};

export interface VentaMes {
	mes: string;
	total: number;
}

export interface TopProducto {
	id: number;
	nombre: string;
	unidades: number;
	ingresos: number;
}

export const obtenerVentasPorMes = async (meses = 6): Promise<VentaMes[]> => {
	return await apiFetch(`${baseUrl}/estadisticas/ventas-por-mes?meses=${meses}`, {
		method: "GET",
		auth: true,
	});
};

export const obtenerTopProductos = async (limit = 5): Promise<TopProducto[]> => {
	return await apiFetch(`${baseUrl}/estadisticas/top-productos?limit=${limit}`, {
		method: "GET",
		auth: true,
	});
};

/**
 * Obtener historial de auditoría
 * @requires token en localStorage
 */
export const obtenerAuditoria = async () => {
	return await apiFetch(`${baseUrl}/estadisticas/auditoria`, {
		method: "GET",
		auth: true,
	});
};
