import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BannerCarousel } from "../../components/ui/BannerCarousel/BannerCarousel";
import React, { Suspense } from "react";
const OffersSection = React.lazy(
	() => import("../../components/ui/OffersSection/OffersSection"),
);
const ProductCarouselSection = React.lazy(
	() =>
		import("../../components/ui/ProductCarouselSection/ProductCarouselSection"),
);
import { useCategoriaStore } from "../../store/categoriaStore";

import styles from "./Home.module.css";
import { useProductoStore } from "../../store/productoStore";
import Loader from "../../components/ui/Loader/Loader";

const Home = () => {
	const { fetchCategoriasActivas, categoriasActivas } = useCategoriaStore();
	const { fetchProductosActivos, fetchProductosPaged } = useProductoStore();
	const [loading, setLoading] = useState(false);
	const [zapatillas, setZapatillas] = useState<any[]>([]);
	const [remeras, setRemeras] = useState<any[]>([]);
	const [allItems, setAllItems] = useState<any[]>([]);

	useEffect(() => {
		setLoading(true);
		fetchCategoriasActivas().catch(() => {});
		const API_URL = import.meta.env.VITE_API_URL;
		fetch(`${API_URL}/productos/paged?page=0&size=50&sortBy=id&sortDir=asc`)
			.then((r) => r.json())
			.then((data) => {
				const items = (data?.content ?? []).filter(
					(p: any) => p && typeof p === "object" && p.id,
				);
				setAllItems(items);
			})
			.catch(() => {})
			.finally(() => setLoading(false));

		// También actualizar el store para Catalog
		fetchProductosActivos().catch(() =>
			fetchProductosPaged({ page: 0, size: 50 }).catch(() => {}),
		);
	}, []);

	// Re-filtrar cuando lleguen las categorías del store (resuelven IDs numéricos)
	useEffect(() => {
		if (allItems.length === 0) return;
		const catMap = new Map<number, string>(
			categoriasActivas.map((c) => [
				c.id as number,
				(c.nombreCategoria ?? "").toUpperCase(),
			]),
		);
		const tieneDescuento = (p: any) => {
			const ds = p.descuentos ?? p.descuentosProducto ?? [];
			return (
				Array.isArray(ds) &&
				ds.some((d: any) => d?.activo && d?.descuento?.activo)
			);
		};
		const cat = (p: any) => {
			if (typeof p.categoria === "object" && p.categoria !== null) {
				return (p.categoria?.nombreCategoria ?? "").toUpperCase();
			}
			if (typeof p.categoria === "number") {
				return catMap.get(p.categoria) ?? "";
			}
			return "";
		};
		setZapatillas(
			allItems.filter(
				(p) =>
					(cat(p) === "ZAPATILLAS" ||
						cat(p) === "CALZADO" ||
						cat(p) === "CALZADOS") &&
					!tieneDescuento(p),
			),
		);
		setRemeras(
			allItems.filter(
				(p) =>
					(cat(p) === "REMERAS" ||
						cat(p) === "REMERA" ||
						cat(p) === "INDUMENTARIA") &&
					!tieneDescuento(p),
			),
		);
	}, [allItems, categoriasActivas]);

	if (loading) {
		return <Loader />;
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
			<BannerCarousel />
			<Suspense fallback={<Loader />}>
				<OffersSection />
			</Suspense>
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
				<Suspense fallback={<Loader />}>
					<>
						<ProductCarouselSection title="ZAPATILLAS" products={zapatillas} />
						<ProductCarouselSection title="REMERAS" products={remeras} />
					</>
				</Suspense>
			)}
			<div className={styles.eslogan}>
				<h2>ESTILO EN CADA LINEA</h2>
			</div>
		</>
	);
};

export default Home;
