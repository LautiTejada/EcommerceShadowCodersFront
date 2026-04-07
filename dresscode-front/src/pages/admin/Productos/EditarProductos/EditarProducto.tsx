import React, { useEffect, useState } from "react";
import styles from "../../AgregarProducto/AgregarProducto.module.css";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import { useProductoStore } from "../../../../store/productoStore";
import { useMarcaStore } from "../../../../store/marcaStore";
import { useColorStore } from "../../../../store/colorStore";
import type { Producto } from "../../../../types/Producto";
import type { Marca } from "../../../../types/enums/Marca";

interface FormState {
	nombre: string;
	precio: string;
	descripcion: string;
	categoriaId: string;
	marcaId: string;
	colorId: string;
}

const emptyForm: FormState = {
	nombre: "",
	precio: "",
	descripcion: "",
	categoriaId: "",
	marcaId: "",
	colorId: "",
};

export const EditarProducto: React.FC = () => {
	const { categoriasActivas, fetchCategoriasActivas } = useCategoriaStore();
	const { productosActivos, fetchProductosActivos, editarProducto } =
		useProductoStore();
	const { marcasActivas, fetchMarcasActivas } = useMarcaStore();
	const { coloresActivos, fetchColoresActivos } = useColorStore();

	const [busqueda, setBusqueda] = useState("");
	const [showProductos, setShowProductos] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchCategoriasActivas();
		fetchMarcasActivas();
		fetchColoresActivos();
		fetchProductosActivos();
	}, [fetchCategoriasActivas, fetchMarcasActivas, fetchColoresActivos, fetchProductosActivos]);

	const handleSelectProduct = (producto: Producto) => {
		setSelectedProduct(producto);
		setBusqueda(producto.nombre);
		setShowProductos(false);
		setSuccess(false);
		setError(null);

		const rawColor =
			typeof producto.color === "object" && producto.color !== null
				? (producto.color as unknown as { nombreColor: string }).nombreColor
				: producto.color;
		const rawMarca =
			typeof producto.marca === "object" && producto.marca !== null
				? (producto.marca as unknown as { nombreMarca: string }).nombreMarca
				: producto.marca;

		const marcaMatch = marcasActivas.find((m) => m.nombreMarca === rawMarca);
		const colorMatch = coloresActivos.find((c) => c.nombreColor === rawColor);

		setForm({
			nombre: producto.nombre,
			precio: String(producto.precio),
			descripcion: producto.descripcion,
			categoriaId: producto.categoria?.id ? String(producto.categoria.id) : "",
			marcaId: marcaMatch?.id ? String(marcaMatch.id) : "",
			colorId: colorMatch?.id ? String(colorMatch.id) : "",
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setError(null);
		setSuccess(false);
	};

	const validate = (): string | null => {
		if (!selectedProduct) return "Seleccioná un producto para editar";
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
			const updatedProducto: Producto = {
				nombre: form.nombre.trim(),
				precio: Number(form.precio),
				descripcion: form.descripcion.trim(),
				color: coloresActivos.find((c) => c.id === Number(form.colorId))?.nombreColor,
				marca: marcasActivas.find((m) => m.id === Number(form.marcaId))
					?.nombreMarca as Marca | undefined,
				categoria: categoriasActivas.find((c) => c.id === Number(form.categoriaId)),
			};
			await editarProducto(selectedProduct!.id!, updatedProducto);
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error al editar el producto");
		} finally {
			setLoading(false);
		}
	};

	const productosFiltrados = productosActivos.filter((p) =>
		p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Editar Producto</h1>
				<p>Buscá el producto que querés modificar y actualizá sus datos</p>
			</div>

			<form className={styles.form} onSubmit={handleSubmit} noValidate>
				{error && <div className={styles.errorMsg}>{error}</div>}
				{success && (
					<div className={styles.successMsg}>
						¡Producto actualizado correctamente!
					</div>
				)}

				<div
					className={`${styles.fieldGroup} ${styles.fullWidth}`}
					style={{ position: "relative" }}>
					<label className={styles.label}>
						Buscar producto <span className={styles.required}>*</span>
					</label>
					<input
						className={styles.input}
						value={busqueda}
						onChange={(e) => {
							setBusqueda(e.target.value);
							setShowProductos(true);
							setSelectedProduct(null);
							setForm(emptyForm);
						}}
						onFocus={() => setShowProductos(true)}
						onBlur={() => setTimeout(() => setShowProductos(false), 150)}
						placeholder="Escribí el nombre del producto..."
					/>
					{showProductos && busqueda && productosFiltrados.length > 0 && (
						<div
							style={{
								position: "absolute",
								top: "100%",
								left: 0,
								right: 0,
								background: "#fff",
								border: "1.5px solid #810000",
								borderTop: "none",
								borderRadius: "0 0 4px 4px",
								zIndex: 10,
								maxHeight: 200,
								overflowY: "auto",
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							}}>
							{productosFiltrados.map((prod) => (
								<div
									key={prod.id}
									style={{
										padding: "9px 12px",
										cursor: "pointer",
										fontSize: "0.875rem",
										color: "#1a1a1a",
										borderBottom: "1px solid #f0eef6",
									}}
									onMouseDown={() => handleSelectProduct(prod)}
									onMouseEnter={(e) =>
										(e.currentTarget.style.background =
											"rgba(129,0,0,0.07)")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background = "")
									}>
									{prod.nombre}
								</div>
							))}
						</div>
					)}
				</div>

				{selectedProduct && (
					<>
						<div className={styles.formGrid}>
							<div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
								<label className={styles.label}>
									Nombre <span className={styles.required}>*</span>
								</label>
								<input
									name="nombre"
									type="text"
									className={styles.input}
									value={form.nombre}
									onChange={handleChange}
									maxLength={100}
								/>
							</div>

							<div className={styles.fieldGroup}>
								<label className={styles.label}>
									Precio <span className={styles.required}>*</span>
								</label>
								<div className={styles.inputPrefix}>
									<span className={styles.prefix}>$</span>
									<input
										name="precio"
										type="number"
										className={styles.input}
										value={form.precio}
										onChange={handleChange}
										min="0"
										step="0.01"
									/>
								</div>
							</div>

							<div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
								<label className={styles.label}>
									Descripción <span className={styles.required}>*</span>
								</label>
								<textarea
									name="descripcion"
									className={styles.textarea}
									value={form.descripcion}
									onChange={handleChange}
									rows={3}
								/>
							</div>

							<div className={styles.fieldGroup}>
								<label className={styles.label}>
									Marca <span className={styles.required}>*</span>
								</label>
								<select
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

							<div className={styles.fieldGroup}>
								<label className={styles.label}>
									Color <span className={styles.required}>*</span>
								</label>
								<select
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

							<div className={styles.fieldGroup}>
								<label className={styles.label}>
									Categoría <span className={styles.required}>*</span>
								</label>
								<select
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
						</div>

						<div className={styles.actions}>
							<button
								type="button"
								className={styles.btnSecondary}
								onClick={() => {
									setSelectedProduct(null);
									setBusqueda("");
									setForm(emptyForm);
								}}>
								Cancelar
							</button>
							<button
								type="submit"
								className={styles.btnPrimary}
								disabled={loading}>
								{loading ? "Guardando..." : "Guardar cambios"}
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
};

