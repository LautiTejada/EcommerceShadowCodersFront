import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import type { Producto } from "../../../types/Producto";
import styles from "./ProductCarouselSection.module.css";

interface ProductCarouselSectionProps {
	title: string;
	products: Producto[];
}

const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
	title,
	products,
}) => (
	<section className={styles.section}>
		<div className={styles.sectionHeader}>
			<h2 className={styles.sectionTitle}>{title}</h2>
			<Link to="/catalog" className={styles.seeAll}>
				VER TODO &rarr;
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
			{products.map((product) => (
				<SwiperSlide key={product.id}>
					<ProductCard product={product} />
				</SwiperSlide>
			))}
		</Swiper>
	</section>
);

export default ProductCarouselSection;
