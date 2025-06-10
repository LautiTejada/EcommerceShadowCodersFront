import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useAuth } from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUsuarioStore } from "../store/userStore";
import type { Usuario } from "../types/Usuario";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("accountInfo");
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<Usuario>>({
    password: "",
  });

  const userId = Number(localStorage.getItem("usuario"));
  const { usuarioActual, obtenerUsuarioPorId, actualizarUsuario } =
    useUsuarioStore();

  useEffect(() => {
    if (userId) {
      obtenerUsuarioPorId(userId);
    }
  }, [userId, obtenerUsuarioPorId]);

  useEffect(() => {
    if (usuarioActual) {
      setEditedUser({
        username: usuarioActual.username,
        email: usuarioActual.email,
      });
    }
  }, [usuarioActual]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (usuarioActual) {
      setEditedUser({
        username: usuarioActual.username,
        email: usuarioActual.email,
      });
    }
  };

  const handleSave = async () => {
    if (userId && editedUser && usuarioActual) {
      try {
        const usuarioActualizado = {
          username: editedUser.username || usuarioActual.username,
          email: editedUser.email || usuarioActual.email,
          activo: usuarioActual.activo,
          password: editedUser.password
            ? editedUser.password
            : usuarioActual.password,
          rol: usuarioActual.rol,
        };

        console.log("Enviando datos:", usuarioActualizado);
        await actualizarUsuario(userId, usuarioActualizado);
        localStorage.setItem("username", usuarioActualizado.username);
        setIsEditing(false);
        await obtenerUsuarioPorId(userId);
        setEditedUser((prev) => ({ ...prev, password: "" }));
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "accountInfo":
        return (
          <div className={styles.dataSection}>
            {/* Botón de editar único */}
            {!isEditing && (
              <button
                className={styles.editButton}
                onClick={handleEdit}
                style={{ marginBottom: "1rem" }}
              >
                <EditIcon />
                <span>EDITAR DATOS</span>
              </button>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="username">NOMBRE</label>
              <input
                type="text"
                id="username"
                name="username"
                value={
                  isEditing
                    ? editedUser.username || ""
                    : usuarioActual?.username || ""
                }
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={
                  isEditing
                    ? editedUser.email || ""
                    : usuarioActual?.email || ""
                }
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">CONTRASEÑA</label>
              {isEditing ? (
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Nueva contraseña"
                  value={editedUser.password || ""}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              ) : (
                <input
                  type="password"
                  id="password"
                  value="************"
                  readOnly
                  className={styles.inputField}
                />
              )}
            </div>
            <div className={styles.acountButtons}>
              {isEditing ? (
                <>
                  <button className={styles.saveButton} onClick={handleSave}>
                    <LockIcon className={styles.lockIcon} />
                    <span>GUARDAR CAMBIOS</span>
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    <span className={styles.cancelIcon}>
                      <CancelIcon />
                      CANCELAR
                    </span>
                  </button>
                </>
              ) : (
                <button className={styles.logoutButton} onClick={logout}>
                  <LogoutIcon />
                  <span>CERRAR SESIÓN</span>
                </button>
              )}
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
