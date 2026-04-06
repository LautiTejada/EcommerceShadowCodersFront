import React, { useEffect, useState } from "react";
import styles from "./HomeAdmin.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useProductoStore } from "../../../store/productoStore";
import { useOrdenCompraStore } from "../../../store/ordenCompraStore";
import Loader from "../../../components/ui/Loader/Loader";

interface StatCard {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	color: string;
}

const HomeAdmin: React.FC = () => {
	const [stats, setStats] = useState<StatCard[]>([]);
	const [loading, setLoading] = useState(true);
	const [lastProducts, setLastProducts] = useState<any[]>([]);
	const [lastOrders, setLastOrders] = useState<any[]>([]);

	const { productos, obtenerProductos } = useProductoStore();
	const { ordenesCompra, obtenerOrdenes } = useOrdenCompraStore();

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);

				// Cargar datos necesarios
				await Promise.all([obtenerProductos(), obtenerOrdenes()]);

				setLoading(false);
			} catch (error) {
				console.error("Error cargando datos del dashboard:", error);
				setLoading(false);
			}
		};

		loadData();
	}, [obtenerProductos, obtenerOrdenes]);

	// Calcular estadísticas cuando cambian los datos
	useEffect(() => {
		const totalProductos = productos?.length || 0;
		const totalOrdenes = ordenesCompra?.length || 0;
		const ingresoTotal =
			ordenesCompra?.reduce(
				(sum: number, orden: any) => sum + (orden.total || 0),
				0,
			) || 0;

		// Últimos productos (últimos 5)
		const last5Products = Array.isArray(productos)
			? productos.slice(-5).reverse()
			: [];
		setLastProducts(last5Products);

		// Últimas órdenes (últimas 5)
		const last5Orders = Array.isArray(ordenesCompra)
			? ordenesCompra.slice(-5).reverse()
			: [];
		setLastOrders(last5Orders);

		// Set stats
		setStats([
			{
				title: "Total Productos",
				value: totalProductos,
				icon: <ProductionQuantityLimitsIcon />,
				color: "#810000",
			},
			{
				title: "Total Órdenes",
				value: totalOrdenes,
				icon: <ShoppingCartIcon />,
				color: "#810000",
			},
			{
				title: "Ingresos Totales",
				value: `$${ingresoTotal.toLocaleString("es-AR")}`,
				icon: <TrendingUpIcon />,
				color: "#810000",
			},
		]);
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

			{/* Stats Cards */}
			<div className={styles.statsGrid}>
				{stats.map((stat, idx) => (
					<div key={idx} className={styles.statCard}>
						<div className={styles.cardIcon} style={{ color: stat.color }}>
							{stat.icon}
						</div>
						<div className={styles.cardContent}>
							<p className={styles.cardTitle}>{stat.title}</p>
							<p className={styles.cardValue}>{stat.value}</p>
						</div>
					</div>
				))}
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
								{lastProducts.map((product: any) => (
									<div key={product.id} className={styles.productItem}>
										<div className={styles.productInfo}>
											<p className={styles.productName}>{product.nombre}</p>
											<p className={styles.productDetail}>
												Precio: ${product.precioUnitario}
											</p>
										</div>
										<span className={styles.productBadge}>
											{product.stock || 0} en stock
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
								{lastOrders.map((order: any) => (
									<div key={order.id} className={styles.orderItem}>
										<div className={styles.orderInfo}>
											<p className={styles.orderNumber}>Orden #{order.id}</p>
											<p className={styles.orderDate}>
												{new Date(order.fechaOrden).toLocaleDateString("es-AR")}
											</p>
										</div>
										<p className={styles.orderTotal}>
											${order.total?.toLocaleString("es-AR") || 0}
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
