import styles from "./ImageCarousel.module.css";

const ImageCarousel = () => {
	return (
		<section
			className={styles.containerCarousel}
			aria-label="Carrusel de imágenes">
			<img
				src="/public/assets/ImagesCarousel/imagenCarousel 1.png"
				alt="Zapatillas urbanas en oferta"
				loading="lazy"
			/>
			<img
				src="/public/assets/ImagesCarousel/imagenCarousel 2.png"
				alt="Remeras deportivas de temporada"
				loading="lazy"
			/>
			<img
				src="/public/assets/ImagesCarousel/imagenCarousel 3.png"
				alt="Buzos y camperas urbanas"
				loading="lazy"
			/>
			<img
				src="/public/assets/ImagesCarousel/imagenCarousel 4.png"
				alt="Accesorios y moda urbana DressCode"
				loading="lazy"
			/>
		</section>
	);
};

export default ImageCarousel;
