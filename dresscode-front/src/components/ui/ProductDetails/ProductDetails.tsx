import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { sileo } from "sileo";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useProductoStore } from "../../../store/productoStore";

import { useCartStore } from "../../../store/cartStore";

export const ProductDetails = () => {
	const { id } = useParams();
	const { fetchProductoById, productoActual } = useProductoStore();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const { addToCart } = useCartStore();

	const [selectedTalleId, setSelectedTalleId] = useState<number | null>(null);

	useEffect(() => {
		fetchProductoById(Number(id));
		setSelectedTalleId(null);
	}, [id, fetchProductoById]);

	useEffect(() => {
		if (
			productoActual &&
			Array.isArray(productoActual.imagenes) &&
			productoActual.imagenes.length
		) {
			// Busca la imagen principal, si no hay, toma la primera
			const principal =
				productoActual.imagenes.find((img) => img.principal) ||
				productoActual.imagenes[0];
			setSelectedImage(principal.urlImagen);
		}
	}, [productoActual]);

	const [quantity, setQuantity] = useState(1);

	if (!productoActual) {
		return (
			<>
				<Helmet>
					<title>Producto no encontrado | DressCode</title>
					<meta name="robots" content="noindex" />
				</Helmet>
				<div className={styles.productNoFound}>
					ERROR: Producto no encontrado
				</div>
			</>
		);
	}
	const handleAddToCart = () => {
		if (!selectedTalleId) {
			sileo.error({
				title: "Selecciona un talle",
				description: "Debes elegir un talle antes de agregar al carrito.",
				type: "error",
			});
			return;
		}
		addToCart({
			productoId: productoActual.id!,
			nombre: productoActual.nombre,
			precio: productoActual.precio,
			imagen: productoActual.imagenes?.[0]?.urlImagen || "",
			cantidad: quantity,
			talleId: selectedTalleId,
			descuentos: productoActual.descuentos,
		});
		sileo.success({
			title: "¡Agregado al carrito!",
			description: `Se agregó "${productoActual.nombre}" al carrito.`,
			type: "success",
		});
	};

	return (
		<>
			<Helmet>
				<title>{`${productoActual.nombre} | DressCode`}</title>
				<meta
					name="description"
					content={
						productoActual.descripcion?.slice(0, 150) ||
						"Detalle de producto en DressCode"
					}
				/>
				<meta
					property="og:title"
					content={`${productoActual.nombre} | DressCode`}
				/>
				<meta
					property="og:description"
					content={
						productoActual.descripcion?.slice(0, 150) ||
						"Detalle de producto en DressCode"
					}
				/>
				<meta property="og:type" content="product" />
				<meta
					property="og:url"
					content={`https://tusitio.com/product/${productoActual.id}`}
				/>
				<meta
					property="og:image"
					content={
						productoActual.imagenes?.[0]?.urlImagen
							? `https://tusitio.com${productoActual.imagenes[0].urlImagen}`
							: "/public/assets/ImagesCarousel/og-default.jpg"
					}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content={`${productoActual.nombre} | DressCode`}
				/>
				<meta
					name="twitter:description"
					content={
						productoActual.descripcion?.slice(0, 150) ||
						"Detalle de producto en DressCode"
					}
				/>
				<meta
					name="twitter:image"
					content={
						productoActual.imagenes?.[0]?.urlImagen
							? `https://tusitio.com${productoActual.imagenes[0].urlImagen}`
							: "/public/assets/ImagesCarousel/og-default.jpg"
					}
				/>
				<link
					rel="canonical"
					href={`https://tusitio.com/product/${productoActual.id}`}
				/>
			</Helmet>
			<div className={styles.bg}>
				<div className={styles.container}>
					<div className={styles.thumbnails}>
						{productoActual.imagenes?.map((img, idx) => (
							<img
								key={idx}
								src={`http://localhost:8080${encodeURI(img.urlImagen)}`}
								alt={`Imagen ${idx + 1} de ${productoActual.nombre}`}
								loading="lazy"
								className={`${styles.thumbnailImg} ${
									selectedImage === img.urlImagen
										? styles.selectedThumbnail
										: ""
								}`}
								onClick={() => setSelectedImage(img.urlImagen)}
							/>
						))}
					</div>

					<div className={styles.mainImageContainer}>
						{productoActual.imagenes && productoActual.imagenes.length > 0 ? (
							<img
								src={`http://localhost:8080${encodeURI(selectedImage || "")}`}
								alt={productoActual.nombre}
								loading="lazy"
								className={styles.mainImage}
							/>
						) : (
							<div className={styles.noImage}>Sin imagen</div>
						)}
					</div>

					<div className={styles.infoBox}>
						<h2 className={styles.productName}>{productoActual.nombre}</h2>
						<div className={styles.category}>
							{productoActual.categoria?.nombreCategoria}
						</div>
						<div className={styles.brand}>
							{(productoActual.marca as any)?.nombreMarca ??
								String(productoActual.marca ?? "")}
						</div>
						<div className={styles.price}>
							${productoActual.precio.toLocaleString()}
						</div>
						<div className={styles.sizeSection}>
							<div className={styles.sizeLabel}>Talle</div>
							<div className={styles.sizes}>
								{productoActual.talles?.map((size) => (
									<button
										key={size.talle.id ?? Math.random()}
										className={`${styles.sizeBtn} ${
											selectedTalleId === size.talle.id
												? styles.sizeBtnSelected
												: ""
										}`}
										onClick={() => {
											if (typeof size.talle.id === "number") {
												setSelectedTalleId(
													selectedTalleId === size.talle.id
														? null
														: size.talle.id,
												);
											}
										}}
										type="button">
										{size.talle.tipoTalle}
									</button>
								))}
							</div>
						</div>
						{/* Descripción minimalista debajo de talles */}
						{productoActual.descripcion && (
							<div style={{ width: "100%", margin: "10px 0 14px 0" }}>
								<span className={styles.descLabel}>Descripción</span>
								<span className={styles.descText}>
									{productoActual.descripcion}
								</span>
							</div>
						)}
						<div className={styles.color}>
							Color:{" "}
							<span>
								{(productoActual.color as any)?.nombreColor ??
									String(productoActual.color ?? "")}
							</span>
						</div>

						<div className={styles.quantitySection}>
							<button
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
								className={styles.qtyBtn}
								aria-label="Disminuir cantidad">
								-
							</button>
							<span className={styles.qtyValue}>{quantity}</span>
							<button
								onClick={() => setQuantity((q) => q + 1)}
								className={styles.qtyBtn}
								aria-label="Aumentar cantidad">
								+
							</button>
						</div>
						<button
							className={styles.addToCartBtn}
							onClick={handleAddToCart}
							aria-label="Añadir producto al carrito">
							AÑADIR AL CARRO
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
