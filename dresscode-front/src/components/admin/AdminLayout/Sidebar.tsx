import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUsuarioStore } from "../../../store/userStore";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Sidebar.module.css";
import MenuAdmin from "../MenuAdmin/MenuAdmin";

export const Sidebar = () => {
	const navigate = useNavigate();
	const { logout: authLogout } = useAuth();
	const usuarioActual = useUsuarioStore((state) => state.usuarioActual);

	const handleLogout = () => {
		authLogout();
		navigate("/login");
	};

	const userInitial = usuarioActual?.username
		? usuarioActual.username[0].toUpperCase()
		: "U";

	return (
		<aside className={styles.sidebar}>
			{/* HEADER - LOGO */}
			<div className={styles.header}>
				<h2>DressCode</h2>
				<span className={styles.admin}>ADMIN</span>
			</div>

			{/* USER INFO */}
			<div className={styles.userInfo}>
				<div className={styles.avatar}>{userInitial}</div>
				<div className={styles.userDetails}>
					<p className={styles.username}>
						{usuarioActual?.username || "Usuario"}
					</p>
					<p className={styles.role}>ROL: ADMIN</p>
				</div>
				<button
					onClick={handleLogout}
					className={styles.logoutBtn}
					title="Logout"
					aria-label="Cerrar sesión">
					<LogoutIcon />
				</button>
			</div>

			{/* MENU */}
			<div className={styles.menuContainer}>
				<MenuAdmin />
			</div>
		</aside>
	);
};

export default Sidebar;
