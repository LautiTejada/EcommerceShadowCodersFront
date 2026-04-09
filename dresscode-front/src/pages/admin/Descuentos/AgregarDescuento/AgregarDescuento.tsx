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
