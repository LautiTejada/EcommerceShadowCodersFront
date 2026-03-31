import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import { useProductoStore } from "../../../store/productoStore";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const OffersSection = () => {
	const { productosActivos, fetchProductosActivos } = useProductoStore();

	useEffect(() => {
		fetchProductosActivos();
	}, [fetchProductosActivos]);

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
			<div style={{ background: "black", padding: "24px 0" }}>
				<div style={{ position: "relative", background: "#6D0402" }}>
					<h2 style={{ color: "#fff", padding: "8px 24px", margin: 0 }}>
						OFERTAS
					</h2>
				</div>
				<Swiper
					modules={[Navigation]}
					navigation
					spaceBetween={24}
					slidesPerView={4}
					style={{ padding: "20px 18px" }}>
					{productosConDescuento.map((producto) => (
						<SwiperSlide key={producto.id}>
							<ProductCard product={producto} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default OffersSection;
