import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { Producto } from "../../../types/Producto";

interface ProductCardProps {
  product: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Buscar descuento activo
  const descuentoActivo = product.descuentos?.find(
    (d) => d.activo && d.descuento.activo
  );

  let precioConDescuento = product.precio;
  if (descuentoActivo) {
    precioConDescuento = Math.round(
      product.precio * (1 - descuentoActivo.descuento.porcentajeDescuento / 100)
    );
  }

  const imagenPrincipal =
    product.imagenes?.find((img) => img.principal) || product.imagenes?.[0];

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.link}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.cardContainer}>
        {/* Etiqueta de descuento */}
        {descuentoActivo && (
          <div className={styles.discountTag}>
            -{descuentoActivo.descuento.porcentajeDescuento}%
          </div>
        )}

        {/* Imagen */}
        <div className={styles.imageContainer}>
          {product.imagenes && product.imagenes.length > 0 ? (
            <img
              src={`http://localhost:8080${encodeURI(
                product.imagenes[0].urlImagen
              )}`}
              alt={product.nombre}
              className={styles.productImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.noImage}>Sin imagen</div>
          )}
        </div>
        {/* Nombre */}
        <div className={styles.productName}>{product.nombre}</div>
        {/* Precios */}
        <div>
          {descuentoActivo ? (
            <>
              <span style={{ color: "#e53935", fontWeight: 700, fontSize: 18 }}>
                ${precioConDescuento.toLocaleString()}
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
            </>
          ) : (
            <span style={{ color: "#222", fontWeight: 700, fontSize: 18 }}>
              ${product.precio.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
