import styles from "./ImageCarousel.module.css";

const ImageCarousel = () => {
	return (
		<>
			<section className={styles.containerCarousel}>
				<img
					src="/public/assets/ImagesCarousel/imagenCarousel 1.png"
					alt=""
					loading="lazy"
				/>
				<img
					src="/public/assets/ImagesCarousel/imagenCarousel 2.png"
					alt=""
					loading="lazy"
				/>
				<img
					src="/public/assets/ImagesCarousel/imagenCarousel 3.png"
					alt=""
					loading="lazy"
				/>
				<img
					src="/public/assets/ImagesCarousel/imagenCarousel 4.png"
					alt=""
					loading="lazy"
				/>
			</section>
		</>
	);
};

export default ImageCarousel;
