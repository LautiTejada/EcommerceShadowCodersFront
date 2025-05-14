import styles from "./ImageCarousel.module.css";

const ImageCarousel = () => {
  return (
    <>
      <section className={styles.containerCarousel}>
        <img src="/src/assets/ImagesCarousel/imagenCarousel 1.png" alt="" />
        <img src="/src/assets/ImagesCarousel/imagenCarousel 2.png" alt="" />
        <img src="/src/assets/ImagesCarousel/imagenCarousel 3.png" alt="" />
        <img src="/src/assets/ImagesCarousel/imagenCarousel 4.png" alt="" />
      </section>
    </>
  );
};

export default ImageCarousel;
