import React, { useEffect, useState } from "react";
import styles from "./EditarProducto.module.css";
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

		const marcaMatch = marcasActivas.find((m) => m.nombreMarca === producto.marca);
		const colorMatch = coloresActivos.find((c) => c.nombreColor === producto.color);

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
		<main className={styles.mainContent}>
			<form className={styles.form} onSubmit={handleSubmit} noValidate>
				<h2 className={styles.formTitle}>Editar Producto</h2>
				{error && <div style={{ color: "#f55", marginBottom: 12 }}>{error}</div>}
				{success && (
					<div style={{ color: "#5f5", marginBottom: 12 }}>
						¡Producto actualizado correctamente!
					</div>
				)}

				<div className={styles.formRow}>
					<div className={styles.formGroupWide}>
						<label className={styles.label}>BUSCAR PRODUCTO</label>
						<div className={styles.inputDropdownWrapper}>
							<div className={styles.inputIcon}>
								<input
									className={styles.input}
									value={busqueda}
									onChange={(e) => {
										setBusqueda(e.target.value);
										setShowProductos(true);
										setSelectedProduct(null);
									}}
									placeholder="Escribí el nombre del producto..."
								/>
							</div>
							{showProductos && busqueda && productosFiltrados.length > 0 && (
								<div className={styles.dropdown}>
									{productosFiltrados.map((prod) => (
										<div
											key={prod.id}
											className={styles.dropdownItem}
											onClick={() => handleSelectProduct(prod)}>
											{prod.nombre}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{selectedProduct && (
					<>
						<div className={styles.formRow}>
							<div className={styles.formGroupWide}>
								<label className={styles.label}>NOMBRE</label>
								<div className={styles.inputIcon}>
									<input
										className={styles.input}
										name="nombre"
										type="text"
										value={form.nombre}
										onChange={handleChange}
										maxLength={100}
									/>
								</div>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.label}>PRECIO</label>
								<div className={styles.inputIcon}>
									<input
										className={styles.input}
										name="precio"
										type="number"
										value={form.precio}
										onChange={handleChange}
										min="0"
										step="0.01"
									/>
								</div>
							</div>
						</div>

						<div className={styles.formRow}>
							<div className={styles.formGroupWide}>
								<label className={styles.label}>DESCRIPCIÓN</label>
								<div className={styles.inputIcon}>
									<input
										className={styles.input}
										name="descripcion"
										type="text"
										value={form.descripcion}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>

						<div className={styles.formRow}>
							<div className={styles.formGroup}>
								<label className={styles.label}>MARCA</label>
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
							<div className={styles.formGroup}>
								<label className={styles.label}>COLOR</label>
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
							<div className={styles.formGroup}>
								<label className={styles.label}>CATEGORÍA</label>
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

						<div className={styles.formRow}>
							<button
								className={styles.addButton}
								type="submit"
								disabled={loading}>
								{loading ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
							</button>
						</div>
					</>
				)}
			</form>
		</main>
	);
};

