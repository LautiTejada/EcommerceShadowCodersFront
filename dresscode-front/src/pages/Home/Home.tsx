import CategoryBar from "../../components/ui/CategoryBar/CategoryBar";
import ImageCarousel from "../../components/ui/ImageCarousel/ImageCarousel";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <CategoryBar />
      <ImageCarousel />
      <div className={styles.separador}></div>
    </>
  );
};

export default Home;
