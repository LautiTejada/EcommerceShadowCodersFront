import styles from "./ModalProductosDescuento.module.css"
export const ModalProductosDescuento = () => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>PRODUCTOS</h2>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <button className={styles.addButton}>AGREGAR UN PRODUCTO</button>

        {productos.map((producto, index) => (
          <div key={index} className={styles.productoCard}>
            <span className={styles.productoNombre}>{producto.nombre}</span>
            <span className={styles.productoPrecio}>
              Precio: ${producto.precio}
            </span>
            <span className={styles.productoPrecioDescuento}>
              Precio descuento: ${producto.precioDescuento}
            </span>
            <button className={styles.deleteButton}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}
