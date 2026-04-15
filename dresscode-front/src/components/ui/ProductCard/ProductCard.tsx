import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { Producto } from "../../../types/Producto";
import { useFavoritoStore } from "../../../store/favoritoStore";
import { sileo } from "sileo";

interface ProductCardProps {
	product: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate();
	const { esFavorito, agregarFavorito, eliminarFavorito } = useFavoritoStore();
	const isFavorite = product.id ? esFavorito(product.id) : false;

	const descuentoActivo = product.descuentos?.find(
		(d) => d && d.activo && d.descuento && d.descuento.activo,
	);
	let precioConDescuento = product.precio;
	if (descuentoActivo && descuentoActivo.descuento) {
		precioConDescuento = Math.round(
			product.precio *
				(1 - descuentoActivo.descuento.porcentajeDescuento / 100),
		);
	}

	const nombreMarca = (product.marca as any)?.nombreMarca ?? "";
	const nombreCategoria = product.categoria?.nombreCategoria ?? "";

	const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		// Verificar si está autenticado
		const token = localStorage.getItem("token");
		if (!token) {
			sileo.info({
				title: "Inicia sesión",
				description: "Debes estar conectado para agregar a favoritos",
				type: "info",
			});
			navigate("/login");
			return;
		}

		if (isFavorite) {
			if (product.id) eliminarFavorito(product.id);
		} else {
			if (product.id) agregarFavorito(product.id);
		}
	};

	const imgSrc = (() => {
		const u = product.imagenes?.[0]?.urlImagen;
		if (!u) return null;
		if (u.startsWith("http")) return u;
		return `http://localhost:8080${encodeURI(u)}`;
	})();

	return (
		<Link to={`/product/${product.id}`} className={styles.link}>
			<div className={styles.card}>
				{/* Imagen */}
				<div className={styles.imageWrap}>
					{descuentoActivo && (
						<span className={styles.badge}>
							-{descuentoActivo.descuento.porcentajeDescuento}%
						</span>
					)}
					<button
						className={`${styles.favoriteBtn} ${isFavorite ? styles.favorited : ""}`}
						onClick={handleFavoriteClick}
						aria-label={
							isFavorite ? "Remove from favorites" : "Add to favorites"
						}
						type="button">
						<span className={styles.heartIcon}>♥</span>
					</button>
					{imgSrc ? (
						<img
							src={imgSrc}
							alt={product.nombre}
							loading="lazy"
							className={styles.img}
						/>
					) : (
						<div className={styles.noImg}>Sin imagen</div>
					)}
				</div>

				{/* Info */}
				<div className={styles.info}>
					{(nombreCategoria || nombreMarca) && (
						<p className={styles.meta}>{nombreCategoria || nombreMarca}</p>
					)}
					<p className={styles.nombre}>{product.nombre}</p>
					<div className={styles.precios}>
						{descuentoActivo && descuentoActivo.descuento ? (
							<>
								<span className={styles.precioDesc}>
									${precioConDescuento.toLocaleString()}
								</span>
								<span className={styles.precioOrig}>
									${product.precio.toLocaleString()}
								</span>
							</>
						) : (
							<span className={styles.precio}>
								${product.precio.toLocaleString()}
							</span>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
