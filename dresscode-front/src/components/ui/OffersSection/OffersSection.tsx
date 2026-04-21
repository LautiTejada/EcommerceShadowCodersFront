import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { Helmet } from "react-helmet-async";
import styles from "../ProductCarouselSection/ProductCarouselSection.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const tieneDescuentoActivo = (p: any) => {
	const descuentos = p.descuentos ?? p.descuentosProducto ?? [];
	return (
		Array.isArray(descuentos) &&
		descuentos.some(
			(d: any) => d && d.activo && d.descuento && d.descuento.activo,
		)
	);
};

const OffersSection = () => {
	const [productos, setProductos] = useState<any[]>([]);

	useEffect(() => {
		fetch(`${API_URL}/productos/paged?page=0&size=50&sortBy=id&sortDir=asc`)
			.then((r) => r.json())
			.then((data) => {
				const items = (data?.content ?? [])
					.filter((p: any) => p && typeof p === "object" && p.id)
					.map((p: any) => ({
						...p,
						descuentos: p.descuentos ?? p.descuentosProducto ?? [],
					}));
				setProductos(items.filter(tieneDescuentoActivo));
			})
			.catch(() => {});
	}, []);

	if (productos.length === 0) return null;

	return (
		<>
			<Helmet>
				<title>Ofertas | DressCode</title>
				<meta
					name="description"
					content="Descubre las mejores ofertas y descuentos en zapatillas y ropa urbana en DressCode."
				/>
				<meta property="og:title" content="Ofertas | DressCode" />
				<meta
					property="og:description"
					content="Descubre las mejores ofertas y descuentos en zapatillas y ropa urbana en DressCode."
				/>
			</Helmet>
			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>OFERTAS</h2>
					<Link to="/catalog/ofertas" className={styles.seeAll}>
						VER TODO &#8594;
					</Link>
				</div>
				<Swiper
					modules={[Navigation]}
					navigation
					spaceBetween={16}
					slidesPerView={4}
					breakpoints={{
						0: { slidesPerView: 1.4, spaceBetween: 12 },
						600: { slidesPerView: 2.2, spaceBetween: 14 },
						900: { slidesPerView: 3.2, spaceBetween: 16 },
						1200: { slidesPerView: 4, spaceBetween: 18 },
					}}>
					{productos.map((producto) => (
						<SwiperSlide key={producto.id}>
							<ProductCard product={producto} />
						</SwiperSlide>
					))}
				</Swiper>
			</section>
		</>
	);
};

export default OffersSection;
