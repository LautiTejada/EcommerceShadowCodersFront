import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBannerStore } from "../../../store/bannerStore";
import {
	getBannerImageUrl,
	AUTO_PLAY_RESUME_DELAY,
} from "../../../utils/bannerUtils";
import styles from "./BannerCarousel.module.css";

export const BannerCarousel = () => {
	const { banners, cargando } = useBannerStore();
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);

	// Auto-rotate effect
	useEffect(() => {
		if (!autoPlay || banners.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % banners.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [autoPlay, banners.length]);

	// Si no hay banners y no está cargando, no mostrar nada
	if (!cargando && banners.length === 0) {
		return null;
	}

	// Si está cargando pero aún no hay banners, retornar contenedor vacío
	if (cargando && banners.length === 0) {
		return (
			<div
				className={styles.carouselContainer}
				style={{ minHeight: "300px" }}
			/>
		);
	}

	const bannersOrdenados = [...banners].sort((a, b) => a.orden - b.orden);
	const bannerActual = bannersOrdenados[currentIndex];

	const handlePrev = () => {
		setAutoPlay(false);
		setCurrentIndex((prev) =>
			prev === 0 ? bannersOrdenados.length - 1 : prev - 1,
		);
		setTimeout(() => setAutoPlay(true), AUTO_PLAY_RESUME_DELAY);
	};

	const handleNext = () => {
		setAutoPlay(false);
		setCurrentIndex((prev) => (prev + 1) % bannersOrdenados.length);
		setTimeout(() => setAutoPlay(true), AUTO_PLAY_RESUME_DELAY);
	};

	const handleDotClick = (index: number) => {
		setAutoPlay(false);
		setCurrentIndex(index);
		setTimeout(() => setAutoPlay(true), AUTO_PLAY_RESUME_DELAY);
	};

	const handleBannerClick = () => {
		if (bannerActual?.marcaId) {
			navigate(`/catalog?marcaId=${bannerActual.marcaId}`);
		}
	};

	const imagenUrl = getBannerImageUrl(bannerActual.imagenNombre);

	return (
		<div className={styles.carouselContainer}>
			<div
				className={styles.carouselWrapper}
				onMouseEnter={() => setAutoPlay(false)}
				onMouseLeave={() => setAutoPlay(true)}>
				{/* Banner image */}
				<img
					src={imagenUrl}
					alt={bannerActual.titulo}
					onClick={handleBannerClick}
					className={styles.bannerImage}
					onError={(e) => {
						const img = e.target as HTMLImageElement;
						if (!img.dataset.errored) {
							img.dataset.errored = "1";
							img.src = "/assets/placeholder-banner.png";
						}
					}}
				/>

				{/* Navigation arrows */}
				{bannersOrdenados.length > 1 && (
					<>
						<button
							className={`${styles.navButton} ${styles.prevButton}`}
							onClick={handlePrev}
							aria-label="Banner anterior">
							&#10094;
						</button>
						<button
							className={`${styles.navButton} ${styles.nextButton}`}
							onClick={handleNext}
							aria-label="Siguiente banner">
							&#10095;
						</button>
					</>
				)}

				{/* Dot indicators */}
				{bannersOrdenados.length > 1 && (
					<div className={styles.dotsContainer}>
						{bannersOrdenados.map((_, index) => (
							<button
								key={index}
								className={`${styles.dot} ${
									index === currentIndex ? styles.activeDot : ""
								}`}
								onClick={() => handleDotClick(index)}
								aria-label={`Ver banner ${index + 1}`}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
