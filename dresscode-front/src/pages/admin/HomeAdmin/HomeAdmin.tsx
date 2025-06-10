
import { useEffect, useState } from "react";
import styles from "./HomeAdmin.module.css";
import MenuAdmin from "../../../components/admin/MenuAdmin/MenuAdmin";
import { useCategoriaStore } from "../../../store/categoriaStore";
import { useProductoStore } from "../../../store/productoStore";
import type { Marca } from "../../../types/enums/Marca";
import type { Producto } from "../../../types/Producto";
import type { Color } from "../../../types/enums/Color";
// import { FaPen, FaTrashAlt } from "react-icons/fa";
const marcas: Marca[] = ["NIKE", "ADIDAS", "PUMA", "VANS", "JORDAN"];

const colores : Color[] = ["NEGRO", "BLANCO", "ROJO", "ROJO", "AZUL", "VERDE", "AMARILLO", "GRIS", "MARRON"]

export default function HomeAdmin() {

  const [product, setProduct] = useState<Producto>({
    nombre: "",
    precio: 0,
    descripcion: "",
    color: "...",
    marca: undefined,
    imagenes: [],
  });

  const {agregarProductoConCategoria} = useProductoStore()

  const {categoriasActivas, categoriaActual , fetchCategoriasActivas , setCategoriaActual} = useCategoriaStore()

  console.log(categoriasActivas);

  const handleInput = (field: string, value: string) => {
    setProduct({ ...product, [field]: value });
  };


  const handleAddProduct = (e: React.FormEvent) => {
  e.preventDefault(); // Evitar recarga de página

  if (!categoriaActual || categoriaActual.id === undefined) {
  alert("Seleccioná una categoría válida");
  return;
}

  // Validaciones simples si querés:
  if (!product.nombre || !product.precio ) {
    alert("Completa al menos nombre y precio");
    return;
  }

  // Construir el producto a enviar
  const nuevoProducto = {
    ...product,
    precio: Number(product.precio), // si en la store espera number
  };

  agregarProductoConCategoria(nuevoProducto, categoriaActual.id);

  // Reseteo de formulario
  setProduct({
    nombre: "",
    precio: 0,
    descripcion: "",
    color: "",
    marca: undefined,
    imagenes: [],
  });

  setCategoriaActual(null);
};





  const [showCategory, setShowCategory] = useState(false);

  const [showMarcas, setShowMarcas] = useState(false);

  const [showColores, setShowColores] = useState(false);

//   const handleImageChange = (idx: number, file: File | null) => {
//     const newImages = [...product.images];
//     newImages[idx] = file;
//     setProduct({ ...product, images: newImages });
//   };

  useEffect(() =>{

    fetchCategoriasActivas();
  }, [ fetchCategoriasActivas])

  return (
    <div className={styles.container}>
      <MenuAdmin/>
      <main className={styles.mainContent}>
        <form className={styles.form} onSubmit={handleAddProduct}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>NOMBRE DEL PRODUCTO</label>
              <div className={styles.inputIcon}>
                <input
                  className={styles.input}
                  value={product.nombre}
                  onChange={e => handleInput("nombre", e.target.value)}
                  placeholder="..."
                />
                {/* <FaPen className={styles.icon} /> */}
              </div>
            </div>
            
             <div className={styles.formGroup}>
              <label className={styles.label}>CATEGORIA</label>
              <div
                className={styles.select}
                onClick={() => setShowCategory(!showCategory)}
                tabIndex={0}
              >
                {categoriaActual?.nombreCategoria || "..."}
                <span className={styles.arrow} />
                {showCategory && (
                  <div className={styles.dropdown}>
                    {categoriasActivas.map(cat => (
                      <div
                        key={cat.id}
                        className={styles.dropdownItem}
                        onClick={() => setCategoriaActual(cat)}
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
                  value={product.precio}
                  onChange={e => handleInput("precio", e.target.value)}
                  placeholder="$"
                />
                {/* <FaPen className={styles.icon} /> */}
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
                        {marcas.map((marca) => (
                        <div
                            key={marca}
                            className={styles.dropdownItem}
                            onClick={() => {
                            setProduct({ ...product, marca: marca });
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
                        {colores.map((color) => (
                        <div
                            key={color}
                            className={styles.dropdownItem}
                            onClick={() => {
                            setProduct({ ...product, color: color });
                            setShowMarcas(false);
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
              <label className={styles.label}>DESCRIPCION DEL PRODUCTO</label>
              <div className={styles.inputIcon}>
                <input
                  className={styles.input}
                  value={product.descripcion}
                  onChange={e => handleInput("descripcion", e.target.value)}
                  placeholder="..."
                />
                {/* <FaPen className={styles.icon} /> */}
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroupWide}>
              <label className={styles.label}>IMAGENES DEL PRODUCTO</label>
                <div className={styles.imagesRow}>
                {product.imagenes?.map((img, idx) => (
                  <div key={idx} className={styles.imageBox}>
                    {img ? (
                      <div className={styles.imagePreview}>
                        <img
                        //   src={URL.createObjectURL(img as File)}
                          alt="preview"
                          className={styles.img}
                        />
                        <button
                          type="button"
                          className={styles.deleteBtn}
                        //   onClick={() => handleImageChange(idx, null)}
                        >
                          {/* <FaTrashAlt /> */}
                        </button>
                      </div>
                    ) : (
                      <label className={styles.uploadLabel}>
                        <span className={styles.uploadIcon}>+</span>
                        <span>Cargar</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                        //   onChange={e =>
                        //     handleImageChange(
                        //       idx,
                        //       e.target.files ? e.target.files[0] : null
                        //     )
                        //   }
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <button className={styles.addButton} type="submit">
              AGREGAR PRODUCTO
            </button>
          </div>
        </form >
      </main>
    </div>
  );
}
