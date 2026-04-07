import React, { useEffect, useRef, useState } from "react";
import styles from "../../AgregarProducto/AgregarProducto.module.css";
import type { Producto } from "../../../../types/Producto";
import { useProductoStore } from "../../../../store/productoStore";
import { useProductoTalleStore } from "../../../../store/talleProductoStore";
import type { ProductoTalle } from "../../../../types/ProductoTalle";
import Swal from "sweetalert2";
import { ModalAgregarTalleProduct } from "../../../../components/admin/ModalAgregarTalleProduct/ModalAgregarTalleProduct";

const getColorLabel = (color: unknown): string => {
	if (!color) return "";
	if (typeof color === "string") return color;
	if (typeof color === "object" && color !== null && "nombreColor" in color)
		return (color as { nombreColor: string }).nombreColor;
	return "";
};

export const StockProducto = () => {
	const { updateCantidadProductoTalle } = useProductoTalleStore();
	const {
		productosActivos,
		fetchProductosActivos,
		setProductoActual,
		desactivarProducto,
	} = useProductoStore();

	const [product, setProduct] = useState<Producto | null>(null);
	const [talleActual, setTalleActual] = useState<ProductoTalle | null>(null);
	const [busqueda, setBusqueda] = useState("");
	const [showProductos, setShowProductos] = useState(false);
	const [cantidad, setCantidad] = useState<number | string>("");
	const [productoAgregarTalle, setProductoAgregarTalle] =
		useState<Producto | null>(null);
	const [loading, setLoading] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetchProductosActivos();
	}, [fetchProductosActivos]);

	const handleSelectProducto = (prod: Producto) => {
		setProduct(prod);
		setProductoActual(prod);
		setBusqueda(prod.nombre);
		setShowProductos(false);
		setTalleActual(null);
		setCantidad("");
	};

	const handleTalleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = Number(e.target.value);
		const talle = product?.talles?.find((t) => t.id === id) ?? null;
		setTalleActual(talle);
		setCantidad(talle?.cantidad ?? "");
	};

	const handleCantidadProductoTalle = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!product?.id || !talleActual?.id) return;
		const cant = Number(cantidad);
		if (!cant || cant < 0) {
			Swal.fire("Cantidad inválida", "Ingresá una cantidad válida.", "warning");
			return;
		}
		setLoading(true);
		try {
			await updateCantidadProductoTalle(talleActual.id, cant);
			Swal.fire("Guardado", "Stock actualizado correctamente.", "success");
			setTalleActual(null);
			setCantidad("");
			setBusqueda("");
			setProduct(null);
			fetchProductosActivos();
		} finally {
			setLoading(false);
		}
	};

	const handleEliminarProducto = async () => {
		if (!product?.id) return;
		const result = await Swal.fire({
			title: "¿Desactivar producto?",
			text: `"${product.nombre}" será desactivado.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#810000",
			cancelButtonColor: "#666",
			confirmButtonText: "Sí, desactivar",
			cancelButtonText: "Cancelar",
		});
		if (result.isConfirmed) {
			await desactivarProducto(product.id);
			Swal.fire("Desactivado", "El producto fue desactivado.", "success");
			setProduct(null);
			setProductoActual(null);
			setBusqueda("");
			setTalleActual(null);
			setCantidad("");
			fetchProductosActivos();
		}
	};

	const productosFiltrados = productosActivos.filter((p) =>
		p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Stock de Productos</h1>
				<p>Buscá un producto, elegí el talle y actualizá el stock</p>
			</div>

			<form
				className={styles.form}
				onSubmit={handleCantidadProductoTalle}
				noValidate>
				{/* Búsqueda de producto */}
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
							setProduct(null);
							setTalleActual(null);
							setCantidad("");
						}}
						onFocus={() => setShowProductos(true)}
						onBlur={() => setTimeout(() => setShowProductos(false), 150)}
						placeholder="Escribí el nombre del producto..."
					/>
					{showProductos && busqueda && productosFiltrados.length > 0 && (
						<div
							ref={dropdownRef}
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
									onMouseDown={() => handleSelectProducto(prod)}
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

				{/* Detalles del producto seleccionado */}
				{product && (
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "10px 0 14px",
								borderBottom: "1px solid #f0eef6",
							}}>
							<span
								style={{
									fontWeight: 700,
									fontSize: "0.95rem",
									color: "#1a1a1a",
								}}>
								{product.nombre}
								{getColorLabel(product.color)
									? ` — ${getColorLabel(product.color)}`
									: ""}
							</span>
							<button
								type="button"
								className={styles.btnSecondary}
								onClick={() => setProductoAgregarTalle(product)}>
								+ Agregar talle
							</button>
						</div>

						<div className={styles.formGrid}>
							<div className={styles.fieldGroup}>
								<label className={styles.label}>Talle</label>
								<select
									className={styles.select}
									value={talleActual?.id ?? ""}
									onChange={handleTalleChange}>
									<option value="">Seleccioná un talle</option>
									{product.talles?.map((t) => (
										<option key={t.id} value={t.id}>
											{t.talle.tipoTalle} — stock: {t.cantidad}
										</option>
									))}
								</select>
							</div>

							<div className={styles.fieldGroup}>
								<label className={styles.label}>Nueva cantidad</label>
								<input
									className={styles.input}
									type="number"
									min="0"
									value={cantidad}
									onChange={(e) => setCantidad(e.target.value)}
									placeholder="0"
									disabled={!talleActual}
								/>
							</div>
						</div>

						<div className={styles.actions}>
							<button
								type="button"
								className={styles.btnSecondary}
								onClick={handleEliminarProducto}>
								Desactivar producto
							</button>
							<button
								type="submit"
								className={styles.btnPrimary}
								disabled={loading || !talleActual}>
								{loading ? "Guardando..." : "Guardar stock"}
							</button>
						</div>
					</>
				)}
			</form>

			{productoAgregarTalle && (
				<ModalAgregarTalleProduct
					producto={productoAgregarTalle}
					onClose={() => setProductoAgregarTalle(null)}
				/>
			)}
		</div>
	);
};
