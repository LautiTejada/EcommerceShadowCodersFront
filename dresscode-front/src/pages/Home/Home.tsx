import { useEffect } from "react";
import { CategoryBar } from "../../components/ui/CategoryBar/CategoryBar";
import ImageCarousel from "../../components/ui/ImageCarousel/ImageCarousel";
import OffersSection from "../../components/ui/OffersSection/OffersSection";
import ProductCarouselSection from "../../components/ui/ProductCarouselSection/ProductCarouselSection";
import { useCategoriaStore } from "../../store/categoriaStore";

import styles from "./Home.module.css";
import { useProductoStore } from "../../store/productoStore";

const Home = () => {
  const { fetchCategorias } = useCategoriaStore();
  const { productosActivos, fetchProductosActivos } = useProductoStore();

  useEffect(() => {
    fetchCategorias();
    fetchProductosActivos();
  }, []);

  const zapatillas = productosActivos.filter(
    (producto) =>
      producto.categoria?.nombreCategoria?.toUpperCase() === "ZAPATILLAS" &&
      !(
        producto.descuentos &&
        producto.descuentos.some(
          (d) => d.activo && d.descuento && d.descuento.activo
        )
      )
  );
  const remeras = productosActivos.filter(
    (producto) =>
      producto.categoria?.nombreCategoria?.toUpperCase() === "REMERAS" &&
      !(
        producto.descuentos &&
        producto.descuentos.some(
          (d) => d.activo && d.descuento && d.descuento.activo
        )
      )
  );

  return (
    <>
      <CategoryBar />
      <ImageCarousel />
      <div className={styles.separador}></div>
      {<OffersSection />}
      <ProductCarouselSection title="ZAPATILLAS" products={zapatillas} />
      <ProductCarouselSection title="REMERAS" products={remeras} />
      <div className={styles.eslogan}>
        <h2>ESTILO EN CADA LINEA</h2>
      </div>
    </>
  );
};

export default Home;
