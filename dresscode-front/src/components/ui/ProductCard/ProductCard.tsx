import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { Producto } from "../../../types/Producto";

interface ProductCardProps {
	product: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
