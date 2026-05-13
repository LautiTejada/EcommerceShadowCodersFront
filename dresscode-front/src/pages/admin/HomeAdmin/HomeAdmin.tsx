import React, { useEffect, useState } from "react";
import styles from "./HomeAdmin.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";

import { useProductoStore } from "../../../store/productoStore";
import { useOrdenCompraStore } from "../../../store/ordenCompraStore";
import Loader from "../../../components/ui/Loader/Loader";
import {
	obtenerEstadisticasDashboard,
	obtenerVentasPorMes,
	obtenerTopProductos,
	type DashboardStats,
	type VentaMes,
	type TopProducto,
} from "../../../http/estadisticas";

const HomeAdmin: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [lastProducts, setLastProducts] = useState<any[]>([]);
	const [lastOrders, setLastOrders] = useState<any[]>([]);
	const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
	const [ventasMes, setVentasMes] = useState<VentaMes[]>([]);
	const [topProductos, setTopProductos] = useState<TopProducto[]>([]);

	const { productos, fetchProductos } = useProductoStore();
	const { ordenesCompra, fetchOrdenesDeCompra } = useOrdenCompraStore();

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				setError(null);

				const [estadisticas, ventas, top] = await Promise.all([
					obtenerEstadisticasDashboard(),
					obtenerVentasPorMes(6).catch(() => [] as VentaMes[]),
					obtenerTopProductos(5).catch(() => [] as TopProducto[]),
					fetchProductos(),
					fetchOrdenesDeCompra(),
				]);
				setDashboardData(estadisticas);
				setVentasMes(ventas);
				setTopProductos(top);
			} catch (err) {
				setError("No se pudieron cargar las estadísticas");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [fetchProductos, fetchOrdenesDeCompra]);

	useEffect(() => {
		if (Array.isArray(productos)) {
			setLastProducts(productos.slice(-5).reverse());
		}
		if (Array.isArray(ordenesCompra)) {
			setLastOrders(ordenesCompra.slice(-5).reverse());
		}
	}, [productos, ordenesCompra]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.homeAdmin}>
			{/* Header */}
			<div className={styles.header}>
				<h1>Dashboard</h1>
				<p>Bienvenido al panel de administración</p>
			</div>

			{error && <p className={styles.errorMsg}>{error}</p>}

			{/* Stats Cards */}
			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.cardIcon}>
						<ProductionQuantityLimitsIcon />
					</div>
					<div className={styles.cardContent}>
						<p className={styles.cardTitle}>Productos</p>
						<p className={styles.cardValue}>
							{dashboardData?.totalProductos ?? 0}
						</p>
						<p className={styles.cardSub}>
							{dashboardData?.totalProductosActivos ?? 0} activos
						</p>
					</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.cardIcon}>
						<ShoppingCartIcon />
					</div>
					<div className={styles.cardContent}>
						<p className={styles.cardTitle}>Órdenes</p>
						<p className={styles.cardValue}>
							{dashboardData?.totalOrdenes ?? 0}
						</p>
						<p className={styles.cardSub}>
							{dashboardData?.totalOrdenesCompletadas ?? 0} completadas
						</p>
					</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.cardIcon}>
						<PeopleIcon />
					</div>
					<div className={styles.cardContent}>
						<p className={styles.cardTitle}>Usuarios</p>
						<p className={styles.cardValue}>
							{dashboardData?.totalUsuarios ?? 0}
						</p>
						<p className={styles.cardSub}>registrados</p>
					</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.cardIcon}>
						<TrendingUpIcon />
					</div>
					<div className={styles.cardContent}>
						<p className={styles.cardTitle}>Ingresos Totales</p>
						<p className={styles.cardValue}>
							${(dashboardData?.ingresosTotales ?? 0).toLocaleString("es-AR")}
						</p>
						<p className={styles.cardSub}>
							${(dashboardData?.ingresosUltimoMes ?? 0).toLocaleString("es-AR")}{" "}
							este mes
						</p>
					</div>
				</div>
			</div>

			{/* Content Grid */}
			<div className={styles.contentGrid}>
				{/* Últimos Productos */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Últimos Productos</h2>
					<div className={styles.listContainer}>
						{lastProducts.length === 0 ? (
							<p className={styles.emptyMessage}>No hay productos</p>
						) : (
							<div className={styles.productList}>
								{lastProducts.map((product: any, idx: number) => (
									<div key={product.id ?? idx} className={styles.productItem}>
										<div className={styles.productInfo}>
											<p className={styles.productName}>{product.nombre}</p>
											<p className={styles.productDetail}>
												${product.precio?.toLocaleString("es-AR")}
											</p>
										</div>
										<span
											className={`${styles.productBadge} ${product.activo === false ? styles.badgeInactivo : ""}`}>
											{product.activo === false ? "Inactivo" : "Activo"}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Últimas Órdenes */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Últimas Órdenes</h2>
					<div className={styles.listContainer}>
						{lastOrders.length === 0 ? (
							<p className={styles.emptyMessage}>No hay órdenes</p>
						) : (
							<div className={styles.orderList}>
								{lastOrders.map((order: any, idx: number) => (
									<div key={order.id ?? idx} className={styles.orderItem}>
										<div className={styles.orderInfo}>
											<p className={styles.orderNumber}>Orden #{order.id}</p>
											<p className={styles.orderDate}>
												{new Date(order.fecha).toLocaleDateString("es-AR")}
											</p>
										</div>
										<p className={styles.orderTotal}>
											${order.precioTotal?.toLocaleString("es-AR") || 0}
										</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Reportes */}
			<div className={styles.contentGrid} style={{ marginTop: 24 }}>
				{/* Ventas por mes */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ventas últimos 6 meses</h2>
					{ventasMes.length === 0 ? (
						<p className={styles.emptyMessage}>Sin datos de ventas aún</p>
					) : (() => {
						const maxTotal = Math.max(...ventasMes.map((v) => v.total), 1);
						return (
							<div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
								{ventasMes.map((v) => (
									<div key={v.mes} style={{ display: "flex", alignItems: "center", gap: 10 }}>
										<span style={{ minWidth: 60, fontSize: "0.78rem", color: "#555", textAlign: "right" }}>{v.mes}</span>
										<div style={{ flex: 1, background: "#f0eef6", borderRadius: 4, height: 22, overflow: "hidden" }}>
											<div style={{
												width: `${(v.total / maxTotal) * 100}%`,
												background: "#810000",
												height: "100%",
												borderRadius: 4,
												minWidth: 4,
												transition: "width 0.4s",
											}} />
										</div>
										<span style={{ minWidth: 90, fontSize: "0.78rem", color: "#1a1a1a", fontWeight: 600 }}>
											${v.total.toLocaleString("es-AR")}
										</span>
									</div>
								))}
							</div>
						);
					})()}
				</div>

				{/* Top productos */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Top 5 productos vendidos</h2>
					{topProductos.length === 0 ? (
						<p className={styles.emptyMessage}>Sin datos de ventas aún</p>
					) : (
						<div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
							{topProductos.map((p, idx) => (
								<div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
									<span style={{ minWidth: 20, fontSize: "0.8rem", fontWeight: 700, color: "#810000" }}>
										{idx + 1}
									</span>
									<div style={{ flex: 1 }}>
										<p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#1a1a1a" }}>{p.nombre}</p>
										<p style={{ margin: 0, fontSize: "0.75rem", color: "#888" }}>
											{p.unidades} unidades · ${p.ingresos.toLocaleString("es-AR")}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeAdmin;
