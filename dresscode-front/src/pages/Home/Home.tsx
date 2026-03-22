import { useEffect, useState } from "react";
import { CategoryBar } from "../../components/ui/CategoryBar/CategoryBar";
import ImageCarousel from "../../components/ui/ImageCarousel/ImageCarousel";
import OffersSection from "../../components/ui/OffersSection/OffersSection";
import ProductCarouselSection from "../../components/ui/ProductCarouselSection/ProductCarouselSection";
import { useCategoriaStore } from "../../store/categoriaStore";

import styles from "./Home.module.css";
import { useProductoStore } from "../../store/productoStore";
import Loader from "../../components/ui/Loader/Loader";
import { sileo } from "sileo";

const Home = () => {
	const { fetchCategoriasActivas } = useCategoriaStore();
	const { productosActivos, fetchProductosActivos } = useProductoStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		Promise.all([fetchCategoriasActivas(), fetchProductosActivos()])
			.then(() => setLoading(false))
			.catch(() => {
				setError("Error al cargar los datos");
				setLoading(false);
				sileo.error({
					title: "Error",
					description: "No se pudieron cargar los productos o categorías.",
					type: "error",
				});
			});
		// eslint-disable-next-line
	}, []);

	const zapatillas = productosActivos.filter(
		(producto) =>
			producto.categoria?.nombreCategoria?.toUpperCase() === "ZAPATILLAS" &&
			!(
				producto.descuentos &&
				producto.descuentos.some(
					(d) => d.activo && d.descuento && d.descuento.activo,
				)
			),
	);
	const remeras = productosActivos.filter(
		(producto) =>
			producto.categoria?.nombreCategoria?.toUpperCase() === "REMERAS" &&
			!(
				producto.descuentos &&
				producto.descuentos.some(
					(d) => d.activo && d.descuento && d.descuento.activo,
				)
			),
	);

	if (loading) {
		return <Loader />;
	}
	if (error) {
		return <div style={{ color: "red", padding: 32 }}>{error}</div>;
	}

	return (
		<>
			<CategoryBar />
			<ImageCarousel />
			<div className={styles.separador}></div>
			{<OffersSection />}
			{zapatillas.length === 0 && remeras.length === 0 ? (
				<div
					style={{
						color: "#fff",
						fontSize: 20,
						textAlign: "center",
						padding: 40,
					}}>
					No hay productos destacados para mostrar.
				</div>
			) : (
				<>
					<ProductCarouselSection title="ZAPATILLAS" products={zapatillas} />
					<ProductCarouselSection title="REMERAS" products={remeras} />
				</>
			)}
			<div className={styles.eslogan}>
				<h2>ESTILO EN CADA LINEA</h2>
			</div>
		</>
	);
};

export default Home;
