import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
			<Helmet>
				<title>DressCode | Moda Urbana y Deportiva</title>
				<meta
					name="description"
					content="Descubrí las últimas tendencias en zapatillas y remeras. Ofertas exclusivas en moda urbana y deportiva. ¡Estilo en cada línea!"
				/>
				<meta
					property="og:title"
					content="DressCode | Moda Urbana y Deportiva"
				/>
				<meta
					property="og:description"
					content="Descubrí las últimas tendencias en zapatillas y remeras. Ofertas exclusivas en moda urbana y deportiva."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://tusitio.com/" />
				<meta
					property="og:image"
					content="/public/assets/ImagesCarousel/og-default.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="DressCode | Moda Urbana y Deportiva"
				/>
				<meta
					name="twitter:description"
					content="Descubrí las últimas tendencias en zapatillas y remeras. Ofertas exclusivas en moda urbana y deportiva."
				/>
				<meta
					name="twitter:image"
					content="/public/assets/ImagesCarousel/og-default.jpg"
				/>
			</Helmet>
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
