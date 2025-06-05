import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { CategoryBar } from "../CategoryBar/CategoryBar";

const product = {
  id: 1,
  name: "NIKE DUNK LOW",
  brand: "NIKE",
  category: "Zapatillas",
  price: 250000,
  color: "Blanco / Bordo",
  description:
    "Desde los tableros hasta el skateboard, la influencia de los Nike Dunk es innegable. Aunque se presentaron como zapatillas de básquetbol en 1985, la suela plana y adherente es perfecta para una comunidad deportiva que estaba desatendida: los skaters. Al revelar una subcultura que anhela la creatividad tanto como la funcionalidad, los Dunk lanzaron décadas de incontables gamas de colores que continúan capturando el alma de los skaters de costa a costa.",
  images: [
    "/public/assets/ImagesProducts/image 8.png",
    "/public/assets/ImagesProducts/image 8_2.png",
    "/public/assets/ImagesProducts/image 8_3.png",
    "/public/assets/ImagesProducts/image 8_4.png",
  ],
  sizes: [
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "14",
  ],
};

export const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  return (
    <>
    <CategoryBar/>
      <div className={styles.bg}>
        <div className={styles.container}>
          {/* Miniaturas */}
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name}
                className={`${styles.thumbnailImg} ${
                  selectedImage === img ? styles.selectedThumbnail : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          {/* Imagen principal */}
          <div className={styles.mainImageContainer}>
            <img
              src={selectedImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
          {/* Info producto */}
          <div className={styles.infoBox}>
            <h2 className={styles.productName}>{product.name}</h2>
            <div className={styles.category}>{product.category}</div>
            <div className={styles.brand}>{product.brand}</div>
            <div className={styles.price}>
              ${product.price.toLocaleString()}
            </div>
            <div className={styles.sizeSection}>
              <div className={styles.sizeLabel}>Talle</div>
              <div className={styles.sizes}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${styles.sizeBtn} ${
                      selectedSize === size ? styles.sizeBtnSelected : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.color}>
              Color: <span>{product.color}</span>
            </div>
            {/* Cantidad */}
            <div className={styles.quantitySection}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className={styles.qtyBtn}
              >
                -
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className={styles.qtyBtn}
              >
                +
              </button>
            </div>
            <button className={styles.addToCartBtn}>AÑADIR AL CARRO</button>
          </div>
        </div>
        {/* Descripción */}
        <div className={styles.descriptionBox}>
          <span className={styles.descLabel}>Descripcion: </span>
          <span className={styles.descText}>{product.description}</span>
        </div>
      </div>
    </>
  );
};
