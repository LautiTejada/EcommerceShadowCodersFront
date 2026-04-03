import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useProductoStore } from "../../../store/productoStore";
import { Helmet } from "react-helmet-async";
import styles from "../ProductCarouselSection/ProductCarouselSection.module.css";

const OffersSection = () => {
	const { productosActivos } = useProductoStore();

	const productosConDescuento = productosActivos.filter(
		(producto) =>
			producto.descuentos &&
			producto.descuentos.some((d) => d.activo && d.descuento?.activo),
	);

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
					<Link to="/catalog" className={styles.seeAll}>
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
					{productosConDescuento.map((producto) => (
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
