import React, { useState } from "react";
import styles from "../../../pages/admin/Productos/AdminProductos.module.css";
import type { Producto } from "../../../types/Producto";
import type { ProductoTalle } from "../../../types/ProductoTalle";
import type { Talle } from "../../../types/Talle";
import { talleStore } from "../../../store/talleStore";
import { useProductoTalleStore } from "../../../store/talleProductoStore";
import { useScrollLock } from "../../../hooks/useScrollLock";

interface StockModalProps {
	isOpen: boolean;
	producto: Producto | null;
	onClose: () => void;
	onSave: (talle: ProductoTalle, cantidad: number) => Promise<void>;
	onRefresh?: () => void;
}

export const StockModal: React.FC<StockModalProps> = ({
	isOpen,
	producto,
	onClose,
	onSave,
}) => {
	useScrollLock(isOpen && !!producto);
	const [selectedTalle, setSelectedTalle] = useState<ProductoTalle | null>(
		null,
	);
	const [cantidad, setCantidad] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// Para crear talle
	const [nuevoTalle, setNuevoTalle] = useState<string>("");
	const [cantidadNuevoTalle, setCantidadNuevoTalle] = useState<string>("");
	const [showNuevoTalle, setShowNuevoTalle] = useState(false);
	const { crearTalle, obtenerTalles } = talleStore();
	const { createProductoTalle } = useProductoTalleStore();

	React.useEffect(() => {
		setSelectedTalle(null);
		setCantidad("");
		setError(null);
		setNuevoTalle("");
		setCantidadNuevoTalle("");
		setShowNuevoTalle(false);
	}, [producto, isOpen]);

	if (!isOpen || !producto) return null;

	const handleSelectTalle = (t: ProductoTalle) => {
		setSelectedTalle(t);
		setCantidad(t.cantidad?.toString() ?? "");
		setError(null);
	};

	// Nuevo: crear y asignar talle
	const handleCrearTalleYAsignar = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!nuevoTalle.trim()) {
			setError("Ingresá el nombre del talle");
			return;
		}
		const cant = Number(cantidadNuevoTalle);
		if (isNaN(cant) || cant < 0) {
			setError("Ingresá una cantidad válida");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			// 1. Crear talle
			const talleObj: Talle = { tipoTalle: nuevoTalle.trim(), activo: true };
			await crearTalle(talleObj);
			await obtenerTalles();
			// Buscar el talle recién creado (por nombre)
			const tallesActualizados = talleStore.getState().talles;
			const talleCreado = tallesActualizados.find(
				(t) => t.tipoTalle.toLowerCase() === nuevoTalle.trim().toLowerCase(),
			);
			if (!talleCreado || !talleCreado.id)
				throw new Error("No se pudo crear el talle");
			if (!producto.id)
				throw new Error("Producto ID no disponible");
			// 2. Crear producto-talle con cantidad (esto crea la relación y asigna cantidad)
			await createProductoTalle(producto.id, talleCreado.id, cant);
			// 3. Refrescar productos y producto seleccionado antes de cerrar el modal
			if (typeof onRefresh === "function") {
				await onRefresh();
			}
			setNuevoTalle("");
			setCantidadNuevoTalle("");
			setError(null);
			onClose();
		} catch (err: any) {
			setError(err.message || "Error al crear y asignar talle");
		} finally {
			setLoading(false);
		}
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
				{/* Si no hay talles, mostrar solo el formulario para crear uno */}
				{!producto.talles || producto.talles.length === 0 ? (
					<form
						className={styles.form}
						onSubmit={handleCrearTalleYAsignar}
						noValidate>
						<div className={styles.fieldGroup}>
							<label className={styles.label}>Agregar un talle</label>
							<input
								className={styles.input}
								type="text"
								placeholder="Nombre del talle (ej: S, M, L, 38, 40)"
								value={nuevoTalle}
								onChange={(e) => setNuevoTalle(e.target.value)}
								disabled={loading}
								required
							/>
						</div>
						<div className={styles.stockInputBox}>
							<label className={styles.label}>Cantidad</label>
							<input
								className={styles.input}
								type="number"
								min={0}
								value={cantidadNuevoTalle}
								onChange={(e) => setCantidadNuevoTalle(e.target.value)}
								disabled={loading}
								required
							/>
						</div>
						{error && <div className={styles.errorMessage}>{error}</div>}
						<div className={styles.modalActions}>
							<button
								type="submit"
								className={styles.btnPrimary}
								disabled={loading || !nuevoTalle.trim() || !cantidadNuevoTalle}>
								{loading ? "Guardando..." : "Agregar talle"}
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
				) : (
					<>
						<form className={styles.form} onSubmit={handleSubmit} noValidate>
							<div className={styles.fieldGroup}>
								<label className={styles.label}>Seleccioná un talle</label>
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
						{/* Botón para mostrar el formulario de nuevo talle */}
						<div style={{ marginTop: 16 }}>
							<button
								type="button"
								className={styles.btnSecondary}
								onClick={() => setShowNuevoTalle((v) => !v)}
								style={{ width: "100%" }}>
								Añadir nuevo talle
							</button>
						</div>
						{showNuevoTalle && (
							<form
								className={styles.form}
								onSubmit={handleCrearTalleYAsignar}
								noValidate
								style={{ marginTop: 8 }}>
								<div className={styles.fieldGroup}>
									<label className={styles.label}>Nombre del talle</label>
									<input
										className={styles.input}
										type="text"
										placeholder="Ej: S, M, L, 38, 40"
										value={nuevoTalle}
										onChange={(e) => setNuevoTalle(e.target.value)}
										disabled={loading}
										required
									/>
								</div>
								<div className={styles.stockInputBox}>
									<label className={styles.label}>Cantidad</label>
									<input
										className={styles.input}
										type="number"
										min={0}
										value={cantidadNuevoTalle}
										onChange={(e) => setCantidadNuevoTalle(e.target.value)}
										disabled={loading}
										required
									/>
								</div>
								{error && <div className={styles.errorMessage}>{error}</div>}
								<div className={styles.modalActions}>
									<button
										type="submit"
										className={styles.btnPrimary}
										disabled={
											loading || !nuevoTalle.trim() || !cantidadNuevoTalle
										}>
										{loading ? "Guardando..." : "Agregar talle"}
									</button>
								</div>
							</form>
						)}
					</>
				)}
			</div>
		</div>
	);
};
