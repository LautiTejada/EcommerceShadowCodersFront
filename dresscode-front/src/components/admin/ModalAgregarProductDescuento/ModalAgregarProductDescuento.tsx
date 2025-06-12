import styles from "./ModalAgregarProductDescuento.module.css"
import { useEffect, useState } from "react";
import { useDescuentoStore } from "../../../store/descuentoStore";
import { useProductoStore } from "../../../store/productoStore";
import Swal from "sweetalert2";

interface ModalAgregarProductDescuentoProps {
  descuentoId: number;
  onClose: () => void;
}

export const ModalAgregarProductDescuento = ({
  descuentoId,
  onClose,
}: ModalAgregarProductDescuentoProps) => {
  const { agregarProductoADescuento , fetchDescuentos ,descuentos} = useDescuentoStore();
  const { productos, fetchProductos } = useProductoStore();

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchDescuentos()
    fetchProductos();
  }, [fetchProductos, fetchDescuentos]);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAgregarProducto = (productoId: number) => {
    // Buscar el descuento actual
    const descuentoActual = descuentos.find((d) => d.id === descuentoId);

    // Verificar si el producto ya está en el descuento
    const yaExiste = descuentoActual?.productos!.some((p) => p.id === productoId);

    if (yaExiste) {
      Swal.fire({
        title: "El producto ya está agregado a este descuento.",
        icon: "error",
        confirmButtonColor: "#7f5af0",
      });
      return;
    }

    // Confirmar antes de agregar
    Swal.fire({
      title: "¿Estás seguro de agregar el producto al descuento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7f5af0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        agregarProductoADescuento(descuentoId, productoId);
        Swal.fire({
          title: "Producto fue agregado",
          icon: "success",
          confirmButtonColor: "#7f5af0",
        });
      }
    });
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontainer}>
        <div className={styles.headerContainer}>
          

          <input
            type="text"
            placeholder="BUSCAR PRODUCTOS"
            className={styles.inputbusqueda}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className={styles.btncerrar} onClick={onClose}>
            ✕
          </button>
        </div>
        

        <div className={styles.productoslista}>
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className={styles.productoitem}>
              <span className={styles.productonombre}>{producto.nombre}</span>
              <span className={styles.productoprecio}>
                Precio: ${producto.precio}
              </span>
              <span className={styles.productocategoria}>
                Categoría : {producto.categoria?.nombreCategoria}
              </span>
              <button
                className={styles.btnagregar}
                onClick={() => handleAgregarProducto(producto.id!)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
