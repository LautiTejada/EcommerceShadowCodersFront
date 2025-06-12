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
        <Link to="/admin/add-discount">
        <div
          className={`${styles.menuItem} styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
        >
          AGREGAR UN DESCUENTO
        </div>
        </Link>
        <Link to="/admin/list-discounts">
        <div
          className={`${styles.menuItem} $ styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("MODIFICAR UN PRODUCTO")}
        >
          LISTA DE DESCUENTOS
        </div>
        </Link>
      
      </div>
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>TIPOS / CATEGORIAS</div>
        <Link to="/admin/add-type-cateogory">
        
        <div
          className={`${styles.menuItem} styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
        >
          AGREGAR 
        </div>
        </Link>
        <Link to= "/admin/list-type-cateogory">
        
        <div
          className={`${styles.menuItem} $ styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("MODIFICAR UN PRODUCTO")}
        >
          TIPOS / CATEOGORIAS
        </div>
        </Link>
      </div>
      <div className={styles.menuSection}>
        {/* <div className={styles.menuTitle}>ESTADISTICAS DE VENTAS</div> */}
      </div>
    </aside>
  );
};

export default MenuAdmin;
