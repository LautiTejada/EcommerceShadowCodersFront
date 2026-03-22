import styles from "./EditarProducto.module.css";
import MenuAdmin from "../../../../components/admin/MenuAdmin/MenuAdmin";
import { useEffect, useState } from "react";
import {
	validateForm,
	isRequired,
	minLength,
} from "../../../../utils/validate";
import { sileo } from "sileo";
import type { Producto } from "../../../../types/Producto";
import { useProductoStore } from "../../../../store/productoStore";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import type { Marca } from "../../../../types/enums/Marca";
import type { Color } from "../../../../types/enums/Color";

const marcas: Marca[] = ["NIKE", "ADIDAS", "PUMA", "VANS", "JORDAN"];
const colores: Color[] = [
	"NEGRO",
	"BLANCO",
	"ROJO",
	"AZUL",
	"VERDE",
	"AMARILLO",
	"GRIS",
	"MARRON",
];

export const EditarProducto = () => {
	const [product, setProduct] = useState<Producto | null>(null);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [showMarcas, setShowMarcas] = useState(false);
	const [showColores, setShowColores] = useState(false);
	const [showCategory, setShowCategory] = useState(false);

	const {
		productosActivos,
		fetchProductosActivos,
		editarProducto,
		setProductoActual,
	} = useProductoStore();
	const {
		categoriasActivas,
		fetchCategoriasActivas,
		setCategoriaActual,
		categoriaActual,
	} = useCategoriaStore();

	const [busqueda, setBusqueda] = useState("");
	const [showProductos, setShowProductos] = useState(false);

	useEffect(() => {
		fetchProductosActivos();
		fetchCategoriasActivas();
	}, [fetchProductosActivos, fetchCategoriasActivas]);

	const handleInput = (field: keyof Producto, value: any) => {
		if (!product) return;
		setProduct({ ...product, [field]: value });
	};

	const handleSelectProducto = (producto: Producto) => {
		setProduct(producto);
		setProductoActual(producto);
		setCategoriaActual(producto.categoria || null);
		setBusqueda(""); // opcional: limpiar búsqueda
		setShowProductos(false); // 👉 cerrar dropdown al seleccionar
	};

	const handleEditProduct = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!product || !product.id) {
			setErrors({ general: "Seleccioná un producto primero." });
			sileo.error({
				title: "Error",
				description: "Seleccioná un producto primero.",
				type: "error",
			});
			return;
		}
		const fields = {
			nombre: product.nombre,
			precio: product.precio,
			categoria: categoriaActual?.id,
			marca: product.marca,
		};
		const rules = {
			nombre: [isRequired, (v: string) => minLength(v, 3)],
			precio: [isRequired, (v: any) => Number(v) > 0],
			categoria: [isRequired],
			marca: [isRequired],
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
		await editarProducto(product.id, {
			...product,
			precio: Number(product.precio),
			categoria: categoriaActual,
		});
		setProduct(null);
		setProductoActual(null);
		setCategoriaActual(null);
		setBusqueda("");
		setErrors({});
		sileo.success({
			title: "Producto actualizado",
			description: "El producto fue editado correctamente.",
			type: "success",
		});
	};

	const productosFiltrados = productosActivos.filter((p) =>
		p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
	);

	return (
		<div className={styles.container}>
			<MenuAdmin />
			<main className={styles.mainContent}>
				<form className={styles.form} onSubmit={handleEditProduct}>
					<div className={styles.formRow}>
						<div className={styles.formGroupWide}>
							<label className={styles.label}>BUSCAR PRODUCTO</label>
							<div className={`${styles.inputDropdownWrapper}`}>
								<input
									className={styles.input}
									value={busqueda}
									onChange={(e) => {
										setBusqueda(e.target.value);
										setShowProductos(true); // 👉 mostrar dropdown al tipear
									}}
									placeholder="Escribí el nombre del producto..."
								/>
								{showProductos && busqueda && (
									<div className={styles.dropdown}>
										{productosFiltrados.map((prod) => (
											<div
												key={prod.id}
												className={styles.dropdownItem}
												onClick={() => handleSelectProducto(prod)}>
												{prod.nombre}
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					{product && (
						<>
							<h2 className={styles.formTitle}>
								Editar Producto: {product.nombre}
							</h2>
							<div className={styles.formRow}>
								<div className={styles.formGroup}>
									<label className={styles.label}>NOMBRE</label>
									<div className={styles.inputIcon}>
										<input
											className={styles.input}
											value={product.nombre}
											onChange={(e) => handleInput("nombre", e.target.value)}
											placeholder="..."
											aria-invalid={!!errors.nombre}
											aria-describedby={
												errors.nombre ? "nombre-error" : undefined
											}
										/>
										{errors.nombre && (
											<div
												className={styles.error}
												id="nombre-error"
												role="alert">
												{errors.nombre}
											</div>
										)}
									</div>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label}>CATEGORÍA</label>
									{errors.categoria && (
										<div
											className={styles.error}
											id="categoria-error"
											role="alert">
											{errors.categoria}
										</div>
									)}
									<div
										className={styles.select}
										onClick={() => setShowCategory(!showCategory)}
										tabIndex={0}>
										{categoriaActual?.nombreCategoria ||
											product.categoria?.nombreCategoria ||
											"..."}
										<span className={styles.arrow} />
										{showCategory && (
											<div className={styles.dropdown}>
												{categoriasActivas.map((cat) => (
													<div
														key={cat.id}
														className={styles.dropdownItem}
														onClick={() => {
															setCategoriaActual(cat);
															setShowCategory(false);
														}}>
														{cat.nombreCategoria}
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>

							<div className={styles.formRow}>
								<div className={styles.formGroup}>
									<label className={styles.label}>PRECIO</label>
									<div className={styles.inputIcon}>
										<input
											className={styles.input}
											type="number"
											value={product.precio}
											onChange={(e) => handleInput("precio", e.target.value)}
											placeholder="$"
											aria-invalid={!!errors.precio}
											aria-describedby={
												errors.precio ? "precio-error" : undefined
											}
										/>
										{errors.precio && (
											<div
												className={styles.error}
												id="precio-error"
												role="alert">
												{errors.precio}
											</div>
										)}
									</div>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label}>MARCA</label>
									{errors.marca && (
										<div className={styles.error} id="marca-error" role="alert">
											{errors.marca}
										</div>
									)}
									<div
										className={styles.select}
										onClick={() => setShowMarcas(!showMarcas)}
										tabIndex={0}>
										{product.marca || "..."}
										<span className={styles.arrow} />
										{showMarcas && (
											<div className={styles.dropdown}>
												{marcas.map((marca) => (
													<div
														key={marca}
														className={styles.dropdownItem}
														onClick={() => {
															handleInput("marca", marca);
															setShowMarcas(false);
														}}>
														{marca}
													</div>
												))}
											</div>
										)}
									</div>
								</div>
								<div className={styles.formGroup}>
									<label className={styles.label}>COLOR</label>
									<div
										className={styles.select}
										onClick={() => setShowColores(!showColores)}
										tabIndex={0}>
										{product.color}
										<span className={styles.arrow} />
										{showColores && (
											<div className={styles.dropdown}>
												{colores.map((color) => (
													<div
														key={color}
														className={styles.dropdownItem}
														onClick={() => {
															handleInput("color", color);
															setShowColores(false);
														}}>
														{color}
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>

							<div className={styles.formRow}>
								<div className={styles.formGroupWide}>
									<label className={styles.label}>DESCRIPCIÓN</label>
									<div className={styles.inputIcon}>
										<input
											className={styles.input}
											value={product.descripcion}
											onChange={(e) =>
												handleInput("descripcion", e.target.value)
											}
											placeholder="..."
										/>
									</div>
								</div>
							</div>

							{/* Si quieres agregar edición de imágenes, puedes copiar la lógica de AgregarProducto aquí */}

							<div className={styles.formRow}>
								<button className={styles.addButton} type="submit">
									GUARDAR CAMBIOS
								</button>
							</div>
						</>
					)}
				</form>
			</main>
		</div>
	);
};
