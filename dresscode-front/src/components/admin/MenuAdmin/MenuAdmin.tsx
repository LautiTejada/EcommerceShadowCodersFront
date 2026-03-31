import React from "react";
import styles from "./MenuAdmin.module.css";
import { Link } from "react-router-dom";

interface MenuAdminProps {
	selected?: string;
	onSelect?: (item: string) => void;
}

const MenuAdmin: React.FC<MenuAdminProps> = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.menuSection}>
				<div className={styles.menuTitle}>PRODUCTOS</div>
				<Link to="/admin/add-product">
					<div className={`${styles.menuItem} styles.selected : ""}`}>
						AGREGAR UN PRODUCTO
					</div>
				</Link>
				<Link to="/admin/edit-product">
					<div className={`${styles.menuItem} $ styles.selected : ""}`}>
						MODIFICAR UN PRODUCTO
					</div>
				</Link>
				<Link to="/admin/stock-product">
					<div className={`${styles.menuItem} styles.selected : ""}`}>
						STOCK DE PRODUCTO
					</div>
				</Link>
			</div>
			<div className={styles.menuSection}>
				<div className={styles.menuTitle}>DESCUENTOS</div>
				<Link to="/admin/add-discount">
					<div className={`${styles.menuItem} styles.selected : ""}`}>
						AGREGAR UN DESCUENTO
					</div>
				</Link>
				<Link to="/admin/list-discounts">
					<div className={`${styles.menuItem} $ styles.selected : ""}`}>
						LISTA DE DESCUENTOS
					</div>
				</Link>
			</div>
			<div className={styles.menuSection}>
				<div className={styles.menuTitle}>TIPOS / CATEGORIAS</div>
				<Link to="/admin/add-type-cateogory">
					<div className={`${styles.menuItem} styles.selected : ""}`}>
						AGREGAR
					</div>
				</Link>
				<Link to="/admin/list-type-cateogory">
					<div className={`${styles.menuItem} $ styles.selected : ""}`}>
						TIPOS / CATEOGORIAS
					</div>
				</Link>
			</div>
			<div className={styles.menuSection}></div>
		</aside>
	);
};

export default MenuAdmin;
