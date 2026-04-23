import { useState, useEffect } from "react";
import type { Producto } from "../../../../types/Producto";
import type { ProductoTalle } from "../../../../types/ProductoTalle";
import { useProductoStore } from "../../../../store/productoStore";
import { useProductoTalleStore } from "../../../../store/talleProductoStore";
import { useCategoriaStore } from "../../../../store/categoriaStore";
import { StockModal } from "../../../../components/admin/StockModal/StockModal";
import { getProductoById } from "../../../../http/producto";
import styles from "../AdminProductos.module.css";

export const StockProducto = () => {
	const { pagedProductos, fetchProductosPaged } = useProductoStore();
	const { categoriasActivas, fetchCategoriasActivas } = useCategoriaStore();
	const { updateCantidadProductoTalle } = useProductoTalleStore();

	const [busqueda, setBusqueda] = useState("");
	const [categoriaFiltro, setCategoriaFiltro] = useState("");
	const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		fetchCategoriasActivas().catch(() => {});
		fetchProductosPaged({ page: 0, size: 100 }).catch(() => {});
	}, [fetchCategoriasActivas, fetchProductosPaged]);

	// Eliminadas funciones no utilizadas handleOpenModal y handleCloseModal

	const handleSaveStock = async (talle: ProductoTalle, cantidad: number) => {
		if (typeof talle.id === "number") {
			await updateCantidadProductoTalle(talle.id, cantidad);
		}
		await fetchProductosPaged({ page: 0, size: 100 }).catch(() => {});
		setSuccessMessage("Stock actualizado correctamente");
		setTimeout(() => setSuccessMessage(""), 2000);
	};

	// Normalizar productos y categorías igual que en Modificar
	const listaProductos = pagedProductos;
	const productosFiltrados = listaProductos
		.filter((p) => typeof p === "object" && p !== null && p.id)
		.map((p) => {
			let categoriaObj = p.categoria;
			if (typeof categoriaObj === "number") {
				categoriaObj =
					categoriasActivas.find((cat) => cat.id === categoriaObj) || undefined;
			}
			return { ...p, categoria: categoriaObj };
		})
		.filter((p) => {
			const matchNombre = p?.nombre
				?.toLowerCase()
				?.includes(busqueda.toLowerCase());
			const matchCat =
				categoriaFiltro === "" || String(p?.categoria?.id) === categoriaFiltro;
			return matchNombre && matchCat;
		});

	// Refrescar productos y el producto seleccionado tras crear un talle
	const handleRefresh = async () => {
		await fetchProductosPaged({ page: 0, size: 100 }).catch(() => {});
		if (selectedProduct && selectedProduct.id) {
			try {
				const actualizado = await getProductoById(selectedProduct.id);
				setSelectedProduct(actualizado);
				setSuccessMessage("Talle creado correctamente");
				setTimeout(() => setSuccessMessage(""), 2000);
			} catch {}
		}
	};

	return (
		<div className={styles.pageWrapper}>
			{/* Toolbar igual a Modificar */}
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
					{busqueda && (
						<button
							type="button"
							className={styles.searchClear}
							onClick={() => setBusqueda("")}
							aria-label="Limpiar">
							✕
						</button>
					)}
				</div>
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

			{/* Mensaje de éxito */}
			{successMessage && (
				<div className={styles.successMessage}>{successMessage}</div>
			)}

			{/* Tabla igual a Modificar */}
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
							<th>Imagen</th>
							<th>Nombre</th>
							<th>Categoría</th>
							<th>Talles</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{productosFiltrados.map((prod: Producto) => {
							const imgSrc = (() => {
								const u = prod.imagenes?.[0]?.urlImagen;
								if (!u) return null;
								if (u.startsWith("http")) return u;
								return `http://localhost:8080${encodeURI(u)}`;
							})();
							return (
								<tr key={prod.id}>
									<td style={{ width: 70, padding: 4 }}>
										{imgSrc ? (
											<img
												src={imgSrc}
												alt={prod.nombre}
												style={{
													width: 56,
													height: 56,
													objectFit: "contain",
													borderRadius: 4,
													background: "#222",
												}}
											/>
										) : (
											<div
												style={{
													width: 56,
													height: 56,
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													background: "#222",
													borderRadius: 4,
													color: "#888",
													fontSize: 12,
												}}>
												Sin imagen
											</div>
										)}
									</td>
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
									<td>{prod.talles?.length ?? 0}</td>
									<td>
										<button
											type="button"
											className={styles.productTableBtn}
											onClick={() => {
												setSelectedProduct(prod);
												setShowModal(true);
											}}>
											<span style={{ fontSize: "1rem", lineHeight: 1 }}>✏</span>{" "}
											Editar stock
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}

			<StockModal
				isOpen={showModal}
				producto={selectedProduct}
				onClose={() => {
					setShowModal(false);
					setSelectedProduct(null);
				}}
				onSave={handleSaveStock}
				onRefresh={handleRefresh}
			/>
		</div>
	);
};
