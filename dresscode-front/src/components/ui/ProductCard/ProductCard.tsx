import styles from "./ProductCard.module.css";

interface ProductCardProps {
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
}
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  discount,
  price,
  oldPrice,
}) => (
  <div className={styles.cardContainer}>
    {/* Etiqueta de descuento */}
    <span className={styles.discountLabel}>-{discount}%</span>
    {/* Imagen */}
    <img src={image} alt={name} className={styles.productImage} />
    {/* Nombre */}
    <div className={styles.productName}>{name}</div>
    {/* Precios */}
    <div>
      <span style={{ color: "#e53935", fontWeight: 700, fontSize: 18 }}>
        ${price.toLocaleString()}
      </span>
      <span
        style={{
          color: "#888",
          textDecoration: "line-through",
          marginLeft: 8,
          fontSize: 14,
        }}
      >
        ${oldPrice.toLocaleString()}
      </span>
    </div>
  </div>
);

export default ProductCard;
