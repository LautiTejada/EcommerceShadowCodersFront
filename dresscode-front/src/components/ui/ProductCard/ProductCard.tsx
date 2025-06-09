import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { Producto } from "../../../types/Producto";

interface ProductCardProps {
  product: Producto
}
const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => (
  // <Link
  //   to={`/product/${product.id}`}
  //   style={{ textDecoration: "none", color: "inherit" }}
  // >
    <div className={styles.cardContainer}>
      {/* Etiqueta de descuento */}

      {/* Imagen */}

      {/* Nombre */}
      <div className={styles.productName}>{product.nombre}</div>
      {/* Precios */}
      <div>
        <span style={{ color: "#e53935", fontWeight: 700, fontSize: 18 }}>
          ${product.precio.toLocaleString()}
        </span>
        <span
          style={{
            color: "#888",
            textDecoration: "line-through",
            marginLeft: 8,
            fontSize: 14,
          }}
        >
          ${product.precio.toLocaleString()}
        </span>
      </div>
    </div>
  // </Link>
);

export default ProductCard;
