import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCartStore } from "../../../store/cartStore";
import { motion } from "framer-motion";
import { CategoryBar } from "../../ui/CategoryBar/CategoryBar";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [rol, setRol] = useState<string | null>(null);
	const location = useLocation();
	const { cart } = useCartStore();
	const { logout } = useAuth();
	const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

	useEffect(() => {
		setUsername(localStorage.getItem("username"));
		setRol(localStorage.getItem("rol"));
	}, [location]);

	// Ocultar CategoryBar en rutas específicas
	const hideCategoryBar =
		location.pathname === "/profile" ||
		location.pathname.startsWith("/profile/");

	return (
		<header role="banner">
			<AppBar position="sticky" elevation={2} className={styles.stickyHeader}>
				<Toolbar className={styles.toolbar}>
					<div className={styles.logoContainer}>
						<Button
							color="inherit"
							component={Link}
							to="/"
							className={styles.logoButton}
							aria-label="Ir a inicio">
							<img
								src="/public/assets/logo-dresscode.png"
								alt="DressCode"
								className={styles.logoImg}
								loading="lazy"
							/>
						</Button>
					</div>

					{/* CategoryBar integrado en el header */}
					{!hideCategoryBar && <CategoryBar />}

					<div className={styles.buttonsContainer}>
						<motion.div
							whileTap={{ scale: 0.92 }}
							whileHover={{ scale: 1.06 }}
							style={{ display: "inline-block" }}>
							<IconButton
								color="inherit"
								component={Link}
								to="/cart"
								className={styles.cartButton}
								aria-label="Ver carrito">
								<ShoppingCartIcon fontSize="medium" />
								{totalItems > 0 && (
									<span className={styles.cartBadge}>{totalItems}</span>
								)}
							</IconButton>
						</motion.div>
						{username ? (
							<>
								<motion.div
									whileTap={{ scale: 0.92 }}
									whileHover={{ scale: 1.06 }}
									style={{ display: "inline-block" }}>
									<IconButton
										color="inherit"
										component={Link}
										to="/profile"
										className={styles.accountButton}
										aria-label="Ver perfil">
										<Avatar
											sx={{
												width: 32,
												height: 32,
												bgcolor: rol === "ADMIN" ? "#810000" : "#810000",
												fontSize: 16,
											}}>
											{username[0]?.toUpperCase()}
										</Avatar>
									</IconButton>
								</motion.div>
								<motion.div
									whileTap={{ scale: 0.92 }}
									whileHover={{ scale: 1.06 }}
									style={{ display: "inline-block" }}>
									<IconButton
										color="inherit"
										onClick={logout}
										aria-label="Cerrar sesión"
										sx={{ marginLeft: "8px" }}>
										<LogoutIcon />
									</IconButton>
								</motion.div>
							</>
						) : (
							<motion.div
								whileTap={{ scale: 0.92 }}
								whileHover={{ scale: 1.06 }}
								style={{ display: "inline-block" }}>
								<Button
									component={Link}
									to="/login"
									aria-label="Iniciar sesión"
									sx={{
										color: "#fff",
										fontWeight: "bold",
										fontSize: "1rem",
										borderRadius: "24px",
										padding: "6px 20px",
										background:
											"linear-gradient(90deg, #810000 60%, #b00 100%)",
										boxShadow: "0 2px 8px rgba(129,0,0,0.08)",
										border: "none",
										textTransform: "uppercase",
										"&:hover": {
											background:
												"linear-gradient(90deg, #b00 60%, #810000 100%)",
											boxShadow: "0 4px 12px rgba(129,0,0,0.15)",
										},
									}}>
									Iniciar sesión
								</Button>
							</motion.div>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</header>
	);
};

export default Header;
