import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useAuth } from "../../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUsuarioStore } from "../../store/userStore";
import type { Usuario } from "../../types/Usuario";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Direccion } from "../../types/Direccion";
import { provincias, type Provincia } from "../../types/enums/Provincias";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("accountInfo");
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<Usuario>>({
    password: "",
  });

  const userId = Number(localStorage.getItem("usuario"));
  const {
    usuarioActual,
    obtenerUsuarioPorId,
    actualizarUsuario,
    direccionesUsuario,
    obtenerDireccionesUsuario,
    crearDireccionUsuario,
    actualizarDireccionUsuario,
  } = useUsuarioStore();

  useEffect(() => {
    if (userId) {
      obtenerUsuarioPorId(userId);
    }
  }, [userId, obtenerUsuarioPorId]);

  const [direccionEdit, setDireccionEdit] = useState<Partial<Direccion> | null>(
    null
  );
  const [isEditingDireccion, setIsEditingDireccion] = useState(false);
  const [isAddingDireccion, setIsAddingDireccion] = useState(false);

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

  useEffect(() => {
    if (activeSection === "addresses" && userId) {
      obtenerDireccionesUsuario(userId);
    }
  }, [activeSection, userId, obtenerDireccionesUsuario]);

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
        console.log("Direcciones del usuario:", direccionesUsuario);
        return (
          <div className={styles.dataSection}>
            {direccionesUsuario.length === 0 && (
              <p>No tienes direcciones guardadas.</p>
            )}

            {direccionesUsuario
              .filter(
                (direccion) =>
                  typeof direccion === "object" && direccion !== null
              )
              .map((direccion, idx) => (
                <div key={direccion.id ?? idx} className={styles.addressEntry}>
                  <div className={styles.addressInputFieldContainer}>
                    <label>Dirección</label>
                    <input
                      type="text"
                      value={
                        direccion.calle &&
                        direccion.numero &&
                        direccion.codigoPostal &&
                        direccion.localidad &&
                        direccion.provincia
                          ? `${direccion.calle} ${direccion.numero} - CP ${
                              direccion.codigoPostal
                            } - ${
                              direccion.localidad
                            }, ${direccion.provincia.replaceAll("_", " ")}`
                          : "Dirección incompleta"
                      }
                      readOnly
                      className={styles.inputGroup}
                    />
                    <span
                      className={styles.addressesEditIcon}
                      onClick={() => {
                        setDireccionEdit(direccion);
                        setIsEditingDireccion(true);
                        setIsAddingDireccion(false);
                      }}
                    >
                      <EditIcon />
                    </span>
                  </div>
                  <span
                    className={styles.addressesDeleteIcon}
                    onClick={async () => {
                      // Implementa eliminar aquí
                    }}
                  >
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            {(isAddingDireccion || isEditingDireccion) && direccionEdit && (
              <form
                className={styles.addressForm}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (
                    !direccionEdit?.calle ||
                    !direccionEdit?.numero ||
                    !direccionEdit?.codigoPostal ||
                    !direccionEdit?.localidad ||
                    !direccionEdit?.provincia
                  ) {
                    // Puedes mostrar un mensaje de error aquí si quieres
                    return;
                  }
                  if (isAddingDireccion) {
                    await crearDireccionUsuario(userId, {
                      calle: direccionEdit.calle,
                      numero: direccionEdit.numero,
                      codigoPostal: direccionEdit.codigoPostal,
                      localidad: direccionEdit.localidad,
                      provincia: direccionEdit.provincia as Provincia,
                      activo: true,
                      pais: "Argentina",
                    });
                  } else if (isEditingDireccion && direccionEdit.id) {
                    await actualizarDireccionUsuario(userId, direccionEdit.id, {
                      calle: direccionEdit.calle,
                      numero: direccionEdit.numero,
                      codigoPostal: direccionEdit.codigoPostal,
                      localidad: direccionEdit.localidad,
                      provincia: direccionEdit.provincia as Provincia,
                      activo: true,
                      pais: "Argentina",
                    });
                  }
                  setDireccionEdit(null);
                  setIsAddingDireccion(false);
                  setIsEditingDireccion(false);
                  await obtenerDireccionesUsuario(userId);
                }}
              >
                <div className={styles.inputGroup}>
                  <label htmlFor="calle">Calle</label>
                  <input
                    className={styles.inputField}
                    name="calle"
                    value={direccionEdit.calle || ""}
                    onChange={(e) =>
                      setDireccionEdit((prev) => ({
                        ...prev!,
                        calle: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="numero">Número</label>
                  <input
                    className={styles.inputField}
                    name="numero"
                    value={direccionEdit.numero || ""}
                    onChange={(e) =>
                      setDireccionEdit((prev) => ({
                        ...prev!,
                        numero: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="codigoPostal">Código Postal</label>
                  <input
                    className={styles.inputField}
                    name="codigoPostal"
                    value={direccionEdit.codigoPostal || ""}
                    onChange={(e) =>
                      setDireccionEdit((prev) => ({
                        ...prev!,
                        codigoPostal: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="localidad">Localidad</label>
                  <input
                    className={styles.inputField}
                    name="localidad"
                    value={direccionEdit.localidad || ""}
                    onChange={(e) =>
                      setDireccionEdit((prev) => ({
                        ...prev!,
                        localidad: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="provincia">Provincia</label>
                  <select
                    className={styles.inputField}
                    name="provincia"
                    value={direccionEdit.provincia || ""}
                    onChange={(e) =>
                      setDireccionEdit((prev) => ({
                        ...prev!,
                        provincia: e.target.value as Provincia,
                      }))
                    }
                    required
                  >
                    <option value="">Selecciona una provincia</option>
                    {provincias.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.addressFormButtons}>
                  <button className={styles.saveButton} type="submit">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      setDireccionEdit(null);
                      setIsAddingDireccion(false);
                      setIsEditingDireccion(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
            {!isAddingDireccion && !isEditingDireccion && (
              <button
                className={styles.saveButton}
                onClick={() => {
                  setDireccionEdit({
                    calle: "",
                    numero: "",
                    codigoPostal: "",
                    localidad: "",
                    provincia: "" as Provincia,
                  });
                  setIsAddingDireccion(true);
                  setIsEditingDireccion(false);
                }}
              >
                <AddLocationIcon className={styles.lockIcon} />
                <span>AGREGAR DIRECCIÓN</span>
              </button>
            )}
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
