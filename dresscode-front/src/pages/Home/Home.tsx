
import { useEffect } from "react";
import { CategoryBar } from "../../components/ui/CategoryBar/CategoryBar";
import ImageCarousel from "../../components/ui/ImageCarousel/ImageCarousel";
import OffersSection from "../../components/ui/OffersSection/OffersSection";
import ProductCarouselSection from "../../components/ui/ProductCarouselSection/ProductCarouselSection";
import { useCategoriaStore } from "../../store/categoriaStore";

import styles from "./Home.module.css";
import { useProductoStore } from "../../store/productoStore";


const Home = () => {

  const { categorias, fetchCategorias } = useCategoriaStore();
  const { productosActivos, fetchProductosActivos } = useProductoStore();

  useEffect(() => {
    fetchCategorias();
    fetchProductosActivos();
  }, [productosActivos, fetchCategorias, fetchProductosActivos]);

  console.log(categorias);


  return (
    <>
      <CategoryBar />
      <ImageCarousel />
      <div className={styles.separador}></div>
      {/* <OffersSection /> */}
      {/* <ProductCarouselSection title="ZAPATILLAS" products={productosActivos} />
      <ProductCarouselSection title="REMERAS" products={productosActivos} /> */}
      <div className={styles.eslogan}>
        <h2>ESTILO EN CADA LINEA</h2>
      </div>
    </>
  );
};

export default Home;
