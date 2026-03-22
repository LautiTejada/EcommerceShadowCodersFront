import styles from "./ModalEditarDescuento.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { validateForm, isRequired } from "../../../utils/validate";
import { sileo } from "sileo";
import { useDescuentoStore } from "../../../store/descuentoStore";
import type { Descuento } from "../../../types/Descuento";

interface ModalEditarDescuentoProps {
	descuento: Descuento;
	onClose: () => void;
}

export const ModalEditarDescuento = ({
	descuento,
	onClose,
}: ModalEditarDescuentoProps) => {
	const { updateDescuento } = useDescuentoStore();

	const [porcentaje, setPorcentaje] = useState(descuento.porcentajeDescuento);
	const [fechaInicio, setFechaInicio] = useState(descuento.fechaInicio);
	const [fechaCierre, setFechaCierre] = useState(descuento.fechaCierre);

	const [errors, setErrors] = useState<Record<string, string>>({});
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const fields = {
			porcentaje: porcentaje,
			fechaInicio: fechaInicio,
			fechaCierre: fechaCierre,
		};
		const rules = {
			porcentaje: [isRequired, (v: any) => Number(v) > 0 && Number(v) <= 100],
			fechaInicio: [isRequired],
			fechaCierre: [isRequired],
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
		updateDescuento(descuento.id!, {
			...descuento,
			porcentajeDescuento: porcentaje,
			fechaInicio: fechaInicio,
			fechaCierre: fechaCierre,
		});
		setErrors({});
		sileo.success({
			title: "Descuento actualizado",
			description: "El descuento fue editado correctamente.",
			type: "success",
		});
		onClose();
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContainer}>
				<h2 className={styles.modalTitle}>Editar Descuento</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					<label className={styles.label}>PORCENTAJE DESCUENTO</label>
					<input
						type="number"
						value={porcentaje}
						onChange={(e) => setPorcentaje(parseInt(e.target.value))}
						className={styles.input}
						aria-invalid={!!errors.porcentaje}
						aria-describedby={
							errors.porcentaje ? "porcentaje-error" : undefined
						}
					/>
					{errors.porcentaje && (
						<div className={styles.error} id="porcentaje-error" role="alert">
							{errors.porcentaje}
						</div>
					)}

					<label className={styles.label}>FECHA INICIO</label>
					<input
						type="date"
						value={fechaInicio}
						onChange={(e) => setFechaInicio(e.target.value)}
						className={styles.input}
						aria-invalid={!!errors.fechaInicio}
						aria-describedby={
							errors.fechaInicio ? "fechaInicio-error" : undefined
						}
					/>
					{errors.fechaInicio && (
						<div className={styles.error} id="fechaInicio-error" role="alert">
							{errors.fechaInicio}
						</div>
					)}

					<label className={styles.label}>FECHA CIERRE</label>
					<input
						type="date"
						value={fechaCierre}
						onChange={(e) => setFechaCierre(e.target.value)}
						className={styles.input}
						aria-invalid={!!errors.fechaCierre}
						aria-describedby={
							errors.fechaCierre ? "fechaCierre-error" : undefined
						}
					/>
					{errors.fechaCierre && (
						<div className={styles.error} id="fechaCierre-error" role="alert">
							{errors.fechaCierre}
						</div>
					)}

					<div className={styles.botones}>
						<button className={styles.botonGuardar} onClick={handleSubmit}>
							EDITAR DESCUENTO
						</button>
						<button className={styles.botonCancelar} onClick={onClose}>
							CANCELAR
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
