import { useEffect } from "react";
import { useDescuentoStore } from "../../../store/descuentoStore";
import styles from "./ModalProductosDescuento.module.css";
import Swal from "sweetalert2";
import type { Producto } from "../../../types/Producto";
import DeleteIcon from "@mui/icons-material/Delete";

interface ModalProductosDescuentoProps {
  descuentoId: number;
  onClose: () => void;
}

export const ModalProductosDescuento = ({
  descuentoId,
  onClose,
}: ModalProductosDescuentoProps) => {
  const {
    productos,
    fetchProductosPorDescuento,
    eliminarProductoDeDescuento,
    fetchDescuentos,
  } = useDescuentoStore();

  useEffect(() => {
    if (descuentoId) {
      fetchProductosPorDescuento(descuentoId);
    }
  }, [fetchProductosPorDescuento, descuentoId]);

  const handleRemoveProducto = async (producto: Producto) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de eliminar el producto: ${producto.nombre} del descuento?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7f5af0",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, eliminar`,
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      await eliminarProductoDeDescuento(descuentoId, producto.id!);
      await fetchProductosPorDescuento(descuentoId);
      await fetchDescuentos(); // <-- refresca todos los descuentos
      Swal.fire({
        title: `${producto.nombre} fue eliminado`,
        text: `El producto se ha eliminado del descuento correctamente.`,
        icon: "success",
        confirmButtonColor: "#7f5af0",
      });
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.headerProductos}>
          <span className={styles.title}>Productos en el descuento</span>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        {productos.length === 0 ? (
          <p className={styles.noProductos}>
            NO HAY PRODUCTOS ASOCIADOS A ESTE DESCUENTO.
          </p>
        ) : (
          <ul>
            {productos.map((producto, index) => (
              <li key={index} className={styles.productoCard}>
                <span className={styles.productoNombre}>{producto.nombre}</span>
                <span className={styles.productoPrecio}>
                  Precio: ${producto.precio}
                </span>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => handleRemoveProducto(producto)}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
