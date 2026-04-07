import React, { useEffect, useState } from "react";
import styles from "./AgregarProducto.module.css";
import { useProductoStore } from "../../../../store/productoStore";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import type { Producto } from "../../../../types/Producto";
import type { Marca } from "../../../../types/enums/Marca";
import type { Color } from "../../../../types/enums/Color";

const MARCAS: Marca[] = ["NIKE", "ADIDAS", "PUMA", "VANS", "JORDAN"];
const COLORES: Color[] = [
	"NEGRO",
	"BLANCO",
	"ROJO",
	"AZUL",
	"VERDE",
	"AMARILLO",
	"GRIS",
	"MARRON",
];

const initialForm: Omit<Producto, "id"> = {
	nombre: "",
	precio: 0,
	descripcion: "",
	color: "",
	marca: undefined,
	categoria: undefined,
};

const AgregarProducto: React.FC = () => {
	const [form, setForm] = useState(initialForm);
	const [categoriaId, setCategoriaId] = useState<number | "">("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { agregarProductoConCategoria } = useProductoStore();
	const { categoriasActivas, fetchCategoriasActivas } = useCategoriaStore();

	useEffect(() => {
		fetchCategoriasActivas();
	}, [fetchCategoriasActivas]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: name === "precio" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!categoriaId) {
			setError("Seleccioná una categoría");
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			await agregarProductoConCategoria(form as Producto, Number(categoriaId));
			setSuccess(true);
			setForm(initialForm);
			setCategoriaId("");
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
				<p>Completá los datos del nuevo producto</p>
			</div>

			{success && (
				<div className={styles.successMsg}>✓ Producto creado exitosamente</div>
			)}
			{error && <div className={styles.errorMsg}>{error}</div>}

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formGrid}>
					{/* Nombre */}
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Nombre *</label>
						<input
							className={styles.input}
							type="text"
							name="nombre"
							value={form.nombre}
							onChange={handleChange}
							placeholder="Ej: Remera Premium Negro"
							required
						/>
					</div>

					{/* Precio */}
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Precio *</label>
						<input
							className={styles.input}
							type="number"
							name="precio"
							value={form.precio}
							onChange={handleChange}
							min={0}
							placeholder="Ej: 5000"
							required
						/>
					</div>

					{/* Color */}
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Color *</label>
						<select
							className={styles.select}
							name="color"
							value={form.color}
							onChange={handleChange}
							required>
							<option value="">Seleccionar color</option>
							{COLORES.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>

					{/* Marca */}
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Marca *</label>
						<select
							className={styles.select}
							name="marca"
							value={form.marca ?? ""}
							onChange={handleChange}
							required>
							<option value="">Seleccionar marca</option>
							{MARCAS.map((m) => (
								<option key={m} value={m}>
									{m}
								</option>
							))}
						</select>
					</div>

					{/* Categoría */}
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Categoría *</label>
						<select
							className={styles.select}
							value={categoriaId}
							onChange={(e) =>
								setCategoriaId(
									e.target.value === "" ? "" : Number(e.target.value),
								)
							}
							required>
							<option value="">Seleccionar categoría</option>
							{categoriasActivas.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.nombreCategoria}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Descripción */}
				<div className={styles.fieldGroup}>
					<label className={styles.label}>Descripción *</label>
					<textarea
						className={styles.textarea}
						name="descripcion"
						value={form.descripcion}
						onChange={handleChange}
						placeholder="Descripción del producto..."
						rows={3}
						required
					/>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={styles.btnSecondary}
						onClick={() => {
							setForm(initialForm);
							setCategoriaId("");
							setError(null);
							setSuccess(false);
						}}>
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
