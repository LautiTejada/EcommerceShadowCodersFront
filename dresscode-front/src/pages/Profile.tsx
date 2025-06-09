import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useAuth } from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUsuarioStore } from "../store/userStore";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("accountInfo");
  const { logout } = useAuth();

  // Obtener el id del usuario logueado (ajusta según cómo lo guardes)

  const userId = Number(localStorage.getItem("usuario"));
  const { usuarioActual, obtenerUsuarioPorId, cargando } = useUsuarioStore();

  useEffect(() => {
    console.log("userId:", userId); // <-- agrega esto
    if (userId) {
      obtenerUsuarioPorId(userId);
    }
  }, [userId, obtenerUsuarioPorId]);

  const renderContent = () => {
    switch (activeSection) {
      case "accountInfo":
        return (
          <div className={styles.dataSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">NOMBRE</label>
              <input
                type="text"
                id="name"
                value={usuarioActual?.username || ""}
                readOnly
                className={styles.inputField}
              />
              <span className={styles.accountEditIcon}>
                <EditIcon />
              </span>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                value={usuarioActual?.email || ""}
                readOnly
                className={styles.inputField}
              />
              <span className={styles.accountEditIcon}>
                <EditIcon />
              </span>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">CONTRASEÑA</label>
              <input
                type="password"
                id="password"
                value="***************"
                readOnly
                className={styles.inputField}
              />
              <span className={styles.accountEditIcon}>
                <EditIcon />
              </span>
            </div>
            <div className={styles.acountButtons}>
              <button className={styles.saveButton}>
                <LockIcon className={styles.lockIcon} />
                <span>GUARDAR DATOS</span>
              </button>
              <button className={styles.logoutButton} onClick={logout}>
                <LogoutIcon />
                <span>CERRAR SESIÓN</span>
              </button>
            </div>
          </div>
        );
      case "addresses":
        return (
          <div className={styles.dataSection}>
            <div className={styles.addressEntry}>
              <div className={styles.addressInputFieldContainer}>
                <label>NOMBRE: MARCOS DI MECO</label>
                <input
                  type="text"
                  value="GRAL PAZ 4580 - CP 5505 - LUJAN DE CUYO, MENDOZA"
                  readOnly
                  className={styles.inputGroup}
                />
                <span className={styles.addressesEditIcon}>
                  <EditIcon />
                </span>
              </div>
              <span className={styles.addressesDeleteIcon}>
                <DeleteIcon />
              </span>
            </div>
            <div className={styles.addressEntry}>
              <div className={styles.addressInputFieldContainer}>
                <label>NOMBRE: LAUTATO TEJADA</label>
                <input
                  type="text"
                  value="SAN MARTIN 309 - CP 5507 - GODOY CRUZ, MENDOZA"
                  readOnly
                  className={styles.inputGroup}
                />
                <span className={styles.addressesEditIcon}>
                  <EditIcon />
                </span>
              </div>
              <span className={styles.addressesDeleteIcon}>
                <DeleteIcon />
              </span>
            </div>
            <div className={styles.addressEntry}>
              <div className={styles.addressInputFieldContainer}>
                <label>NOMBRE: JOAQUIN PARELLADA</label>
                <input
                  type="text"
                  value="LAS HERAS -CP 5500 - CIUDAD DE MENDOZA, MENDOZA"
                  readOnly
                  className={styles.inputGroup}
                />
                <span className={styles.addressesEditIcon}>
                  <EditIcon />
                </span>
              </div>
              <span className={styles.addressesDeleteIcon}>
                <DeleteIcon />
              </span>
            </div>
            <button className={styles.saveButton}>
              <AddLocationIcon className={styles.lockIcon} />

              <span>AGREGAR DIRECCION</span>
            </button>
          </div>
        );
      case "orderHistory":
        return (
          <div className={styles.orderHistorySection}>
            <div className={styles.orderHistoryEntry}>
              <img
                src="/nike-dunk-low.png"
                alt="Nike Dunk Low"
                className={styles.orderProductImage}
              />
              <div className={styles.orderProductDetails}>
                <span className={styles.orderProductName}>NIKE DUNK LOW</span>
                <span className={styles.orderProductAddress}>
                  GRAL PAZ 4580 - CP 5505 - LUJAN DE CUYO, MENDOZA
                </span>
              </div>
              <div className={styles.orderSummary}>
                <span className={styles.orderDate}>15 MARZO 2025</span>
                <span className={styles.orderPrice}>$ 399.999,00</span>
              </div>
            </div>
            {/* Puedes añadir más entradas de pedidos aquí si lo necesitas */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <div
          className={`${styles.sidebarItem} ${
            activeSection === "accountInfo" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("accountInfo")}
        >
          INFORMACIÓN DE LA CUENTA
        </div>
        <div
          className={`${styles.sidebarItem} ${
            activeSection === "addresses" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("addresses")}
        >
          DIRECCIONES
        </div>
        <div
          className={`${styles.sidebarItem} ${
            activeSection === "orderHistory" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("orderHistory")}
        >
          HISTORIAL DE PEDIDOS
        </div>
      </aside>
      <main className={styles.mainContent}>
        <h2 className={styles.mainTitle}>
          {activeSection === "accountInfo" && "DATOS"}
          {activeSection === "addresses" && "DIRECCIONES"}
          {activeSection === "orderHistory" && "HISTORIAL DE PEDIDOS"}
        </h2>
        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;
