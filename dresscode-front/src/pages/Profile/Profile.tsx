import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useAuth } from "../../hooks/useAuth";
import type { Usuario } from "../../types/Usuario";
import CancelIcon from "@mui/icons-material/Cancel";
import { provincias, type Provincia } from "../../types/enums/Provincias";
import { desactivarDireccionDeUsuario } from "../../http/usuario";
import Loader from "../../components/ui/Loader/Loader";
import { sileo } from "sileo";
import { useUsuarioStore } from "../../store/userStore";
import AdminPanel from "./AdminPanel/AdminPanel";

const Profile = () => {
	const {
		usuarioActual,
		obtenerDireccionesUsuario,
		actualizarUsuario,
		obtenerUsuarioPorId,
		direccionesUsuario,
		crearDireccionUsuario,
		actualizarDireccionUsuario,
	} = useUsuarioStore();
	const isAdmin =
		usuarioActual?.rol === "ADMIN" || localStorage.getItem("rol") === "ADMIN";
	const [activeSection, setActiveSection] = useState("accountInfo");
	const [adminActiveView, setAdminActiveView] = useState("home"); // home, products, discounts, etc
	const { logout } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState<Partial<Usuario>>({
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const userId = Number(localStorage.getItem("usuario"));
	const [isAddingDireccion, setIsAddingDireccion] = useState(false);
	const [isEditingDireccion, setIsEditingDireccion] = useState(false);
	const [direccionEdit, setDireccionEdit] = useState<any>(null);

	useEffect(() => {
		if (usuarioActual) {
			setEditedUser({
				username: usuarioActual.username,
				email: usuarioActual.email,
			});
		}
	}, [usuarioActual]);

	// Cargar datos del usuario al montar el componente
	useEffect(() => {
		if (userId && !usuarioActual) {
			obtenerUsuarioPorId(userId);
		}
	}, [userId, usuarioActual, obtenerUsuarioPorId]);

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
						{!isEditing && (
							<button
								className={styles.editButton}
								onClick={handleEdit}
								style={{ marginBottom: "1rem" }}>
								<EditIcon />
								<span>EDITAR DATOS</span>
							</button>
						)}
						<div className={styles.inputGroup}>
							<label htmlFor="username">USUARIO</label>
							<input
								type="text"
								id="username"
								name="username"
								value={editedUser.username || ""}
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
								value={editedUser.email || ""}
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
										onClick={handleCancel}>
										<span className={styles.cancelIcon}>
											<CancelIcon />
											CANCELAR
										</span>
									</button>
								</>
							) : null}
						</div>
					</div>
				);
			case "addresses":
				return (
					<div className={styles.dataSection}>
						{direccionesUsuario.filter(
							(direccion) =>
								typeof direccion === "object" &&
								direccion !== null &&
								direccion.activo,
						).length === 0 && <p>No tienes direcciones guardadas.</p>}

						{direccionesUsuario
							.filter(
								(direccion: any) =>
									typeof direccion === "object" &&
									direccion !== null &&
									direccion.activo,
							)
							.map((direccion: any, idx: number) => (
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
											}}>
											<EditIcon />
										</span>
									</div>
									<span
										className={styles.addressesDeleteIcon}
										onClick={async () => {
											if (direccion.id && userId) {
												if (
													window.confirm(
														"¿Seguro que deseas eliminar esta dirección?",
													)
												) {
													setLoading(true);
													try {
														await desactivarDireccionDeUsuario(
															userId,
															direccion.id,
														);
														await obtenerDireccionesUsuario(userId);
														sileo.success({
															title: "Dirección eliminada",
															description:
																"La dirección ha sido eliminada correctamente.",
															type: "success",
														});
													} catch {
														sileo.error({
															title: "Error",
															description: "No se pudo eliminar la dirección.",
															type: "error",
														});
													} finally {
														setLoading(false);
													}
												}
											}
										}}>
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
								}}>
								<div className={styles.inputGroup}>
									<label htmlFor="calle">Calle</label>
									<input
										className={styles.inputField}
										name="calle"
										value={direccionEdit.calle || ""}
										onChange={(e) =>
											setDireccionEdit((prev: any) => ({
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
											setDireccionEdit((prev: any) => ({
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
										maxLength={4}
										pattern="\d{4}"
										value={direccionEdit.codigoPostal || ""}
										onChange={(e) =>
											setDireccionEdit((prev: any) => ({
												...prev!,
												codigoPostal: e.target.value.replace(/\D/, ""),
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
											setDireccionEdit((prev: any) => ({
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
											setDireccionEdit((prev: any) => ({
												...prev!,
												provincia: e.target.value as Provincia,
											}))
										}
										required>
										<option value="">Selecciona una provincia</option>
										{provincias.map((prov) => (
											<option key={prov} value={prov}>
												{prov.replace(/_/g, " ")}
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
										}}>
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
								}}>
								<AddLocationIcon className={styles.lockIcon} />
								<span>AGREGAR DIRECCIÓN</span>
							</button>
						)}
					</div>
				);
			case "orderHistory":
				return <div className={styles.orderHistorySection}></div>;
			case "adminPanel":
				return (
					<AdminPanel
						activeView={adminActiveView}
						onViewChange={setAdminActiveView}
					/>
				);
			default:
				return null;
		}
	};

	if (loading) {
		return <Loader />;
	}
	return (
		<div className={styles.profileContainer}>
			<aside className={styles.sidebar}>
				{isAdmin && <div className={styles.sidebarRole}>ADMINISTRADOR</div>}
				<div
					className={`${styles.sidebarItem} ${
						activeSection === "accountInfo" ? styles.active : ""
					}`}
					onClick={() => setActiveSection("accountInfo")}>
					INFORMACIÓN DE LA CUENTA
				</div>
				{isAdmin ? (
					<div
						className={`${styles.sidebarItem} ${
							activeSection === "adminPanel" ? styles.active : ""
						}`}
						onClick={() => setActiveSection("adminPanel")}>
						PANEL DE ADMINISTRACIÓN
					</div>
				) : (
					<>
						<div
							className={`${styles.sidebarItem} ${
								activeSection === "addresses" ? styles.active : ""
							}`}
							onClick={() => setActiveSection("addresses")}>
							DIRECCIONES
						</div>
						<div
							className={`${styles.sidebarItem} ${
								activeSection === "orderHistory" ? styles.active : ""
							}`}
							onClick={() => setActiveSection("orderHistory")}>
							HISTORIAL DE PEDIDOS
						</div>
					</>
				)}
			</aside>
			<main className={styles.mainContent}>
				<h2 className={styles.mainTitle}>
					{activeSection === "accountInfo" && (isAdmin ? "MI CUENTA" : "DATOS")}
					{activeSection === "addresses" && "DIRECCIONES"}
					{activeSection === "orderHistory" && "HISTORIAL DE PEDIDOS"}
					{activeSection === "adminPanel" && "PANEL DE ADMINISTRACIÓN"}
				</h2>
				{renderContent()}
			</main>
		</div>
	);
};

export default Profile;
