import React, { useEffect, useState } from "react";
import styles from "../AdminProductos.module.css";
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

const getStockBadgeClass = (cantidad: number, s: Record<string, string>) => {
	if (cantidad === 0) return s.stockBadgeEmpty;
	if (cantidad <= 3) return s.stockBadgeLow;
	return s.stockBadgeOk;
};

const getStockLabel = (cantidad: number) => {
	if (cantidad === 0) return "Sin stock";
	if (cantidad === 1) return "1 unidad";
	return `${cantidad} uds.`;
};

export const StockProducto = () => {
	const { updateCantidadProductoTalle } = useProductoTalleStore();
	const {
		productosActivos,
		pagedProductos,
		fetchProductosActivos,
		fetchProductosPaged,
		setProductoActual,
		desactivarProducto,
	} = useProductoStore();

	const [product, setProduct] = useState<Producto | null>(null);
	const [talleActual, setTalleActual] = useState<ProductoTalle | null>(null);
	const [busqueda, setBusqueda] = useState("");
	const [cantidad, setCantidad] = useState<number | string>("");
	const [productoAgregarTalle, setProductoAgregarTalle] =
		useState<Producto | null>(null);
	const [loading, setLoading] = useState(false);
	const listaProductos =
		productosActivos.length > 0 ? productosActivos : pagedProductos;

	useEffect(() => {
		fetchProductosActivos().catch(() =>
			fetchProductosPaged({ page: 0, size: 100 }).catch(() => {}),
		);
	}, [fetchProductosActivos, fetchProductosPaged]);

	const handleSelectProducto = (prod: Producto) => {
		setProduct(prod);
		setProductoActual(prod);
		setTalleActual(null);
		setCantidad("");
	};

	const handleSelectTalle = (t: ProductoTalle) => {
		setTalleActual(t);
		setCantidad(t.cantidad ?? "");
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
			fetchProductosActivos().catch(() =>
				fetchProductosPaged({ page: 0, size: 100 }).catch(() => {}),
			);
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
			fetchProductosActivos().catch(() =>
				fetchProductosPaged({ page: 0, size: 100 }).catch(() => {}),
			);
		}
	};

	const productosFiltrados = listaProductos.filter((p) =>
		p?.nombre?.toLowerCase()?.includes(busqueda.toLowerCase()),
	);

	return (
		<div className={styles.pageWrapper}>
			{/* ——— Indicador de pasos ——— */}
			<div className={styles.steps}>
				<div className={styles.stepItem}>
					<div
						className={
							product ? styles.stepCircleDone : styles.stepCircleActive
						}>
						1
					</div>
					<span
						className={product ? styles.stepLabelDone : styles.stepLabelActive}>
						Elegí un producto
					</span>
				</div>
				<div
					className={product ? styles.stepConnectorDone : styles.stepConnector}
				/>
				<div className={styles.stepItem}>
					<div
						className={
							talleActual
								? styles.stepCircleDone
								: product
									? styles.stepCircleActive
									: styles.stepCircle
						}>
						2
					</div>
					<span
						className={
							talleActual
								? styles.stepLabelDone
								: product
									? styles.stepLabelActive
									: styles.stepLabel
						}>
						Elegí un talle
					</span>
				</div>
				<div
					className={
						talleActual ? styles.stepConnectorDone : styles.stepConnector
					}
				/>
				<div className={styles.stepItem}>
					<div
						className={
							talleActual ? styles.stepCircleActive : styles.stepCircle
						}>
						3
					</div>
					<span
						className={talleActual ? styles.stepLabelActive : styles.stepLabel}>
						Actualizá el stock
					</span>
				</div>
			</div>

			<div className={styles.splitLayout}>
				{/* ——— Panel izquierdo: lista ——— */}
				<div className={styles.listPanel}>
					<p className={product ? styles.panelLabelActive : styles.panelLabel}>
						Lista de productos
					</p>
					<div className={styles.searchWrapper}>
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
						{busqueda && (
							<button
								type="button"
								className={styles.searchClear}
								onClick={() => setBusqueda("")}
								aria-label="Limpiar búsqueda">
								✕
							</button>
						)}
					</div>

					<p className={styles.listMeta}>
						{productosFiltrados.length} de {listaProductos.length} productos
						{product && " · 1 seleccionado"}
					</p>

					<div className={styles.productList}>
						{productosFiltrados.length === 0 ? (
							<div className={styles.listEmpty}>
								<span className={styles.listEmptyIcon}>📦</span>
								{listaProductos.length === 0
									? "Cargando productos..."
									: "Sin resultados"}
							</div>
						) : (
							productosFiltrados.map((prod) => {
								const isSelected = product?.id === prod.id;
								return (
									<div
										key={prod.id}
										className={
											isSelected
												? styles.productItemSelected
												: styles.productItem
										}
										onClick={() => handleSelectProducto(prod)}>
										<span
											className={
												isSelected
													? styles.productItemNameSelected
													: styles.productItemName
											}>
											{prod.nombre}
										</span>
										<div className={styles.productItemMeta}>
											{prod.categoria?.nombreCategoria && (
												<span className={styles.badge}>
													{prod.categoria.nombreCategoria}
												</span>
											)}
											{prod.talles && prod.talles.length > 0 && (
												<span className={styles.badge}>
													{prod.talles.length} talle
													{prod.talles.length !== 1 ? "s" : ""}
												</span>
											)}
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>

				{/* ——— Panel derecho: stock ——— */}
				<div>
					<p className={product ? styles.panelLabelActive : styles.panelLabel}>
						Gestión de stock
					</p>
					{product ? (
						<div className={styles.formPanel}>
							<div className={styles.formPanelHeader}>
								<div>
									<p className={styles.formPanelTitle}>
										{product.nombre}
										{getColorLabel(product.color)
											? ` — ${getColorLabel(product.color)}`
											: ""}
									</p>
									<p className={styles.formPanelSubtitle}>
										{product.categoria?.nombreCategoria
											? `${product.categoria.nombreCategoria} · `
											: ""}
										{product.talles?.length ?? 0} talles registrados · ID #
										{product.id}
									</p>
								</div>
								<div
									style={{ display: "flex", gap: "8px", alignItems: "center" }}>
									<button
										type="button"
										className={styles.btnSecondary}
										onClick={() => setProductoAgregarTalle(product)}>
										+ Agregar talle
									</button>
									<button
										type="button"
										className={styles.btnCancel}
										onClick={() => {
											setProduct(null);
											setProductoActual(null);
											setTalleActual(null);
											setCantidad("");
										}}>
										✕ Cancelar
									</button>
								</div>
							</div>

							<form
								className={styles.form}
								onSubmit={handleCantidadProductoTalle}
								noValidate>
								{/* Talle cards */}
								<div className={styles.fieldGroup}>
									<label className={styles.label}>Seleccioná un talle</label>
									{!product.talles || product.talles.length === 0 ? (
										<div className={styles.listEmpty}>
											<span>Este producto no tiene talles registrados</span>
											<button
												type="button"
												className={styles.btnSecondary}
												onClick={() => setProductoAgregarTalle(product)}>
												Agregar primer talle
											</button>
										</div>
									) : (
										<div className={styles.talleGrid}>
											{product.talles.map((t) => (
												<div
													key={t.id}
													className={
														talleActual?.id === t.id
															? styles.talleCardSelected
															: styles.talleCard
													}
													onClick={() => handleSelectTalle(t)}>
													<span className={styles.talleCardName}>
														{t.talle.tipoTalle}
													</span>
													<span
														className={getStockBadgeClass(t.cantidad, styles)}>
														{getStockLabel(t.cantidad)}
													</span>
												</div>
											))}
										</div>
									)}
								</div>

								{/* Input de cantidad — solo visible si hay talle seleccionado */}
								{talleActual && (
									<div className={styles.stockInputBox}>
										<label className={styles.stockInputLabel}>
											Nuevo stock para talle «{talleActual.talle.tipoTalle}»
										</label>
										<input
											className={styles.input}
											type="number"
											min="0"
											value={cantidad}
											onChange={(e) => setCantidad(e.target.value)}
											placeholder="0"
										/>
									</div>
								)}

								<div className={styles.actionsSpaced}>
									<button
										type="button"
										className={styles.btnDanger}
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
							</form>
						</div>
					) : (
						<div className={styles.formPanelEmpty}>
							<span className={styles.formPanelEmptyIcon}>📦</span>
							<strong>Clicá un producto de la lista</strong>
							<span className={styles.formPanelEmptyHint}>
								Acá vas a ver los talles disponibles y podrás actualizar el
								stock de cada uno
							</span>
						</div>
					)}
				</div>
			</div>

			{productoAgregarTalle && (
				<ModalAgregarTalleProduct
					producto={productoAgregarTalle}
					onClose={() => setProductoAgregarTalle(null)}
				/>
			)}
		</div>
	);
};
