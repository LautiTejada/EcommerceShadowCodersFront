import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useCartStore } from "../../../store/cartStore";
import { motion } from "framer-motion";
import { CategoryBar } from "../../ui/CategoryBar/CategoryBar";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [rol, setRol] = useState<string | null>(null);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { cart } = useCartStore();
	const { logout } = useAuth();
	const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

	useEffect(() => {
		setUsername(localStorage.getItem("username"));
		setRol(localStorage.getItem("rol"));
	}, [location]);

	useEffect(() => {
		if (searchOpen) {
			setTimeout(() => searchInputRef.current?.focus(), 50);
		}
	}, [searchOpen]);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const q = searchQuery.trim();
		if (!q) return;
		setSearchOpen(false);
		setSearchQuery("");
		navigate(`/catalog?q=${encodeURIComponent(q)}`);
	};

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
						{/* Búsqueda */}
						<form
							onSubmit={handleSearchSubmit}
							style={{ display: "flex", alignItems: "center", marginRight: 4 }}>
							{searchOpen && (
								<input
									ref={searchInputRef}
									type="search"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
									placeholder="Buscar productos..."
									aria-label="Buscar productos"
									style={{
										background: "rgba(255,255,255,0.1)",
										border: "1px solid rgba(255,255,255,0.3)",
										borderRadius: "20px 0 0 20px",
										color: "#fff",
										padding: "6px 14px",
										fontSize: "0.9rem",
										outline: "none",
										width: 200,
									}}
								/>
							)}
							<motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.06 }} style={{ display: "inline-block" }}>
								<IconButton
									color="inherit"
									type={searchOpen ? "submit" : "button"}
									onClick={() => !searchOpen && setSearchOpen(true)}
									aria-label="Buscar"
									style={{ borderRadius: searchOpen ? "0 20px 20px 0" : "50%" }}>
									<SearchIcon fontSize="medium" />
								</IconButton>
							</motion.div>
						</form>

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
