import React from "react";
import styles from "./MenuAdmin.module.css";
import { Link } from "react-router-dom";

interface MenuAdminProps {
  selected?: string;
  onSelect?: (item: string) => void;
}

const MenuAdmin: React.FC<MenuAdminProps> = () => {
  return (
    <aside className={styles.sidebar}>
      {/* <div className={styles.menuSection}>
        <div className={styles.menuTitle}>INFORMACION DE LA CUENTA</div>
      </div> */}
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>PRODUCTOS</div>
        <Link to="/admin/add-product">
          <div
            className={`${styles.menuItem} styles.selected : ""}`}
            //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
            >
              AGREGAR UN PRODUCTO
          </div>
        </Link>
        <Link to= "/admin/edit-product">
          <div
            className={`${styles.menuItem} $ styles.selected : ""}`}
          //   onClick={() => onSelect && onSelect("MODIFICAR UN PRODUCTO")}
          >
            MODIFICAR UN PRODUCTO
          </div>
        </Link>
        <Link to= "/admin/stock-product">
          <div
            className={`${styles.menuItem} styles.selected : ""}`}
          //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
          >
            STOCK DE PRODUCTO
          </div>
        </Link>
        <Link to= "/admin/state-product">
          <div
            className={`${styles.menuItem} $ ? styles.selected : ""}`}
          //   onClick={() => onSelect && onSelect("ELIMINAR UN PRODUCTO")}
          >
            ACTIVAR / DESACTIVAR 
          </div>
        </Link>
      </div>
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>DESCUENTOS</div>
        <div
          className={`${styles.menuItem} styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
        >
          AGREGAR UN DESCUENTO
        </div>
        <div
          className={`${styles.menuItem} $ styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("MODIFICAR UN PRODUCTO")}
        >
          MODIFICAR UN DESCUENTO
        </div>
        <div
          className={`${styles.menuItem} $ ? styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("ELIMINAR UN PRODUCTO")}
        >
          ACTIVAR / DESACTIVAR
        </div>
      </div>
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>TIPOS / CATEGORIAS</div>
        <div
          className={`${styles.menuItem} styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
        >
          AGREGAR 
        </div>
        <div
          className={`${styles.menuItem} $ styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("MODIFICAR UN PRODUCTO")}
        >
          MODIFICAR
        </div>
        <div
          className={`${styles.menuItem} $ ? styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("ELIMINAR UN PRODUCTO")}
        >
          ACTIVAR / DESACTIVAR
        </div>
      </div>
      <div className={styles.menuSection}>
        {/* <div className={styles.menuTitle}>ESTADISTICAS DE VENTAS</div> */}
      </div>
    </aside>
  );
};

export default MenuAdmin;
