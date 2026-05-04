import { useState } from "react";
import type { Tipo } from "../../../types/Tipo";
import styles from "./ModalEditarTipo.module.css";
import Swal from "sweetalert2";
import { validateForm, isRequired } from "../../../utils/validate";
import { sileo } from "sileo";
import { tipoStore } from "../../../store/tipoStore";
import { useScrollLock } from "../../../hooks/useScrollLock";

interface ModalEditarTipoProps {
	tipo: Tipo;
	onClose: () => void;
}

export const ModalEditarTipo = ({ tipo, onClose }: ModalEditarTipoProps) => {
	useScrollLock();
	const { actualizarTipo } = tipoStore();

	const [nuevoTipo, setNuevoTipo] = useState<Tipo>({ ...tipo });

	const [errors, setErrors] = useState<Record<string, string>>({});
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const fields = {
			nombre: nuevoTipo.nombre,
		};
		const rules = {
			nombre: [isRequired],
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
		Swal.fire({
			title: `¿Estás seguro de cambiar el nombre de este tipo a "${nuevoTipo.nombre}"?`,
			text: `Tipo: ${tipo.nombre}, cambiará a: ${nuevoTipo.nombre}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#7f5af0",
			cancelButtonColor: "#d33",
			confirmButtonText: `Cambiar`,
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				actualizarTipo(tipo.id!, {
					...tipo,
					nombre: nuevoTipo.nombre,
				});
				Swal.fire({
					title: `Actualizado`,
					text: `El nombre se ha cambiado correctamente a ${nuevoTipo.nombre}.`,
					icon: "success",
					confirmButtonColor: "#7f5af0",
				});
			}
		});
		onClose();
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContainer}>
				<h2 className={styles.modalTitle}>EDITAR TIPO</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					<label className={styles.label}>NOMBRE</label>
					<input
						type="text"
						value={nuevoTipo.nombre}
						onChange={(e) =>
							setNuevoTipo({ ...nuevoTipo, nombre: e.target.value })
						}
						className={styles.input}
						placeholder="..."
						aria-invalid={!!errors.nombre}
						aria-describedby={errors.nombre ? "nombre-error" : undefined}
					/>
					{errors.nombre && (
						<div className={styles.error} id="nombre-error" role="alert">
							{errors.nombre}
						</div>
					)}
					<div className={styles.botones}>
						<button type="submit" className={styles.botonGuardar}>
							EDITAR TIPO
						</button>
						<button
							type="button"
							className={styles.botonCancelar}
							onClick={onClose}>
							CANCELAR
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
