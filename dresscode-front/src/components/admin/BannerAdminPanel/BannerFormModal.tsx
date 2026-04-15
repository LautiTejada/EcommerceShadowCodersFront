import { useEffect, useState } from "react";
import type { Banner, CreateBannerRequest } from "../../../types/Banner";
import type { MarcaItem } from "../../../types/MarcaItem";
import { getBannerImageUrl } from "../../../utils/bannerUtils";
import styles from "./BannerAdminPanel.module.css";

interface BannerFormModalProps {
	isOpen: boolean;
	isEditing: boolean;
	marcas: MarcaItem[];
	cargandoMarcas: boolean;
	cargando: boolean;
	uploadingImage: boolean;
	onClose: () => void;
	onSave: (data: CreateBannerRequest, file: File | null) => Promise<void>;
	initialData?: Banner;
}

interface FormState {
	titulo: string;
	imagenNombre: string;
	marcaId: number | "";
	orden: number;
	activo: boolean;
}

const INITIAL_FORM_STATE: FormState = {
	titulo: "",
	imagenNombre: "",
	marcaId: "",
	orden: 1,
	activo: true,
};

export const BannerFormModal = ({
	isOpen,
	isEditing,
	marcas,
	cargandoMarcas,
	cargando,
	uploadingImage,
	onClose,
	onSave,
	initialData,
}: BannerFormModalProps) => {
	const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
	const [formError, setFormError] = useState("");
	const [imagenPreview, setImagenPreview] = useState<string>("");
	const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
		null,
	);

	// Inicializar formulario cuando se abre con datos existentes
	useEffect(() => {
		if (isOpen && initialData) {
			setFormData({
				titulo: initialData.titulo,
				imagenNombre: initialData.imagenNombre,
				marcaId: initialData.marcaId,
				orden: initialData.orden,
				activo: initialData.activo,
			});
			setImagenPreview(getBannerImageUrl(initialData.imagenNombre));
		} else if (isOpen) {
			setFormData(INITIAL_FORM_STATE);
			setImagenPreview("");
		}
	}, [isOpen, initialData]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value, type } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox"
					? (e.target as HTMLInputElement).checked
					: name === "marcaId"
						? value === ""
							? ""
							: Number(value)
						: type === "number"
							? Number(value)
							: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
		if (!allowedTypes.includes(file.type)) {
			setFormError("Solo se permiten archivos JPG, PNG o WebP");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			setFormError("El archivo no puede ser mayor a 5MB");
			return;
		}

		setArchivoSeleccionado(file);
		setFormError("");

		const reader = new FileReader();
		reader.onload = (e) => {
			setImagenPreview(e.target?.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleClose = () => {
		setFormData(INITIAL_FORM_STATE);
		setFormError("");
		setImagenPreview("");
		setArchivoSeleccionado(null);
		onClose();
	};

	const handleSubmit = async () => {
		if (!formData.titulo.trim()) {
			setFormError("El título es requerido");
			return;
		}
		if (!formData.imagenNombre.trim() && !archivoSeleccionado) {
			setFormError("La imagen es requerida");
			return;
		}
		if (formData.marcaId === "" || formData.marcaId === 0) {
			setFormError("Debes seleccionar una marca");
			return;
		}

		setFormError("");

		try {
			const bannerData: CreateBannerRequest = {
				titulo: formData.titulo,
				imagenNombre: formData.imagenNombre,
				marcaId: Number(formData.marcaId),
				orden: formData.orden,
				activo: formData.activo,
			};

			await onSave(bannerData, archivoSeleccionado);
			handleClose();
		} catch (err: any) {
			setFormError(err.message || "Error al guardar el banner");
		}
	};

	if (!isOpen) return null;

	return (
		<div className={styles.modal} onClick={handleClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalHeader}>
					<h3>{isEditing ? "Editar Banner" : "Crear Banner"}</h3>
					<button className={styles.closeButton} onClick={handleClose}>
						✕
					</button>
				</div>

				{formError && <div className={styles.errorMessage}>{formError}</div>}

				<div className={styles.formContent}>
					<div className={styles.formGroup}>
						<label htmlFor="titulo">Título *</label>
						<input
							id="titulo"
							type="text"
							name="titulo"
							value={formData.titulo}
							onChange={handleInputChange}
							placeholder="Ej: Colección de Verano"
							maxLength={100}
							disabled={cargando || uploadingImage}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="marcaId">
							Marca * {marcas.length > 0 && `(${marcas.length} disponibles)`}
						</label>
						<select
							id="marcaId"
							name="marcaId"
							value={String(formData.marcaId)}
							onChange={handleInputChange}
							disabled={cargando || uploadingImage || cargandoMarcas}>
							<option value="">-- Seleccionar marca --</option>
							{marcas.map((marca) => (
								<option key={marca.id} value={String(marca.id)}>
									{marca.nombreMarca}
								</option>
							))}
						</select>
						{cargandoMarcas && (
							<small style={{ color: "#666" }}>Cargando marcas...</small>
						)}
						{marcas.length === 0 && !cargandoMarcas && (
							<small style={{ color: "#d32f2f" }}>
								No hay marcas disponibles
							</small>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="imagen">
							Imagen del Banner *{!isEditing && " (Obligatorio para crear)"}
							{isEditing && " (Opcional, dejar en blanco para mantener)"}
						</label>
						<div className={styles.imageUploadContainer}>
							<input
								id="imagen"
								type="file"
								accept="image/jpeg,image/png,image/webp"
								onChange={handleFileChange}
								disabled={cargando || uploadingImage}
								className={styles.fileInput}
							/>
							<small
								style={{ color: "#666", marginTop: "8px", display: "block" }}>
								<strong>📋 Especificaciones:</strong>
								<br />
								• Dimensión recomendada: 1600 x 600 px
								<br />
								• Dimensión mínima: 1200 x 400 px
								<br />
								• Formatos: JPG, PNG, WebP
								<br />• Tamaño máximo: 5 MB
							</small>
							{imagenPreview && (
								<div className={styles.previewContainer}>
									<p style={{ marginTop: "12px", marginBottom: "8px" }}>
										Vista previa:
									</p>
									<img
										src={imagenPreview}
										alt="Preview"
										className={styles.previewImage}
									/>
								</div>
							)}
						</div>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="orden">Orden (posición en carrusel)</label>
						<input
							id="orden"
							type="number"
							name="orden"
							value={formData.orden || 0}
							onChange={handleInputChange}
							min="0"
							max="99"
							disabled={cargando || uploadingImage}
						/>
						<small
							style={{ color: "#666", marginTop: "4px", display: "block" }}>
							1 = Primero, 2 = Segundo, etc.
						</small>
					</div>

					<div
						className={styles.formGroup}
						style={{ display: "flex", alignItems: "center" }}>
						<input
							id="activo"
							type="checkbox"
							name="activo"
							checked={formData.activo}
							onChange={handleInputChange}
							disabled={cargando || uploadingImage}
						/>
						<label
							htmlFor="activo"
							style={{ marginLeft: "8px", marginBottom: "0" }}>
							Activo
						</label>
					</div>
				</div>

				<div className={styles.modalActions}>
					<button
						className={styles.btnCancel}
						onClick={handleClose}
						disabled={cargando || uploadingImage}>
						Cancelar
					</button>
					<button
						className={styles.btnSave}
						onClick={handleSubmit}
						disabled={cargando || uploadingImage}>
						{uploadingImage
							? "Subiendo imagen..."
							: cargando
								? "Guardando..."
								: isEditing
									? "Actualizar"
									: "Crear"}
					</button>
				</div>
			</div>
		</div>
	);
};
