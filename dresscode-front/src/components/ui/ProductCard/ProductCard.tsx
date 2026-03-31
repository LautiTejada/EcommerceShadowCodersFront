import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

	return (
		<Link
			to={`/product/${product.id}`}
			className={styles.link}
			style={{ textDecoration: "none", color: "inherit" }}>
			<motion.div
				className={styles.cardContainer}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				whileHover={{
					scale: 1.03,
					boxShadow: "0 8px 32px rgba(129,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
				}}
				transition={{ type: "spring", stiffness: 260, damping: 20 }}
				aria-label={`Ver detalles de ${product.nombre}`}>
				{descuentoActivo && (
					<div className={styles.discountLabel}>
						-{descuentoActivo.descuento.porcentajeDescuento}%
					</div>
				)}

				<div className={styles.imageContainer}>
					{product.imagenes && product.imagenes.length > 0 ? (
						<img
							src={`http://localhost:8080${encodeURI(product.imagenes[0].urlImagen)}`}
							alt={product.nombre}
							loading="lazy"
							className={styles.productImage}
						/>
					) : (
						<div className={styles.noImage}>Sin imagen</div>
					)}
				</div>

				<div className={styles.productName}>{product.nombre}</div>

				<div>
					{descuentoActivo && descuentoActivo.descuento ? (
						<>
							<span style={{ color: "#e53935", fontWeight: 700, fontSize: 18 }}>
								{typeof precioConDescuento === "number"
									? `$${precioConDescuento.toLocaleString()}`
									: "Sin precio"}
							</span>
							<span
								style={{
									color: "#888",
									textDecoration: "line-through",
									marginLeft: 8,
									fontSize: 14,
								}}>
								{typeof product.precio === "number"
									? `$${product.precio.toLocaleString()}`
									: "Sin precio"}
							</span>
						</>
					) : (
						<span style={{ color: "#222", fontWeight: 700, fontSize: 18 }}>
							{typeof product.precio === "number"
								? `$${product.precio.toLocaleString()}`
								: "Sin precio"}
						</span>
					)}
				</div>
			</motion.div>
		</Link>
	);
};

export default ProductCard;
