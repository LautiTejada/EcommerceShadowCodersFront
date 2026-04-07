import React, { useEffect, useState } from "react";
import styles from "./HomeAdmin.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useProductoStore } from "../../../store/productoStore";
import { useOrdenCompraStore } from "../../../store/ordenCompraStore";
import Loader from "../../../components/ui/Loader/Loader";
import {
	obtenerEstadisticasDashboard,
	type DashboardStats,
} from "../../../http/estadisticas";

const HomeAdmin: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [lastProducts, setLastProducts] = useState<any[]>([]);
	const [lastOrders, setLastOrders] = useState<any[]>([]);
	const [dashboardData, setDashboardData] = useState<DashboardStats | null>(
		null,
	);

	const { productos, fetchProductos } = useProductoStore();
	const { ordenesCompra, fetchOrdenesDeCompra } = useOrdenCompraStore();

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				setError(null);

				const [estadisticas] = await Promise.all([
					obtenerEstadisticasDashboard(),
					fetchProductos(),
					fetchOrdenesDeCompra(),
				]);
				setDashboardData(estadisticas);
			} catch (err) {
				console.error("Error cargando datos del dashboard:", err);
				setError("No se pudieron cargar las estadÃ­sticas");
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
				<p>Bienvenido al panel de administraciÃ³n</p>
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
						<p className={styles.cardTitle}>Ã“rdenes</p>
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
				{/* Ãšltimos Productos */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ãšltimos Productos</h2>
					<div className={styles.listContainer}>
						{lastProducts.length === 0 ? (
							<p className={styles.emptyMessage}>No hay productos</p>
						) : (
							<div className={styles.productList}>
								{lastProducts.map((product: any) => (
									<div key={product.id} className={styles.productItem}>
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

				{/* Ãšltimas Ã“rdenes */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ãšltimas Ã“rdenes</h2>
					<div className={styles.listContainer}>
						{lastOrders.length === 0 ? (
							<p className={styles.emptyMessage}>No hay Ã³rdenes</p>
						) : (
							<div className={styles.orderList}>
								{lastOrders.map((order: any) => (
									<div key={order.id} className={styles.orderItem}>
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
		</div>
	);
};

export default HomeAdmin;
