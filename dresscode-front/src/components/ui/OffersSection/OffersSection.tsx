import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard"; // Ajusta la ruta si es necesario
import { useProductoStore } from "../../../store/productoStore";
import { useEffect } from "react";

const OffersSection = () => {
  const { productosActivos, fetchProductosActivos } = useProductoStore();

  useEffect(() => {
    fetchProductosActivos();
  }, [fetchProductosActivos]);

  const productosConDescuento = productosActivos.filter(
    (producto) =>
      producto.descuentos &&
      producto.descuentos.some((d) => d.activo && d.descuento?.activo)
  );

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
          {productosConDescuento.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductCard product={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OffersSection;
