import React, { useState } from "react";
import styles from "../../../pages/admin/Productos/AdminProductos.module.css";
import type { Producto } from "../../../types/Producto";
import type { ProductoTalle } from "../../../types/ProductoTalle";

interface StockModalProps {
	isOpen: boolean;
	producto: Producto | null;
	onClose: () => void;
	onSave: (talle: ProductoTalle, cantidad: number) => Promise<void>;
}

export const StockModal: React.FC<StockModalProps> = ({
	isOpen,
	producto,
	onClose,
	onSave,
}) => {
	const [selectedTalle, setSelectedTalle] = useState<ProductoTalle | null>(
		null,
	);
	const [cantidad, setCantidad] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	React.useEffect(() => {
		setSelectedTalle(null);
		setCantidad("");
		setError(null);
	}, [producto, isOpen]);

	if (!isOpen || !producto) return null;

	const handleSelectTalle = (t: ProductoTalle) => {
		setSelectedTalle(t);
		setCantidad(t.cantidad?.toString() ?? "");
		setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedTalle) {
			setError("Seleccioná un talle");
			return;
		}
		const cant = Number(cantidad);
		if (isNaN(cant) || cant < 0) {
			setError("Ingresá una cantidad válida");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await onSave(selectedTalle, cant);
			onClose();
		} catch (err: any) {
			setError(err.message || "Error al guardar");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.editModal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.editModalHeader}>
					<div>
						<p className={styles.editModalTitle}>{producto.nombre}</p>
						<p className={styles.editModalSubtitle}>
							{producto.categoria?.nombreCategoria
								? `${producto.categoria.nombreCategoria} · `
								: ""}
							{producto.talles?.length ?? 0} talles registrados · ID #
							{producto.id}
						</p>
					</div>
					<button
						className={styles.btnCancel}
						onClick={onClose}
						disabled={loading}>
						✕
					</button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit} noValidate>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Seleccioná un talle</label>
						{!producto.talles || producto.talles.length === 0 ? (
							<div className={styles.listEmpty}>
								<span>Este producto no tiene talles registrados</span>
							</div>
						) : (
							<div className={styles.talleGrid}>
								{producto.talles.map((t) => (
									<div
										key={t.id}
										className={
											selectedTalle?.id === t.id
												? styles.talleCardSelected
												: styles.talleCard
										}
										onClick={() => handleSelectTalle(t)}>
										<span className={styles.talleCardName}>
											{t.talle.tipoTalle}
										</span>
										<span className={styles.badge}>{t.cantidad} uds.</span>
									</div>
								))}
							</div>
						)}
					</div>
					{selectedTalle && (
						<div className={styles.stockInputBox}>
							<label className={styles.label}>Cantidad</label>
							<input
								className={styles.input}
								type="number"
								min={0}
								value={cantidad}
								onChange={(e) => setCantidad(e.target.value)}
								disabled={loading}
								required
							/>
						</div>
					)}
					{error && <div className={styles.errorMessage}>{error}</div>}
					<div className={styles.modalActions}>
						<button
							type="submit"
							className={styles.btnPrimary}
							disabled={loading || !selectedTalle}>
							{loading ? "Guardando..." : "Guardar"}
						</button>
						<button
							type="button"
							className={styles.btnCancel}
							onClick={onClose}
							disabled={loading}>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
