import styles from "./StockProducto.module.css"
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin"
import { useEffect, useState } from "react";
import type { Producto } from "../../../../types/Producto";
import { useProductoStore } from "../../../../store/productoStore";
import { useProductoTalleStore } from "../../../../store/talleProductoStore";
import type { ProductoTalle } from "../../../../types/ProductoTalle";
import Swal from "sweetalert2";
import { ModalAgregarTalleProduct } from "../../../../components/admin/ModalAgregarTalleProduct/ModalAgregarTalleProduct";

export const StockProducto = () => {

  const {updateCantidadProductoTalle} = useProductoTalleStore()

  const { productosActivos, fetchProductosActivos, setProductoActual, desactivarProducto } = useProductoStore();

  const [product, setProduct] = useState<Producto | null>(null);
  const [showCategory, setShowCategory] = useState(false);
  const [talleActual, setTalleActual] = useState<ProductoTalle>()
  const [busqueda, setBusqueda] = useState("");
  const [showProductos, setShowProductos] = useState(false);
  const [cantidad, setCantidad] = useState<number | null>(null)
  const [productoAgregarTalle, setProductoAgregarTalle] = useState<Producto| null>()

  useEffect(() => {
    fetchProductosActivos();
  }, [fetchProductosActivos]);

  const handleSelectProducto = (producto: Producto) => {
    setProduct(producto);
    setProductoActual(producto);
    setBusqueda("");
    setShowProductos(false);
  };

  const handleCantidadProductoTalle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !product.id) {
      alert("Seleccioná un producto primero.");
      return;
    }

    if (!talleActual || !talleActual.id) {
      alert("Seleccioná un talle primero.");
      return;
    }

    if (cantidad === null || cantidad <= 0) {
      alert("Ingresá una cantidad válida.");
      return;
    }

    await updateCantidadProductoTalle(talleActual.id ,cantidad)

    setProduct(null);
    setProductoActual(null);
    setBusqueda("");
    setCantidad(null);
  };

  // 👉 Función para eliminar producto con SweetAlert
  const handleEliminarProducto = async () => {
    if (!product || !product.id) {
      Swal.fire("Error", "Seleccioná un producto primero.", "error");
      return;
    }

    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar el producto ${product.nombre}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirmacion.isConfirmed) {
      try {
        await desactivarProducto(product.id);
        Swal.fire("Eliminado", "El producto fue eliminado correctamente.", "success");
        setProduct(null);
        setProductoActual(null);
        setBusqueda("");
        setCantidad(null);
        fetchProductosActivos();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
    }
  };

  const productosFiltrados = productosActivos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAddTalle = (product: Producto) => {
      setProductoAgregarTalle(product);
  };

  const handleCloseModal = () => {
        setProductoAgregarTalle(null)
    };
          
  

  return (
    <div className={styles.container}>
      <MenuAdmin />
      <main className={styles.mainContent}>
        <form className={styles.form} onSubmit={handleCantidadProductoTalle}>
          <div className={styles.formRow}>
            <div className={styles.formGroupWide}>
              <label className={styles.label}>BUSCAR PRODUCTO</label>
              <div className={`${styles.inputDropdownWrapper}`}>
                <input
                  className={styles.input}
                  value={busqueda}
                  onChange={e => {
                    setBusqueda(e.target.value);
                    setShowProductos(true);
                  }}
                  placeholder="Escribí el nombre del producto..."
                />
                {showProductos && busqueda && (
                  <div className={styles.dropdown}>
                    {productosFiltrados.map(prod => (
                      <div
                        key={prod.id}
                        className={styles.dropdownItem}
                        onClick={() => handleSelectProducto(prod)}
                      >
                        {prod.nombre}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {product && (
            <>
              <div className={styles.header}>
                <h2 className={styles.formTitle}>STOCK: {product.nombre} - {product.color}</h2>
                <button type="button" className={styles.botonAgregar} onClick={()=> handleAddTalle(product)}>AGREGAR TALLE</button>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>TALLE</label>
                  <div
                    className={styles.select}
                    onClick={() => setShowCategory(!showCategory)}
                    tabIndex={0}
                  >
                    {talleActual?.talle.tipoTalle || "..."}
                    <span className={styles.arrow} />
                    {showCategory && (
                      <div className={styles.dropdown}>
                        {product.talles?.map(talles => (
                          <div
                            key={talles.id}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setTalleActual(talles);
                              setCantidad(talles.cantidad);
                              setShowCategory(false);
                            }}
                          >
                            {talles.talle.tipoTalle}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>CANTIDAD</label>
                    <div className={styles.inputIcon}>
                      <input
                        className={styles.input}
                        type="number"
                        value={cantidad !== null ? cantidad : ""}
                        onChange={e => setCantidad(Number(e.target.value))}
                        placeholder="Cantidad"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <button className={styles.addButton} type="submit">
                  GUARDAR CANTIDAD
                </button>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={handleEliminarProducto}
                >
                  ELIMINAR PRODUCTO
                </button>
              </div>
            </>
          )}
        </form>
      </main>
      {productoAgregarTalle && (
        <ModalAgregarTalleProduct
          producto={product!}
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
};
