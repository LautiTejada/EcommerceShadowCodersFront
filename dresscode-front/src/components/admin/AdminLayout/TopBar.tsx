import { useLocation } from "react-router-dom";
import styles from "./TopBar.module.css";

export const TopBar = () => {
	const location = useLocation();

	const getTitleFromRoute = (path: string): string => {
		if (path.includes("/add-product")) return "Agregar Producto";
		if (path.includes("/edit-product")) return "Modificar Producto";
		if (path.includes("/stock-product")) return "Stock de Productos";
		if (path.includes("/add-discount")) return "Agregar Descuento";
		if (path.includes("/list-discounts")) return "Lista de Descuentos";
		if (path.includes("/add-type-category")) return "Agregar Tipo/Categoría";
		if (path.includes("/list-type-category")) return "Tipos y Categorías";
		return "Panel de Administración";
	};

	const title = getTitleFromRoute(location.pathname);
	const breadcrumb = `Admin / ${title}`;

	return (
		<div className={styles.topBar}>
			<div className={styles.left}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.breadcrumb}>{breadcrumb}</p>
			</div>
			<div className={styles.right}>
				{/* Future: notifications, settings, etc */}
			</div>
		</div>
	);
};

export default TopBar;
