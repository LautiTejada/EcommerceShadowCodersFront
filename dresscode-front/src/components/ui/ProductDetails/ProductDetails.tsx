import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { CategoryBar } from "../CategoryBar/CategoryBar";
import { useParams } from "react-router-dom";
import { useProductoStore } from "../../../store/productoStore";



export const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProductoById, productoActual } = useProductoStore();

  useEffect(() => {
    fetchProductoById(Number(id));

  }, [id, fetchProductoById]);

  console.log(productoActual);

  const [quantity, setQuantity] = useState(1);

  if (!productoActual) {
    return <div className={styles.productNoFound}>ERROR: Producto no encontrado</div>;

  }

  return (
    <>
    <CategoryBar/>
      <div className={styles.bg}>
        <div className={styles.container}>
          {/* Miniaturas */}
          {/* <div className={styles.thumbnails}>
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
          </div> */}
          {/* Imagen principal */}
          <div className={styles.mainImageContainer}>
            {/* <img
              // src={selectedImage}
              alt={product.nombre}
              className={styles.mainImage}
            /> */}
          </div>
          {/* Info producto */}
          <div className={styles.infoBox}>
            <h2 className={styles.productName}>{productoActual.nombre}</h2>

            <div className={styles.category}>{productoActual.categoria?.nombreCategoria}</div>
            
            <div className={styles.brand}>{productoActual.marca}</div>
            <div className={styles.price}>
              ${productoActual.precio.toLocaleString()}
            </div>
            <div className={styles.sizeSection}>
              <div className={styles.sizeLabel}>Talle</div>
              <div className={styles.sizes}>
                 
                {productoActual.talles?.map((size) => (

                  <button
                     key={size.talle.id}
                     className={`${styles.sizeBtn} `}
                  >
                    {size.talle.tipoTalle}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.color}>
              
              Color: <span>{productoActual.color}</span>

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
          <span className={styles.descText}>{productoActual.descripcion}</span>
        </div>
      </div>
    </>
  );
};
