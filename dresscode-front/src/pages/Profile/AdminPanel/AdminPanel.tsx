import React from "react";
import styles from "./AdminPanel.module.css";
import MenuAdmin from "../../../components/admin/MenuAdmin/MenuAdmin";

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
					<div className={styles.viewContent}>
						<h3>Dashboard - Admin Home</h3>
						<p>
							Welcome to the admin panel. Select an option from the menu to get
							started.
						</p>
					</div>
				);
			case "add-product":
				return (
					<div className={styles.viewContent}>
						<h3>Agregar Producto</h3>
						<p>Add new product content goes here</p>
					</div>
				);
			case "edit-product":
				return (
					<div className={styles.viewContent}>
						<h3>Editar Producto</h3>
						<p>Edit product content goes here</p>
					</div>
				);
			case "stock-product":
				return (
					<div className={styles.viewContent}>
						<h3>Stock de Productos</h3>
						<p>Stock management content goes here</p>
					</div>
				);
			case "add-discount":
				return (
					<div className={styles.viewContent}>
						<h3>Agregar Descuento</h3>
						<p>Add discount content goes here</p>
					</div>
				);
			case "list-discounts":
				return (
					<div className={styles.viewContent}>
						<h3>Lista de Descuentos</h3>
						<p>List discounts content goes here</p>
					</div>
				);
			case "add-type-category":
				return (
					<div className={styles.viewContent}>
						<h3>Agregar Tipo/Categoría</h3>
						<p>Add type/category content goes here</p>
					</div>
				);
			case "list-type-category":
				return (
					<div className={styles.viewContent}>
						<h3>Lista de Tipos/Categorías</h3>
						<p>List types/categories content goes here</p>
					</div>
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
