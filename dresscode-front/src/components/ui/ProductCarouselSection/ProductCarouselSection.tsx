import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}

interface ProductCarouselSectionProps {
  title: string;
  products: Product[];
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
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ProductCarouselSection;
