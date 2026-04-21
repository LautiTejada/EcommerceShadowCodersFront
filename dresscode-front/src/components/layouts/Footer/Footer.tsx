import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer} role="contentinfo">
			<div className={styles.inner}>
				{/* Columnas de links */}
				<div className={styles.columns}>
					<div className={styles.col}>
						<p className={styles.colTitle}>Tienda</p>
						<ul className={styles.colList}>
							<li>
								<Link to="/catalog">Todos los productos</Link>
							</li>
							<li>
								<Link to="/catalog/calzados">Calzados</Link>
							</li>
							<li>
								<Link to="/catalog/ropa">Ropa</Link>
							</li>
							<li>
								<Link to="/catalog/ofertas">Ofertas</Link>
							</li>
						</ul>
					</div>

					<div className={styles.col}>
						<p className={styles.colTitle}>Mi cuenta</p>
						<ul className={styles.colList}>
							<li>
								<Link to="/profile">Mi perfil</Link>
							</li>
							<li>
								<Link to="/cart">Carrito</Link>
							</li>
							<li>
								<Link to="/login">Iniciar sesión</Link>
							</li>
							<li>
								<Link to="/register">Registrarse</Link>
							</li>
						</ul>
					</div>

					<div className={styles.col}>
						<p className={styles.colTitle}>Ayuda</p>
						<ul className={styles.colList}>
							<li>
								<a href="#">Preguntas frecuentes</a>
							</li>
							<li>
								<a href="#">Envíos y devoluciones</a>
							</li>
							<li>
								<a href="#">Contacto</a>
							</li>
						</ul>
					</div>

					{/* Logo + redes */}
					<div className={`${styles.col} ${styles.colBrand}`}>
						<img
							src="/assets/logo-dresscode.png"
							alt="DRESSCODE"
							className={styles.logo}
							loading="lazy"
						/>
						<div className={styles.socials}>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram">
								<InstagramIcon />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook">
								<FacebookIcon />
							</a>
						</div>
					</div>
				</div>

				{/* Barra inferior */}
				<div className={styles.bottom}>
					<span>© 2025 DRESSCODE · SHADOWCODERS · MENDOZA, ARGENTINA</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
