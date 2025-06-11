import styles from "./EditarProducto.module.css";
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin";
import { useEffect, useState } from "react";
import type { Producto } from "../../../../types/Producto";
import { useProductoStore } from "../../../../store/productoStore";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import type { Marca } from "../../../../types/enums/Marca";
import type { Color } from "../../../../types/enums/Color";

const marcas: Marca[] = ["NIKE", "ADIDAS", "PUMA", "VANS", "JORDAN"];
const colores: Color[] = ["NEGRO", "BLANCO", "ROJO", "AZUL", "VERDE", "AMARILLO", "GRIS", "MARRON"];

export const EditarProducto = () => {
  const [product, setProduct] = useState<Producto | null>(null);
  const [showMarcas, setShowMarcas] = useState(false);
  const [showColores, setShowColores] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const { productosActivos, fetchProductosActivos, editarProducto, setProductoActual } = useProductoStore();
  const { categoriasActivas, fetchCategoriasActivas, setCategoriaActual, categoriaActual } = useCategoriaStore();

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchProductosActivos();
    fetchCategoriasActivas();
  }, [fetchProductosActivos, fetchCategoriasActivas]);

  const handleInput = (field: keyof Producto, value: any) => {
    if (!product) return;
    setProduct({ ...product, [field]: value });
  };

  const handleSelectProducto = (producto: Producto) => {
    setProduct(producto);
    setProductoActual(producto);
    setCategoriaActual(producto.categoria || null);
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !product.id) {
      alert("Seleccioná un producto primero.");
      return;
    }
    if (!categoriaActual) {
      alert("Seleccioná una categoría.");
      return;
    }

    await editarProducto(product.id, {
      ...product,
      precio: Number(product.precio),
      categoria: categoriaActual,
    });

    console.log("Producto actualizado con éxito.", product);
    setProduct(null);
    setProductoActual(null);
    setCategoriaActual(null);
    setBusqueda("");
  };

  const productosFiltrados = productosActivos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <MenuAdmin />
      <main className={styles.mainContent}>
        <form className={styles.form} onSubmit={handleEditProduct}>
          <div className={styles.formRow}>
            <div className={styles.formGroupWide}>
              <label className={styles.label}>BUSCAR PRODUCTO</label>
              <div className={styles.inputIcon}>
                <input
                  className={styles.input}
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  placeholder="Escribí el nombre del producto..."
                />
              </div>
              {busqueda && (
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

          {product && (
            <>
              <h2 className={styles.formTitle}>Editar Producto: {product.nombre}</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>NOMBRE</label>
                  <div className={styles.inputIcon}>
                    <input
                      className={styles.input}
                      value={product.nombre}
                      onChange={e => handleInput("nombre", e.target.value)}
                      placeholder="..."
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CATEGORÍA</label>
                  <div
                    className={styles.select}
                    onClick={() => setShowCategory(!showCategory)}
                    tabIndex={0}
                  >
                    {categoriaActual?.nombreCategoria || product.categoria?.nombreCategoria || "..."}
                    <span className={styles.arrow} />
                    {showCategory && (
                      <div className={styles.dropdown}>
                        {categoriasActivas.map(cat => (
                          <div
                            key={cat.id}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setCategoriaActual(cat);
                              setShowCategory(false);
                            }}
                          >
                            {cat.nombreCategoria}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>PRECIO</label>
                  <div className={styles.inputIcon}>
                    <input
                      className={styles.input}
                      type="number"
                      value={product.precio}
                      onChange={e => handleInput("precio", e.target.value)}
                      placeholder="$"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>MARCA</label>
                  <div
                    className={styles.select}
                    onClick={() => setShowMarcas(!showMarcas)}
                    tabIndex={0}
                  >
                    {product.marca || "..."}
                    <span className={styles.arrow} />
                    {showMarcas && (
                      <div className={styles.dropdown}>
                        {marcas.map(marca => (
                          <div
                            key={marca}
                            className={styles.dropdownItem}
                            onClick={() => {
                              handleInput("marca", marca);
                              setShowMarcas(false);
                            }}
                          >
                            {marca}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>COLOR</label>
                  <div
                    className={styles.select}
                    onClick={() => setShowColores(!showColores)}
                    tabIndex={0}
                  >
                    {product.color}
                    <span className={styles.arrow} />
                    {showColores && (
                      <div className={styles.dropdown}>
                        {colores.map(color => (
                          <div
                            key={color}
                            className={styles.dropdownItem}
                            onClick={() => {
                              handleInput("color", color);
                              setShowColores(false);
                            }}
                          >
                            {color}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroupWide}>
                  <label className={styles.label}>DESCRIPCIÓN</label>
                  <div className={styles.inputIcon}>
                    <input
                      className={styles.input}
                      value={product.descripcion}
                      onChange={e => handleInput("descripcion", e.target.value)}
                      placeholder="..."
                    />
                  </div>
                </div>
              </div>

              {/* Si quieres agregar edición de imágenes, puedes copiar la lógica de AgregarProducto aquí */}

              <div className={styles.formRow}>
                <button className={styles.addButton} type="submit">
                  GUARDAR CAMBIOS
                </button>
              </div>
            </>
          )}
        </form>
      </main>
    </div>
  );
};