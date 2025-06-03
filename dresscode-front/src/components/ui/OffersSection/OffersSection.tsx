import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard"; // Ajusta la ruta si es necesario

const offers = [
  {
    id: 1,
    name: "NIKE DUNK LOW",
    image: "/public/assets/ImagesProducts/image 8.png",
    discount: 50,
    price: 130000,
    oldPrice: 260000,
  },
  {
    id: 2,
    name: "ADIDAS CAMPOS 90'",
    image: "/public/assets/ImagesProducts/image 9.png",
    discount: 30,
    price: 113000,
    oldPrice: 190000,
  },
  {
    id: 3,
    name: "VV",
    image: "/public/assets/ImagesProducts/image 10.png",
    discount: 30,
    price: 113000,
    oldPrice: 160000,
  },
  {
    id: 4,
    name: "NIKE AIR-FORCE",
    image: "/public/assets/ImagesProducts/image 11.png",
    discount: 30,
    price: 113000,
    oldPrice: 160000,
  },
  {
    id: 5,
    name: "CHOMBA ESSENTIALS ADIDAS",
    image: "/public/assets/ImagesProducts/image 12.png",
    discount: 30,
    price: 113000,
    oldPrice: 160000,
  },
];

const OffersSection = () => {
  return (
    // CONTENEDOR PRINCIPAL DE LA SECCIÓN DE OFERTAS
    <div style={{ background: "black", padding: "24px 0" }}>
      {/* CONTENEDOR INTERNO */}
      <div
        style={{
          background: "#222222",
        }}
      >
        <div style={{ position: "relative", background: "#6D0402" }}>
          {/* TÍTULO DE LA SECCIÓN */}
          <h2 style={{ color: "#fff", padding: "8px 24px", margin: 0 }}>
            OFERTAS
          </h2>
        </div>
        {/* CARRUSEL DE PRODUCTOS */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={4}
          style={{ padding: "20px 18px" }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <ProductCard
                id={offer.id}
                name={offer.name}
                image={offer.image}
                discount={offer.discount}
                price={offer.price}
                oldPrice={offer.oldPrice}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OffersSection;
