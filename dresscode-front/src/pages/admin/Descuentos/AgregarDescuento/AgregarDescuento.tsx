import styles from "./AgregarDescuento.module.css";
import { useState } from "react";

import type { Descuento } from "../../../../types/Descuento";

import { Helmet } from "react-helmet-async";

export const AgregarDescuento = () => {
	const [descuento, setDescuento] = useState<Descuento>({
		activo: false,
		fechaInicio: "",
		fechaCierre: "",
		porcentajeDescuento: 0,
		productos: [],
	});
	const [errors] = useState<Record<string, string>>({});

	const handleAddDiscount = (e: React.FormEvent) => {
		e.preventDefault();
		// Validación y lógica aquí
	};

	const handleInput = (field: string, value: string) => {
		setDescuento({ ...descuento, [field]: value });
	};

	return (
		<>
			<Helmet>
				<title>Agregar Descuento | Admin | DressCode</title>
				<meta
					name="description"
					content="Agrega nuevos descuentos y promociones en DressCode desde el panel de administración."
				/>
				<meta
					property="og:title"
					content="Agregar Descuento | Admin | DressCode"
				/>
				<meta
					property="og:description"
					content="Agrega nuevos descuentos y promociones en DressCode desde el panel de administración."
				/>
			</Helmet>
			<main className={styles.mainContent}>
				<form
					className={styles.form}
					onSubmit={handleAddDiscount}
					role="form"
					aria-labelledby="agregar-descuento-title">
					<h2 id="agregar-descuento-title" style={{ marginBottom: 16 }}>
						Agregar descuento
					</h2>
					<div className={styles.formRow}>
						<div className={styles.formGroup}>
							<label className={styles.label}>FECHA INICIO</label>
							<div className={styles.inputIcon}>
								<input
									className={styles.input}
									type="date"
									value={descuento.fechaInicio}
									onChange={(e) => handleInput("fechaInicio", e.target.value)}
									aria-invalid={!!errors.fechaInicio}
									aria-describedby={
										errors.fechaInicio ? "fechaInicio-error" : undefined
									}
								/>
								{errors.fechaInicio && (
									<div className={styles.error} id="fechaInicio-error">
										{errors.fechaInicio}
									</div>
								)}
							</div>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>FECHA CIERRE</label>
							<div className={styles.inputIcon}>
								<input
									className={styles.input}
									type="date"
									value={descuento.fechaCierre}
									onChange={(e) => handleInput("fechaCierre", e.target.value)}
									aria-invalid={!!errors.fechaCierre}
									aria-describedby={
										errors.fechaCierre ? "fechaCierre-error" : undefined
									}
								/>
								{errors.fechaCierre && (
									<div
										className={styles.error}
										id="fechaCierre-error"
										role="alert">
										{errors.fechaCierre}
									</div>
								)}
							</div>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>PORCENTAJE</label>
							<div className={styles.inputIcon}>
								<input
									className={styles.input}
									type="number"
									min="0"
									max="100"
									value={descuento.porcentajeDescuento}
									onChange={(e) =>
										handleInput("porcentajeDescuento", e.target.value)
									}
									placeholder="%"
									aria-invalid={!!errors.porcentajeDescuento}
									aria-describedby={
										errors.porcentajeDescuento
											? "porcentajeDescuento-error"
											: undefined
									}
								/>
								{errors.porcentajeDescuento && (
									<div
										className={styles.error}
										id="porcentajeDescuento-error"
										role="alert">
										{errors.porcentajeDescuento}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className={styles.formRow}>
						<button className={styles.addButton} type="submit">
							AGREGAR DESCUENTO
						</button>
					</div>
				</form>
			</main>
		</>
	);
};
