import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { CategoryBar } from "../CategoryBar/CategoryBar";
import { useParams } from "react-router-dom";
import { useProductoStore } from "../../../store/productoStore";
import { useCartStore } from "../../../store/cartStore";

export const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProductoById, productoActual } = useProductoStore();
  const { addToCart } = useCartStore();

  const [selectedTalleId, setSelectedTalleId] = useState<number | null>(null);

  useEffect(() => {
    fetchProductoById(Number(id));
    setSelectedTalleId(null);
  }, [id, fetchProductoById]);

  console.log(productoActual);

  const [quantity, setQuantity] = useState(1);

  if (!productoActual) {
    return (
      <div className={styles.productNoFound}>ERROR: Producto no encontrado</div>
    );
  }
  const handleAddToCart = () => {
    if (!selectedTalleId) {
      alert("Seleccioná un talle");
      return;
    }
    addToCart({
      productoId: productoActual.id!,
      nombre: productoActual.nombre,
      precio: productoActual.precio,
      imagen: productoActual.imagenes?.[0]?.urlImagen || "",
      cantidad: quantity,
      talleId: selectedTalleId,
    });
    alert("Producto agregado al carrito");
  };

  return (
    <>
      <CategoryBar />
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
            {productoActual.imagenes && productoActual.imagenes.length > 0 ? (
              <img
                src={productoActual.imagenes[0].urlImagen}
                alt={productoActual.nombre}
                className={styles.mainImage}
              />
            ) : (
              <div className={styles.noImage}>Sin imagen</div>
            )}
          </div>
          {/* Info producto */}
          <div className={styles.infoBox}>
            <h2 className={styles.productName}>{productoActual.nombre}</h2>
            <div className={styles.category}>
              {productoActual.categoria?.nombreCategoria}
            </div>
            <div className={styles.brand}>{productoActual.marca}</div>
            <div className={styles.price}>
              ${productoActual.precio.toLocaleString()}
            </div>
            <div className={styles.sizeSection}>
              <div className={styles.sizeLabel}>Talle</div>
              <div className={styles.sizes}>
                {productoActual.talles?.map((size) => (
                  <button
                    key={size.talle.id ?? Math.random()}
                    className={`${styles.sizeBtn} ${
                      selectedTalleId === size.talle.id
                        ? styles.sizeBtnSelected
                        : ""
                    }`}
                    onClick={() => {
                      if (typeof size.talle.id === "number") {
                        setSelectedTalleId(
                          selectedTalleId === size.talle.id
                            ? null
                            : size.talle.id
                        );
                      }
                    }}
                    type="button"
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
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              AÑADIR AL CARRO
            </button>
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
