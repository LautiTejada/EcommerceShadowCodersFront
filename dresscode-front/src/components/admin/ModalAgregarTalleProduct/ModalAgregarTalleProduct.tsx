import { useEffect, useState } from "react";
import { validateForm, isRequired } from "../../../utils/validate";
import { sileo } from "sileo";
import styles from "./ModalAgregarTalleProduct.module.css";
import type { Producto } from "../../../types/Producto";
import { useProductoTalleStore } from "../../../store/talleProductoStore";
import { talleStore } from "../../../store/talleStore";
import type { Talle } from "../../../types/Talle";

interface ModalAgregarTalleProductProps {
	producto: Producto;
	onClose: () => void;
}

export const ModalAgregarTalleProduct = ({
	producto,
	onClose,
}: ModalAgregarTalleProductProps) => {
	const { createProductoTalle } = useProductoTalleStore();
	const { talles, obtenerTalles } = talleStore();

	const [cantidad, setCantidad] = useState<number>(0);
	const [talleSeleccionado, setTalleSeleccionado] = useState<Talle | null>(
		null,
	);

	useEffect(() => {
		obtenerTalles();
	}, []);

	const tallesDisponibles = talles.filter(
		(talle: Talle) =>
			talle.activo && !producto.talles?.some((pt) => pt.talle.id === talle.id),
	);

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const fields = {
			talle: talleSeleccionado?.id,
			cantidad,
		};
		const rules = {
			talle: [isRequired],
			cantidad: [isRequired, (v: any) => Number(v) > 0],
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
		await createProductoTalle(producto.id!, talleSeleccionado!.id!, cantidad);
		setErrors({});
		sileo.success({
			title: "Talle agregado",
			description: "El talle fue agregado correctamente.",
			type: "success",
		});
		onClose();
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h2 className={styles.title} id="agregar-talle-title">
					Agregar Talle
				</h2>
				<form
					onSubmit={handleSubmit}
					className={styles.form}
					role="form"
					aria-labelledby="agregar-talle-title">
					<label className={styles.label}>TALLE</label>
					<select
						className={styles.input}
						value={talleSeleccionado?.id || ""}
						onChange={(e) => {
							const selectedId = Number(e.target.value);
							const talle =
								tallesDisponibles.find((t) => t.id === selectedId) || null;
							setTalleSeleccionado(talle);
						}}
						required
						aria-invalid={!!errors.talle}
						aria-describedby={errors.talle ? "talle-error" : undefined}>
						<option value="">Seleccionar talle</option>
						{tallesDisponibles.map((talle) => (
							<option key={talle.id} value={talle.id}>
								{talle.tipoTalle}
							</option>
						))}
					</select>
					{errors.talle && (
						<div className={styles.error} id="talle-error" role="alert">
							{errors.talle}
						</div>
					)}

					<label className={styles.label}>CANTIDAD</label>
					<input
						type="number"
						className={styles.input}
						value={cantidad}
						onChange={(e) => setCantidad(Number(e.target.value))}
						min={1}
						required
						aria-invalid={!!errors.cantidad}
						aria-describedby={errors.cantidad ? "cantidad-error" : undefined}
					/>
					{errors.cantidad && (
						<div className={styles.error} id="cantidad-error" role="alert">
							{errors.cantidad}
						</div>
					)}

					<button type="submit" className={styles.button}>
						CREAR TALLE
					</button>
					<button type="button" className={styles.button} onClick={onClose}>
						CANCELAR
					</button>
				</form>
			</div>
		</div>
	);
};
