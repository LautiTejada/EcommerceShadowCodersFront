
import { useEffect } from "react";
import { CategoryBar } from "../../components/ui/CategoryBar/CategoryBar";
import ImageCarousel from "../../components/ui/ImageCarousel/ImageCarousel";
import OffersSection from "../../components/ui/OffersSection/OffersSection";
import ProductCarouselSection from "../../components/ui/ProductCarouselSection/ProductCarouselSection";
import { useCategoriaStore } from "../../store/categoriaStore";

import styles from "./Home.module.css";

const zapatillas = [
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

const Home = () => {

  const { categorias, fetchCategorias } = useCategoriaStore();

  useEffect(() => {
    fetchCategorias();
  }, []);

  console.log(categorias);


  return (
    <>
      <CategoryBar />
      <ImageCarousel />
      <div className={styles.separador}></div>
      <OffersSection />
      <ProductCarouselSection title="ZAPATILLAS" products={zapatillas} />
      <ProductCarouselSection title="REMERAS" products={zapatillas} />
      <div className={styles.eslogan}>
        <h2>ESTILO EN CADA LINEA</h2>
      </div>
    </>
  );
};

export default Home;
