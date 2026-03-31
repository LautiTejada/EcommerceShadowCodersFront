import MenuAdmin from "../../../components/admin/MenuAdmin/MenuAdmin";
import { Helmet } from "react-helmet-async";

export const HomeAdmin = () => {
	return (
		<>
			<Helmet>
				<title>Panel de Administración | DressCode</title>
				<meta
					name="description"
					content="Panel de administración para gestionar productos, descuentos y categorías en DressCode."
				/>
				<meta
					property="og:title"
					content="Panel de Administración | DressCode"
				/>
				<meta
					property="og:description"
					content="Panel de administración para gestionar productos, descuentos y categorías en DressCode."
				/>
			</Helmet>
			<MenuAdmin />
		</>
	);
};
