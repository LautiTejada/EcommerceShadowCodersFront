import styles from "./Loader.module.css";
import { motion } from "framer-motion";

const Loader = () => (
	<motion.div
		className={styles.loaderBg}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.3 }}>
		<div className={styles.loaderInner}>
			<motion.span
				className={styles.loaderWordmark}
				initial={{ opacity: 0.3 }}
				animate={{ opacity: [0.3, 1, 0.3] }}
				transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
				DRESSCODE
			</motion.span>
			<div className={styles.loaderTrack}>
				<motion.div
					className={styles.loaderBar}
					initial={{ x: "-100%" }}
					animate={{ x: "100%" }}
					transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
				/>
			</div>
		</div>
	</motion.div>
);

export default Loader;
