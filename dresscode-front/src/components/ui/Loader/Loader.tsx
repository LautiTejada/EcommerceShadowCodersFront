import styles from "./Loader.module.css";
import { motion } from "framer-motion";

const Loader = () => (
	<motion.div
		className={styles.loaderBg}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}>
		<motion.div
			className={styles.loaderSpinner}
			animate={{ rotate: 360 }}
			transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
		/>
		<span className={styles.loaderText}>Cargando...</span>
	</motion.div>
);

export default Loader;
