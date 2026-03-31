import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCartStore } from "../../../store/cartStore";
import { motion } from "framer-motion";

const Header = () => {
	const [username, setUsername] = useState<string | null>(null);
	const location = useLocation();
	const { cart } = useCartStore();
	const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

	useEffect(() => {
		setUsername(localStorage.getItem("username"));
	}, [location]);

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
					<nav className={styles.navMenu} aria-label="Navegación principal">
						<motion.div
							whileTap={{ scale: 0.96 }}
							whileHover={{ scale: 1.04 }}
							style={{ display: "inline-block" }}>
							<Button
								color="inherit"
								component={Link}
								to="/catalog"
								className={
									location.pathname.startsWith("/catalog")
										? styles.activeLink
										: ""
								}
								aria-current={
									location.pathname.startsWith("/catalog") ? "page" : undefined
								}>
								Catálogo
							</Button>
						</motion.div>
						<motion.div
							whileTap={{ scale: 0.96 }}
							whileHover={{ scale: 1.04 }}
							style={{ display: "inline-block" }}>
							<Button
								color="inherit"
								component={Link}
								to="/ofertas"
								className={
									location.pathname === "/ofertas" ? styles.activeLink : ""
								}
								aria-current={
									location.pathname === "/ofertas" ? "page" : undefined
								}>
								Ofertas
							</Button>
						</motion.div>
					</nav>
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
											bgcolor: "#810000",
											fontSize: 16,
										}}>
										{username[0]?.toUpperCase()}
									</Avatar>
								</IconButton>
							</motion.div>
						) : (
							<motion.div
								whileTap={{ scale: 0.92 }}
								whileHover={{ scale: 1.06 }}
								style={{ display: "inline-block" }}>
								<Button
									color="inherit"
									component={Link}
									to="/login"
									className={styles.loginButton}
									aria-label="Iniciar sesión o registrarse">
									LOGIN / REGISTER
									<AccountCircleIcon />
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
