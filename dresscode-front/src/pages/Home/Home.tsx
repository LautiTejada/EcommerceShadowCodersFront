import CategoryBar from "../../components/ui/CategoryBar/CategoryBar";
import ImageCarousel from "../../components/ui/ImageCarousel/ImageCarousel";
import OffersSection from "../../components/ui/OffersSection/OffersSection";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <CategoryBar />
      <ImageCarousel />
      <div className={styles.separador}></div>
      <OffersSection />
    </>
  );
};

export default Home;
