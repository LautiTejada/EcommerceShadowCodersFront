import React, { Suspense, lazy } from "react";
import styles from "./AdminPanel.module.css";
import MenuAdmin from "../../../components/admin/MenuAdmin/MenuAdmin";
import Loader from "../../../components/ui/Loader/Loader";

// Lazy load components
const HomeAdmin = lazy(
	() => import("../../../pages/admin/HomeAdmin/HomeAdmin"),
);
const AgregarProducto = lazy(
	() => import("../../../pages/admin/AgregarProducto/AgregarProducto"),
);
const EditarProducto = lazy(() =>
	import("../../../pages/admin/Productos/EditarProductos/EditarProducto").then(
		(m) => ({ default: m.EditarProducto }),
	),
);
const StockProducto = lazy(() =>
	import("../../../pages/admin/Productos/StockProducto/StockProducto").then(
		(m) => ({ default: m.StockProducto }),
	),
);
const AgregarDescuento = lazy(() =>
	import("../../../pages/admin/Descuentos/AgregarDescuento/AgregarDescuento").then(
		(m) => ({ default: m.AgregarDescuento }),
	),
);
const ListaDescuentos = lazy(() =>
	import("../../../pages/admin/Descuentos/ListaDescuentos/ListaDescuentos").then(
		(m) => ({ default: m.ListaDescuentos }),
	),
);
const AgregarTiposCategorias = lazy(() =>
	import(
		"../../../pages/admin/TiposCategorias/AgregarTiposCategorias/AgregarTiposCategorias"
	).then((m) => ({ default: m.AgregarTiposCategorias })),
);
const ListaTiposCategorias = lazy(() =>
	import(
		"../../../pages/admin/TiposCategorias/ListaTiposCategorias/ListaTiposCategorias"
	).then((m) => ({ default: m.ListaTiposCategorias })),
);

interface AdminPanelProps {
	activeView: string;
	onViewChange: (viewId: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
	activeView,
	onViewChange,
}) => {
	const renderAdminView = () => {
		switch (activeView) {
			case "home":
				return (
					<Suspense fallback={<Loader />}>
						<HomeAdmin />
					</Suspense>
				);
			case "add-product":
				return (
					<Suspense fallback={<Loader />}>
						<AgregarProducto />
					</Suspense>
				);
			case "edit-product":
				return (
					<Suspense fallback={<Loader />}>
						<EditarProducto />
					</Suspense>
				);
			case "stock-product":
				return (
					<Suspense fallback={<Loader />}>
						<StockProducto />
					</Suspense>
				);
			case "add-discount":
				return (
					<Suspense fallback={<Loader />}>
						<AgregarDescuento />
					</Suspense>
				);
			case "list-discounts":
				return (
					<Suspense fallback={<Loader />}>
						<ListaDescuentos />
					</Suspense>
				);
			case "add-type-category":
				return (
					<Suspense fallback={<Loader />}>
						<AgregarTiposCategorias />
					</Suspense>
				);
			case "list-type-category":
				return (
					<Suspense fallback={<Loader />}>
						<ListaTiposCategorias />
					</Suspense>
				);
			default:
				return (
					<div className={styles.viewContent}>
						<h3>Dashboard</h3>
						<p>Admin panel ready</p>
					</div>
				);
		}
	};

	return (
		<div className={styles.adminPanelContainer}>
			<aside className={styles.adminMenu}>
				<MenuAdmin activeView={activeView} onViewChange={onViewChange} />
			</aside>
			<main className={styles.adminContent}>{renderAdminView()}</main>
		</div>
	);
};

export default AdminPanel;
