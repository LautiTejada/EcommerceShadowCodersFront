import styles from "./Loader.module.css";

const Loader = () => (
	<div className={styles.loaderBg}>
		<div className={styles.loaderSpinner}></div>
		<span className={styles.loaderText}>Cargando...</span>
	</div>
);

export default Loader;
