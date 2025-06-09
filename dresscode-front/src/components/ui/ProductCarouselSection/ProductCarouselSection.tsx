import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import type { Producto } from "../../../types/Producto";


interface ProductCarouselSectionProps {
  title: string;
  products: Producto[];
}

const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
  title,
  products,
}) => (
  <div style={{ background: "black", padding: "24px 0" }}>
    <div style={{ background: "#b89c74" }}>
      <h2 style={{ color: "#fff", padding: "8px 24px", margin: 0 }}>{title}</h2>
    </div>
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={24}
      slidesPerView={4}
      style={{ padding: "24px 16px" }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ProductCarouselSection;
