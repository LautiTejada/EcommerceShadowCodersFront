import React, { useEffect, useState } from "react";
import styles from "../AdminProductos.module.css";
import { AdminModal } from "../../../../components/admin/AdminModal/AdminModal";
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
	marcaNombre: string;
	colorNombre: string;
	activo: boolean;
}

const emptyForm: FormState = {
	nombre: "",
	precio: "",
	descripcion: "",
	categoriaId: "",
	marcaNombre: "",
	colorNombre: "",
	activo: true,
};

export const EditarProducto: React.FC = () => {
	const { categoriasActivas, fetchCategoriasActivas } = useCategoriaStore();
	const {
		productosActivos,
		pagedProductos,
		fetchProductosActivos,
		fetchProductosPaged,
		editarProducto,
	} = useProductoStore();
	const { marcasActivas, fetchMarcasActivas } = useMarcaStore();
	const { coloresActivos, fetchColoresActivos } = useColorStore();

	const [busqueda, setBusqueda] = useState("");
	const [categoriaFiltro, setCategoriaFiltro] = useState("");
	const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const listaProductos = pagedProductos;
	const [filtroActivo, setFiltroActivo] = useState<
		"todos" | "activos" | "inactivos"
	>("todos");

	useEffect(() => {
		fetchCategoriasActivas().catch(() => {});
		fetchMarcasActivas().catch(() => {});
		fetchColoresActivos().catch(() => {});
		fetchProductosPaged({ page: 0, size: 100 }).catch(() => {});
	}, [
		fetchCategoriasActivas,
		fetchMarcasActivas,
		fetchColoresActivos,
		fetchProductosPaged,
	]);

	const handleSelectProduct = (producto: Producto) => {
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

		setForm({
			nombre: producto.nombre,
			precio: String(producto.precio),
			descripcion: producto.descripcion,
			categoriaId: producto.categoria?.id ? String(producto.categoria.id) : "",
			marcaNombre: (rawMarca as string) ?? "",
			colorNombre: (rawColor as string) ?? "",
			activo: producto.activo !== false, // default true si undefined
		});
		setSelectedProduct(producto);
	};

	const handleClose = () => {
		setSelectedProduct(null);
		setForm(emptyForm);
		setError(null);
		setSuccess(false);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		setError(null);
		setSuccess(false);
	};

	const validate = (): string | null => {
		if (!form.nombre.trim()) return "El nombre es requerido";
		if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
			return "El precio debe ser un número mayor a 0";
		if (!form.descripcion.trim()) return "La descripción es requerida";
		if (!form.marcaNombre) return "La marca es requerida";
		if (!form.colorNombre) return "El color es requerido";
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

			// Valores originales del producto para comparar
			const origColor =
				typeof selectedProduct!.color === "object" &&
				selectedProduct!.color !== null
					? (selectedProduct!.color as unknown as { nombreColor: string })
							.nombreColor
					: ((selectedProduct!.color as string) ?? "");
			const origMarca =
				typeof selectedProduct!.marca === "object" &&
				selectedProduct!.marca !== null
					? (selectedProduct!.marca as unknown as { nombreMarca: string })
							.nombreMarca
					: ((selectedProduct!.marca as string) ?? "");

			// Solo incluir campos que el usuario modificó
			const body: Record<string, unknown> = {};
			if (form.nombre.trim() !== selectedProduct!.nombre)
				body.nombre = form.nombre.trim();
			if (Number(form.precio) !== selectedProduct!.precio)
				body.precio = Number(form.precio);
			if (form.descripcion.trim() !== selectedProduct!.descripcion)
				body.descripcion = form.descripcion.trim();
			if (form.colorNombre !== origColor) body.color = form.colorNombre;
			if (form.marcaNombre !== origMarca) body.marca = form.marcaNombre;
			// Fix robusto: solo enviar categoriaId si cambió y no está vacío
			const origCategoriaId = selectedProduct!.categoria?.id
				? String(selectedProduct!.categoria.id)
				: "";
			if (form.categoriaId && form.categoriaId !== origCategoriaId) {
				body.categoriaId = Number(form.categoriaId);
			}

			// Si no cambió nada, no hacer el PUT
			if (Object.keys(body).length === 0) {
				setSuccess(true);
				return;
			}

			// Enviar el estado actual del checkbox
			body.activo = form.activo;
			console.log(
				"[EditarProducto] PUT id:",
				selectedProduct!.id!,
				"body:",
				JSON.stringify(body),
			);
			await editarProducto(selectedProduct!.id!, body as any);
			// Re-fetch para actualizar la tabla inmediatamente
			// Refrescar toda la lista tras editar para evitar inconsistencias
			await Promise.all([
				fetchProductosActivos().catch(() => {}),
				fetchProductosPaged({ page: 0, size: 100 }).catch(() => {}),
			]);
			setSuccess(true);
			// Cerrar modal automáticamente tras 1.2s
			setTimeout(() => handleClose(), 1200);
		} catch (err) {
			console.error(
				"[EditarProducto] Error al guardar:",
				err instanceof Error ? err.message : err,
			);
			setError(
				err instanceof Error ? err.message : "Error al editar el producto",
			);
		} finally {
			setLoading(false);
		}
	};

	// Filtrar solo objetos y normalizar categoria
	const productosFiltrados = listaProductos
		.filter((p) => typeof p === "object" && p !== null && p.id)
		.map((p) => {
			let categoriaObj = p.categoria;
			if (typeof categoriaObj === "number") {
				categoriaObj =
					categoriasActivas.find((cat) => cat.id === categoriaObj) || null;
			}
			return { ...p, categoria: categoriaObj };
		})
		.filter((p) => {
			const matchNombre = p?.nombre
				?.toLowerCase()
				?.includes(busqueda.toLowerCase());
			const matchCat =
				categoriaFiltro === "" || String(p?.categoria?.id) === categoriaFiltro;
			const matchActivo =
				filtroActivo === "todos"
					? true
					: filtroActivo === "activos"
						? p.activo
						: !p.activo;
			return matchNombre && matchCat && matchActivo;
		});

	return (
		<div className={styles.pageWrapper}>
			{/* ——— Toolbar ——— */}
			<div className={styles.toolbar}>
				<div className={`${styles.searchWrapper} ${styles.toolbarSearch}`}>
					<span className={styles.searchIcon}>
						<svg
							viewBox="0 0 20 20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							width="14"
							height="14">
							<circle cx="8.5" cy="8.5" r="5.5" />
							<path strokeLinecap="round" d="M13 13l3 3" />
						</svg>
					</span>
					<input
						className={styles.searchInput}
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						placeholder="Buscar por nombre..."
					/>
				</div>
				<select
					className={styles.filterSelect}
					value={filtroActivo}
					onChange={(e) =>
						setFiltroActivo(e.target.value as "todos" | "activos" | "inactivos")
					}
					style={{ maxWidth: 180, minWidth: 120, marginRight: 12 }}>
					<option value="todos">Todos</option>
					<option value="activos">Activos</option>
					<option value="inactivos">Inactivos</option>
				</select>
				<select
					className={styles.filterSelect}
					value={categoriaFiltro}
					onChange={(e) => setCategoriaFiltro(e.target.value)}>
					<option value="">Todas las categorías</option>
					{categoriasActivas.map((cat) => (
						<option key={cat.id} value={String(cat.id)}>
							{cat.nombreCategoria}
						</option>
					))}
				</select>
				<span className={styles.countBadge}>
					{productosFiltrados.length} de {listaProductos.length} productos
				</span>
			</div>

			{/* ——— Tabla de productos ——— */}
			{listaProductos.length === 0 ? (
				<div className={styles.listEmpty}>
					<span className={styles.listEmptyIcon}>📦</span>
					Cargando productos...
				</div>
			) : productosFiltrados.length === 0 ? (
				<div className={styles.listEmpty}>
					<span className={styles.listEmptyIcon}>🔍</span>
					Sin resultados para esa búsqueda
				</div>
			) : (
				<table className={styles.productTable}>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Categoría</th>
							<th>Precio</th>
							<th>Marca</th>
							<th>Color</th>
							<th>Activo</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{productosFiltrados.map((prod) => (
							<tr key={prod.id} onClick={() => handleSelectProduct(prod)}>
								<td className={styles.productTableName}>{prod.nombre}</td>
								<td>
									{prod.categoria?.nombreCategoria ? (
										<span className={styles.badge}>
											{prod.categoria.nombreCategoria}
										</span>
									) : (
										<span style={{ color: "#ccc" }}>—</span>
									)}
								</td>
								<td>${Number(prod.precio).toLocaleString("es-AR")}</td>
								<td>
									{(typeof prod.marca === "object" && prod.marca !== null
										? (prod.marca as unknown as { nombreMarca: string })
												.nombreMarca
										: (prod.marca as unknown as string)) || (
										<span style={{ color: "#ccc" }}>—</span>
									)}
								</td>
								<td>
									{(typeof prod.color === "object" && prod.color !== null
										? (prod.color as unknown as { nombreColor: string })
												.nombreColor
										: (prod.color as unknown as string)) || (
										<span style={{ color: "#ccc" }}>—</span>
									)}
								</td>
								<td>
									<label
										className={styles.toggleSwitch}
										title={prod.activo ? "Activo" : "Inactivo"}
										onClick={(e) => e.stopPropagation()}>
										<input
											type="checkbox"
											checked={!!prod.activo}
											onChange={async (e) => {
												e.stopPropagation();
												if (prod.id) {
													if (e.target.checked) {
														await useProductoStore
															.getState()
															.activarProducto(prod.id);
													} else {
														await useProductoStore
															.getState()
															.desactivarProducto(prod.id);
													}
													// Refrescar la lista completa, no solo activos
													await fetchProductosPaged({ page: 0, size: 100 });
												}
											}}
										/>
										<span className={styles.toggleSlider}></span>
									</label>
								</td>
								<td>
									<button
										type="button"
										className={styles.productTableBtn}
										onClick={(e) => {
											e.stopPropagation();
											handleSelectProduct(prod);
										}}>
										✏ Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{/* ——— Modal de edición ——— */}
			{selectedProduct && (
				<AdminModal
					title="Editar producto"
					subtitle={selectedProduct.nombre}
					onClose={handleClose}>
					<form className={styles.form} onSubmit={handleSubmit} noValidate>
						{error && (
							<div className={styles.alertError}>
								<span>⚠</span> {error}
							</div>
						)}
						{success && (
							<div className={styles.alertSuccess}>
								<span>✓</span> ¡Producto actualizado correctamente!
							</div>
						)}
						<div className={styles.formGrid}>
							<div className={styles.formSection}>
								<span className={styles.formSectionTitle}>
									Información básica
								</span>
								<div className={styles.formSectionLine} />
							</div>
							<div className={styles.fieldGroup}>
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
										className={`${styles.input} ${styles.inputBorderless}`}
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
							<div className={styles.formSection}>
								<span className={styles.formSectionTitle}>Clasificación</span>
								<div className={styles.formSectionLine} />
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
									<option value="">Seleccionar...</option>
									{categoriasActivas.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.nombreCategoria}
										</option>
									))}
								</select>
							</div>
							<div className={styles.fieldGroup}>
								<label className={styles.label}>
									Marca <span className={styles.required}>*</span>
								</label>
								<select
									name="marcaNombre"
									className={styles.select}
									value={form.marcaNombre}
									onChange={handleChange}>
									<option value="">Seleccionar...</option>
									{marcasActivas.map((m) => (
										<option key={m.id} value={m.nombreMarca}>
											{m.nombreMarca}
										</option>
									))}
								</select>
							</div>
							<div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
								<label className={styles.label}>
									Color <span className={styles.required}>*</span>
								</label>
								<select
									name="colorNombre"
									className={styles.select}
									value={form.colorNombre}
									onChange={handleChange}>
									<option value="">Seleccionar...</option>
									{coloresActivos.map((c) => (
										<option key={c.id} value={c.nombreColor}>
											{c.nombreColor}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className={styles.actions}>
							<button
								type="button"
								className={styles.btnCancel}
								onClick={handleClose}>
								Cancelar
							</button>
							<button
								type="submit"
								className={styles.btnPrimary}
								disabled={loading}>
								{loading ? "Guardando..." : "Guardar cambios"}
							</button>
						</div>
					</form>
				</AdminModal>
			)}
		</div>
	);
};
