import React from "react";
import styles from "./MenuAdmin.module.css";

interface MenuAdminProps {
  selected?: string;
  onSelect?: (item: string) => void;
}

const MenuAdmin: React.FC<MenuAdminProps> = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>INFORMACION DE LA CUENTA</div>
      </div>
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>PRODUCTOS</div>
        <div
          className={`${styles.menuItem} styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("AGREGAR UN PRODUCTO")}
        >
          AGREGAR UN PRODUCTO
        </div>
        <div
          className={`${styles.menuItem} $ styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("MODIFICAR UN PRODUCTO")}
        >
          MODIFICAR UN PRODUCTO
        </div>
        <div
          className={`${styles.menuItem} $ ? styles.selected : ""}`}
        //   onClick={() => onSelect && onSelect("ELIMINAR UN PRODUCTO")}
        >
          ELIMINAR UN PRODUCTO
        </div>
      </div>
      <div className={styles.menuSection}>
        <div className={styles.menuTitle}>ESTADISTICAS DE VENTAS</div>
      </div>
    </aside>
  );
};

export default MenuAdmin;
