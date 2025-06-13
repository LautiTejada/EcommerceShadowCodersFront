import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { Producto } from "../../../types/Producto";

interface ProductCardProps {
  product: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // --- DEBUG: Mostrar el producto y sus descuentos en consola ---
  console.log("PRODUCTO EN CARD", product);
  if (product.descuentos && product.descuentos.length > 0) {
    console.log("DESCUENTOS DEL PRODUCTO", product.descuentos);
  }

  // Buscar descuento activo de forma segura
  const descuentoActivo = product.descuentos?.find(
    (d) => d && d.activo && d.descuento && d.descuento.activo
  );

  // Calcular precio con descuento si corresponde
  let precioConDescuento = product.precio;
  if (descuentoActivo && descuentoActivo.descuento) {
    precioConDescuento = Math.round(
      product.precio * (1 - descuentoActivo.descuento.porcentajeDescuento / 100)
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.link}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.cardContainer}>
        {/* Etiqueta de descuento */}
        {descuentoActivo && (
          <div className={styles.discountLabel}>
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
          {descuentoActivo && descuentoActivo.descuento ? (
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
