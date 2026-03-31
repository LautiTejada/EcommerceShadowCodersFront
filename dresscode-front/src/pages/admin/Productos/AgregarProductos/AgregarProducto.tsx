import styles from "./AgregarProducto.module.css";
import { Helmet } from "react-helmet-async";
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin";

export const AgregarProducto = () => {
	return (
		<div className={styles.container}>
			<Helmet>
				<title>Agregar Producto | Admin | DressCode</title>
			</Helmet>
			<MenuAdmin />
			<main className={styles.mainContent}>
				<h2>Agregar Producto</h2>
			</main>
		</div>
	);
};
