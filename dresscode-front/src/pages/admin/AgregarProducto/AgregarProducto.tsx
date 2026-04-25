import React, { useEffect, useRef, useState } from "react";
import styles from "./AgregarProducto.module.css";
import { useCategoriaStore } from "../../../store/categoriaStore";
import { useProductoStore } from "../../../store/productoStore";
import { useMarcaStore } from "../../../store/marcaStore";
import { useColorStore } from "../../../store/colorStore";
import { subirImagenProducto } from "../../../http/imagenProducto";

interface FormState {
	nombre: string;
	precio: string;
	descripcion: string;
	categoriaId: string;
	marcaId: string;
	colorId: string;
}

const initialForm: FormState = {
	nombre: "",
	precio: "",
	descripcion: "",
	categoriaId: "",
	marcaId: "",
	colorId: "",
};

const AgregarProducto: React.FC = () => {
	const { categoriasActivas, fetchCategoriasActivas } = useCategoriaStore();
	const { agregarProductoConCategoria } = useProductoStore();
	const { marcasActivas, fetchMarcasActivas } = useMarcaStore();
	const { coloresActivos, fetchColoresActivos } = useColorStore();

	const [form, setForm] = useState<FormState>(initialForm);
	const [imagenes, setImagenes] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		fetchCategoriasActivas();
		fetchMarcasActivas();
		fetchColoresActivos();
	}, [fetchCategoriasActivas, fetchMarcasActivas, fetchColoresActivos]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setError(null);
		setSuccess(false);
	};

	const handleImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const nuevas = Array.from(e.target.files);
		setImagenes((prev) => [...prev, ...nuevas]);
		e.target.value = "";
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const archivos = Array.from(e.dataTransfer.files).filter((f) =>
			f.type.startsWith("image/"),
		);
		setImagenes((prev) => [...prev, ...archivos]);
	};

	const eliminarImagen = (idx: number) => {
		setImagenes((prev) => prev.filter((_, i) => i !== idx));
	};

	const validate = (): string | null => {
		if (!form.nombre.trim()) return "El nombre es requerido";
		if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
			return "El precio debe ser un número mayor a 0";
		if (!form.descripcion.trim()) return "La descripción es requerida";
		if (!form.marcaId) return "La marca es requerida";
		if (!form.colorId) return "El color es requerido";
		if (!form.categoriaId) return "La categoría es requerida";
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			const nuevoProducto = await agregarProductoConCategoria(
				{
					nombre: form.nombre.trim(),
					precio: Number(form.precio),
					descripcion: form.descripcion.trim(),
					color: coloresActivos.find((c) => c.id === Number(form.colorId))
						?.nombreColor,
					marca: marcasActivas.find((m) => m.id === Number(form.marcaId))
						?.nombreMarca as
						| import("../../../types/enums/Marca").Marca
						| undefined,
				},
				Number(form.categoriaId),
			);

			// Subir imágenes si hay alguna
			if (imagenes.length > 0 && nuevoProducto?.id) {
				await Promise.all(
					imagenes.map((img, idx) =>
						subirImagenProducto(nuevoProducto.id!, img, idx === 0),
					),
				);
			}

			setSuccess(true);
			setForm(initialForm);
			setImagenes([]);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Error al crear el producto",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Agregar Producto</h1>
				<p>Completá los datos para crear un nuevo producto</p>
			</div>

			<form className={styles.form} onSubmit={handleSubmit} noValidate>
				{error && <div className={styles.errorMsg}>{error}</div>}
				{success && (
					<div className={styles.successMsg}>
						¡Producto creado exitosamente!
					</div>
				)}

				<div className={styles.formGrid}>
					{/* Nombre */}
					<div className={styles.fieldGroup}>
						<label htmlFor="nombre" className={styles.label}>
							Nombre <span className={styles.required}>*</span>
						</label>
						<input
							id="nombre"
							name="nombre"
							type="text"
							className={styles.input}
							value={form.nombre}
							onChange={handleChange}
							placeholder="Ej: Remera Premium Negro"
							maxLength={100}
						/>
					</div>

					{/* Precio */}
					<div className={styles.fieldGroup}>
						<label htmlFor="precio" className={styles.label}>
							Precio <span className={styles.required}>*</span>
						</label>
						<div className={styles.inputPrefix}>
							<span className={styles.prefix}>$</span>
							<input
								id="precio"
								name="precio"
								type="number"
								className={styles.input}
								value={form.precio}
								onChange={handleChange}
								placeholder="0"
								min="0"
								step="0.01"
							/>
						</div>
					</div>

					{/* Marca */}
					<div className={styles.fieldGroup}>
						<label htmlFor="marcaId" className={styles.label}>
							Marca <span className={styles.required}>*</span>
						</label>
						<select
							id="marcaId"
							name="marcaId"
							className={styles.select}
							value={form.marcaId}
							onChange={handleChange}>
							<option value="">Seleccionar marca</option>
							{marcasActivas.map((m) => (
								<option key={m.id} value={m.id}>
									{m.nombreMarca}
								</option>
							))}
						</select>
					</div>

					{/* Color */}
					<div className={styles.fieldGroup}>
						<label htmlFor="colorId" className={styles.label}>
							Color <span className={styles.required}>*</span>
						</label>
						<select
							id="colorId"
							name="colorId"
							className={styles.select}
							value={form.colorId}
							onChange={handleChange}>
							<option value="">Seleccionar color</option>
							{coloresActivos.map((c) => (
								<option key={c.id} value={c.id}>
									{c.nombreColor}
								</option>
							))}
						</select>
					</div>

					{/* Categoría */}
					<div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
						<label htmlFor="categoriaId" className={styles.label}>
							Categoría <span className={styles.required}>*</span>
						</label>
						<select
							id="categoriaId"
							name="categoriaId"
							className={styles.select}
							value={form.categoriaId}
							onChange={handleChange}>
							<option value="">Seleccionar categoría</option>
							{categoriasActivas.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.nombreCategoria}
								</option>
							))}
						</select>
					</div>

					{/* Imágenes */}
					<div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
						<label className={styles.label}>Imágenes</label>
						<div
							className={styles.dropzone}
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
							onClick={() => fileInputRef.current?.click()}>
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								multiple
								style={{ display: "none" }}
								onChange={handleImagenes}
							/>
							{imagenes.length === 0 ? (
								<span className={styles.dropzoneText}>
									Arrastrá imágenes aquí o hacé clic para seleccionar
								</span>
							) : (
								<div className={styles.imagePreviewGrid}>
									{imagenes.map((img, idx) => (
										<div key={idx} className={styles.imagePreviewItem}>
											<img
												src={URL.createObjectURL(img)}
												alt={img.name}
												className={styles.imagePreview}
											/>
											{idx === 0 && (
												<span className={styles.badgePrincipal}>Principal</span>
											)}
											<button
												type="button"
												className={styles.removeImage}
												onClick={(e) => {
													e.stopPropagation();
													eliminarImagen(idx);
												}}>
												✕
											</button>
										</div>
									))}
									<div
										className={styles.addMore}
										onClick={(e) => {
											e.stopPropagation();
											fileInputRef.current?.click();
										}}>
										+
									</div>
								</div>
							)}
						</div>
						{imagenes.length > 0 && (
							<span className={styles.charCount}>
								{imagenes.length} imagen{imagenes.length !== 1 ? "es" : ""}{" "}
								seleccionada{imagenes.length !== 1 ? "s" : ""} — la primera será
								la principal
							</span>
						)}
					</div>

					{/* Descripción */}
					<div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
						<label htmlFor="descripcion" className={styles.label}>
							Descripción <span className={styles.required}>*</span>
						</label>
						<textarea
							id="descripcion"
							name="descripcion"
							className={styles.textarea}
							value={form.descripcion}
							onChange={handleChange}
							placeholder="Describí el producto..."
							rows={3}
							maxLength={500}
						/>
						<span className={styles.charCount}>
							{form.descripcion.length}/500
						</span>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={styles.btnSecondary}
						onClick={() => {
							setForm(initialForm);
							setImagenes([]);
							setError(null);
							setSuccess(false);
						}}
						disabled={loading}>
						Limpiar
					</button>
					<button
						type="submit"
						className={styles.btnPrimary}
						disabled={loading}>
						{loading ? "Guardando..." : "Crear Producto"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AgregarProducto;
