
import { useState } from "react";
import styles from "./HomeAdmin.module.css";
// import { FaPen, FaTrashAlt } from "react-icons/fa";

const categories = ["ZAPATILLA", "REMERA"];

export default function HomeAdmin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category: categories[0],
    images: [null, null, null, null, null],
  });

  const handleInput = (field: string, value: string) => {
    setProduct({ ...product, [field]: value });
  };

  const handleCategory = (cat: string) => {
    setProduct({ ...product, category: cat });
    setShowCategory(false);
  };

  const [showCategory, setShowCategory] = useState(false);

//   const handleImageChange = (idx: number, file: File | null) => {
//     const newImages = [...product.images];
//     newImages[idx] = file;
//     setProduct({ ...product, images: newImages });
//   };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.menuSection}>
          <div className={styles.menuTitle}>INFORMACION DE LA CUENTA</div>
        </div>
        <div className={styles.menuSection}>
          <div className={styles.menuTitle}>PRODUCTOS</div>
          <div className={styles.menuItem + " " + styles.selected}>AGREGAR UN PRODUCTO</div>
          <div className={styles.menuItem}>MODIFICAR UN PRODUCTO</div>
          <div className={styles.menuItem}>ELIMINAR UN PRODUCTO</div>
        </div>
        <div className={styles.menuSection}>
          <div className={styles.menuTitle}>ESTADISTICAS DE VENTAS</div>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <form className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>NOMBRE DEL PRODUCTO</label>
              <div className={styles.inputIcon}>
                <input
                  className={styles.input}
                  value={product.name}
                  onChange={e => handleInput("name", e.target.value)}
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
                {product.category}
                <span className={styles.arrow} />
                {showCategory && (
                  <div className={styles.dropdown}>
                    {categories.map(cat => (
                      <div
                        key={cat}
                        className={styles.dropdownItem}
                        onClick={() => handleCategory(cat)}
                      >
                        {cat}
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
                  value={product.price}
                  onChange={e => handleInput("price", e.target.value)}
                  placeholder="$"
                />
                {/* <FaPen className={styles.icon} /> */}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>MARCA DEL PRODUCTO</label>
              <div className={styles.inputIcon}>
                <input
                  className={styles.input}
                  value={product.brand}
                  onChange={e => handleInput("brand", e.target.value)}
                  placeholder="..."
                />
                {/* <FaPen className={styles.icon} /> */}
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroupWide}>
              <label className={styles.label}>DESCRIPCION DEL PRODUCTO</label>
              <div className={styles.inputIcon}>
                <input
                  className={styles.input}
                  value={product.description}
                  onChange={e => handleInput("description", e.target.value)}
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
                {product.images.map((img, idx) => (
                  <div key={idx} className={styles.imageBox}>
                    {img ? (
                      <div className={styles.imagePreview}>
                        <img
                          src={URL.createObjectURL(img as File)}
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
        </form>
      </main>
    </div>
  );
}
