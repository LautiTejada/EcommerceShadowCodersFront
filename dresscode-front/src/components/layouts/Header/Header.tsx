import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Avatar, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartIcon } from "../../ui/CartIcon/CartIcon";
import { useCartStore } from "../../../store/cartStore";
import { motion } from "framer-motion";

const Header = () => {
	const [username, setUsername] = useState<string | null>(null);
	const location = useLocation();
	const { cart } = useCartStore();
	const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

	useEffect(() => {
		setUsername(localStorage.getItem("username"));
	}, [location]); // <-- se actualiza cada vez que cambia la ruta

	return (
		<AppBar position="sticky" elevation={2} className={styles.stickyHeader}>
			<Toolbar className={styles.toolbar}>
				<div className={styles.logoContainer}>
					<Button
						color="inherit"
						component={Link}
						to="/"
						className={styles.logoButton}>
						<img
							src="/public/assets/logo-dresscode.png"
							alt="DressCode"
							className={styles.logoImg}
							loading="lazy"
						/>
					</Button>
				</div>
				<nav className={styles.navMenu}>
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
							className={styles.cartButton}>
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
								className={styles.accountButton}>
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
								className={styles.loginButton}>
								LOGIN / REGISTER
								<AccountCircleIcon />
							</Button>
						</motion.div>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
