import styles from "./AgregarDescuento.module.css";
import { useState } from "react";
import { validateForm, isRequired } from "../../../../utils/validate";
import { sileo } from "sileo";
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin";
import type { Descuento } from "../../../../types/Descuento";
import { useDescuentoStore } from "../../../../store/descuentoStore";

export const AgregarDescuento = () => {
	const [descuento, setDescuento] = useState<Descuento>({
		activo: false,
		fechaInicio: "",
		fechaCierre: "",
		porcentajeDescuento: 0,
		productos: [],
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const { addDescuento } = useDescuentoStore();

	const handleAddDiscount = (e: React.FormEvent) => {
		e.preventDefault();
		// Validación centralizada
		const fields = {
			fechaInicio: descuento.fechaInicio,
			fechaCierre: descuento.fechaCierre,
			porcentajeDescuento: descuento.porcentajeDescuento,
		};
		const rules = {
			fechaInicio: [isRequired],
			fechaCierre: [isRequired],
			porcentajeDescuento: [
				isRequired,
				(v: any) => Number(v) > 0 && Number(v) <= 100,
			],
		};
		const validationErrors = validateForm(fields, rules);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) {
			sileo.error({
				title: "Error",
				description: "Completa todos los campos obligatorios.",
				type: "error",
			});
			return;
		}
		const nuevoDecuento = {
			...descuento,
		};
		addDescuento(nuevoDecuento);
		setDescuento({
			activo: false,
			fechaInicio: "",
			fechaCierre: "",
			porcentajeDescuento: 0,
			productos: [],
		});
		setErrors({});
		sileo.success({
			title: "Descuento agregado",
			description: "El descuento fue creado correctamente.",
			type: "success",
		});
	};

	const handleInput = (field: string, value: string) => {
		setDescuento({ ...descuento, [field]: value });
	};

	return (
		<div className={styles.container}>
			<MenuAdmin />
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
						{/* Fecha Inicio */}
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
									<div
										className={styles.error}
										id="fechaInicio-error"
										role="alert">
										{errors.fechaInicio}
									</div>
								)}
							</div>
						</div>

						{/* Fecha Cierre */}
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

						{/* Porcentaje */}
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
		</div>
	);
};
