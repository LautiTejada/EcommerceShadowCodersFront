import { AppBar, Toolbar, Button, Box } from "@mui/material";
import styles from "./CategoryBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const CategoryBar = () => {
	const navigate = useNavigate();
	return (
		<AppBar
			className={styles.containerCategories}
			position="static"
			sx={{ backgroundColor: "#fff", boxShadow: "none" }}>
			<Toolbar className={styles.toolbar}>
				<Box className={styles.containerButtons}>
					<Link to="/catalog" style={{ textDecoration: "none" }}>
						<motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}>
							<Button className={styles.buttons}>CATALOGO</Button>
						</motion.div>
					</Link>
					<motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}>
						<Button
							className={styles.buttons}
							onClick={() => navigate("/catalog/ofertas")}>
							OFERTAS
						</Button>
					</motion.div>
					<motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}>
						<Button
							className={styles.buttons}
							onClick={() => navigate("/catalog/calzados")}>
							CALZADO
						</Button>
					</motion.div>
					<motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}>
						<Button
							className={styles.buttons}
							onClick={() => navigate("/catalog/ropa")}>
							ROPA
						</Button>
					</motion.div>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
