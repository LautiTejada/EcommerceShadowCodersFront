import React, { useState } from "react";
import styles from "../../AgregarProducto/AgregarProducto.module.css";
import { useDescuentoStore } from "../../../../store/descuentoStore";

export const AgregarDescuento = () => {
	const { addDescuento } = useDescuentoStore();
	const [form, setForm] = useState({
		fechaInicio: "",
		fechaCierre: "",
		porcentajeDescuento: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const validate = (): string | null => {
		if (!form.fechaInicio) return "La fecha de inicio es requerida";
		if (!form.fechaCierre) return "La fecha de cierre es requerida";
		if (form.fechaCierre <= form.fechaInicio)
			return "La fecha de cierre debe ser posterior a la de inicio";
		const pct = Number(form.porcentajeDescuento);
		if (!pct || pct <= 0 || pct > 100)
			return "El porcentaje debe estar entre 1 y 100";
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await addDescuento({
				activo: true,
				fechaInicio: form.fechaInicio,
				fechaCierre: form.fechaCierre,
				porcentajeDescuento: Number(form.porcentajeDescuento),
				productos: [],
			});
			setSuccess(true);
			setForm({ fechaInicio: "", fechaCierre: "", porcentajeDescuento: "" });
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Error al crear el descuento",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Agregar Descuento</h1>
				<p>Creá un nuevo descuento con rango de fechas y porcentaje</p>
			</div>

			<form className={styles.form} onSubmit={handleSubmit} noValidate>
				{error && <div className={styles.errorMsg}>{error}</div>}
				{success && (
					<div className={styles.successMsg}>
						¡Descuento creado exitosamente!
					</div>
				)}

				<div className={styles.formGrid}>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>
							Fecha inicio <span className={styles.required}>*</span>
						</label>
						<input
							className={styles.input}
							type="date"
							value={form.fechaInicio}
							onChange={(e) =>
								setForm((p) => ({ ...p, fechaInicio: e.target.value }))
							}
						/>
					</div>

					<div className={styles.fieldGroup}>
						<label className={styles.label}>
							Fecha cierre <span className={styles.required}>*</span>
						</label>
						<input
							className={styles.input}
							type="date"
							value={form.fechaCierre}
							onChange={(e) =>
								setForm((p) => ({ ...p, fechaCierre: e.target.value }))
							}
						/>
					</div>

					<div className={styles.fieldGroup}>
						<label className={styles.label}>
							Porcentaje (%) <span className={styles.required}>*</span>
						</label>
						<input
							className={styles.input}
							type="number"
							min="1"
							max="100"
							value={form.porcentajeDescuento}
							onChange={(e) =>
								setForm((p) => ({
									...p,
									porcentajeDescuento: e.target.value,
								}))
							}
							placeholder="Ej: 20"
						/>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						type="submit"
						className={styles.btnPrimary}
						disabled={loading}>
						{loading ? "Guardando..." : "Crear descuento"}
					</button>
				</div>
			</form>
		</div>
	);
};


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
