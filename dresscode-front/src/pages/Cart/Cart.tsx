import { sileo } from "sileo";
import { useState, useEffect } from "react";
import type { EstadoOrden } from "../../types/enums/EstadoOrden";
import styles from "./Cart.module.css";
import { useCartStore } from "../../store/cartStore";
import { useOrdenCompraStore } from "../../store/ordenCompraStore";
import { useUsuarioStore } from "../../store/userStore";
import type { MetodoPago } from "../../types/enums/MetodoPago";

const API_URL = import.meta.env.VITE_API_URL as string;

const Cart = () => {
	const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
	const { createOrdenDeCompra } = useOrdenCompraStore();
	const { usuarioActual, obtenerDireccionesUsuario, direccionesUsuario } =
		useUsuarioStore();

	const userId = usuarioActual?.id ? Number(usuarioActual.id) : null;
	const direccionesActivas = direccionesUsuario.filter((d: any) => d.activo);
	const [direccionSeleccionadaId, setDireccionSeleccionadaId] = useState<
		number | null
	>(null);

	useEffect(() => {
		if (userId) obtenerDireccionesUsuario(userId);
	}, [userId]);

	useEffect(() => {
		if (direccionesActivas.length > 0 && direccionSeleccionadaId === null) {
			setDireccionSeleccionadaId(direccionesActivas[0].id ?? null);
		}
	}, [direccionesActivas.length]);

	const getPrecioFinal = (item: any) => {
		const descuentoActivo =
			item.descuentos &&
			Array.isArray(item.descuentos) &&
			item.descuentos.find(
				(d: any) => d && d.activo && d.descuento && d.descuento.activo,
			);
		if (descuentoActivo && descuentoActivo.descuento) {
			return Math.round(
				item.precio * (1 - descuentoActivo.descuento.porcentajeDescuento / 100),
			);
		}
		return item.precio;
	};

	const subtotal = cart.reduce(
		(sum, item) => sum + getPrecioFinal(item) * item.cantidad,
		0,
	);

	const handleCheckout = async () => {
		if (!usuarioActual) {
			sileo.error({
				title: "Debes iniciar sesión",
				description: "Inicia sesión para finalizar la compra.",
				type: "error",
			});
			return;
		}
		const direccionSeleccionada = direccionesActivas.find(
			(d: any) => d.id === direccionSeleccionadaId,
		);
		if (!direccionSeleccionada) {
			sileo.error({
				title: "Falta dirección",
				description:
					"Debés seleccionar una dirección de entrega para finalizar la compra.",
				type: "error",
			});
			return;
		}
		try {
			const orden = {
				usuario: {
					id: usuarioActual.id,
					username: usuarioActual.username,
					email: usuarioActual.email,
					rol: usuarioActual.rol,
					activo: usuarioActual.activo,
					password: usuarioActual.password,
					direcciones: usuarioActual.direcciones,
				},
				direccion: direccionSeleccionada,
				fecha: new Date().toISOString(),
				precioTotal: subtotal,
				metodoPago: "MERCADO_PAGO" as MetodoPago,
				estadoOrden: "PEDIDO" as EstadoOrden,
			};

			await createOrdenDeCompra(orden);

			const response = await fetch(
				`${API_URL}/mercado-pago/mp`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						usuarioId: usuarioActual.id,
						direccionId: direccionSeleccionada.id,
						metodoPago: "MERCADO_PAGO",
						estadoOrden: "PEDIDO",
						detalles: cart.map((item) => ({
							productoTalleId: item.talleId,
							cantidad: item.cantidad,
							precioUnitario: getPrecioFinal(item),
						})),
					}),
				},
			);
			const data = await response.json();

			if (data.preferenceId) {
				clearCart();
				window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.preferenceId}`;
			} else if (data.initPoint) {
				clearCart();
				window.location.href = data.initPoint;
			} else {
				sileo.error({
					title: "Error de pago",
					description:
						"No se pudo redirigir a Mercado Pago. Intenta nuevamente.",
				});
			}
		} catch (error) {
			sileo.error({
				title: "Error al finalizar la compra",
				description: "Ocurrió un error inesperado. Intenta nuevamente.",
			});
		} finally {
		}
	};

	return (
		<div className={styles.cartBg}>
			<header className={styles.cartHeader}>
				<h1 className={styles.cartTitle}>CARRITO</h1>
			</header>
			<div className={styles.cartContent}>
				<div className={styles.productsTableWrapper}>
					<table className={styles.productsTable}>
						<thead>
							<tr>
								<th className={styles.thProduct}>PRODUCTO</th>
								<th className={styles.th}>PRECIO</th>
								<th className={styles.th}>CANTIDAD</th>
								<th className={styles.th}>SUBTOTAL</th>
								<th className={styles.th}></th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => (
								<tr
									key={
										String(item.productoId) + "-" + String(item.talleId ?? "")
									}>
									<td className={styles.productInfoCell}>
										<img
											src={
												item.imagen.startsWith("http")
													? item.imagen
													: `${API_URL}${encodeURI(
															item.imagen.startsWith("/")
																? item.imagen
																: `/${item.imagen}`,
														)}`
											}
											alt={item.nombre}
											className={styles.productImg}
											loading="lazy"
										/>
										<div className={styles.productInfo}>
											<div className={styles.productName}>{item.nombre}</div>
											{(item.talleName || item.talleId) && (
												<div className={styles.productBrand}>
													Talle: {item.talleName ?? item.talleId}
												</div>
											)}
										</div>
									</td>
									<td className={styles.productQtyCell}>
										<button
											type="button"
											onClick={() =>
												updateQuantity(item.productoId, -1, item.talleId)
											}
											className={styles.qtyBtn}>
											-
										</button>
										<span className={styles.qtyValue}>{item.cantidad}</span>
										<button
											type="button"
											onClick={() =>
												updateQuantity(item.productoId, 1, item.talleId)
											}
											className={styles.qtyBtn}>
											+
										</button>
									</td>
									<td className={styles.productSubtotal}>
										$
										{(getPrecioFinal(item) * item.cantidad).toLocaleString(
											"es-AR",
										)}
									</td>
									<td className={styles.productRemoveCell}>
										<button
											type="button"
											onClick={() =>
												removeFromCart(item.productoId, item.talleId)
											}
											className={styles.removeBtn}
											title="Eliminar">
											&#10005;
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Resumen de compra */}
				<div className={styles.summaryBox}>
					<div className={styles.summaryHeader}>RESUMEN DE COMPRA</div>
					{/* Selector de dirección */}
					{direccionesActivas.length > 0 ? (
						<div className={styles.direccionContainer}>
							<span className={styles.direccionesLabel}>
								Dirección de entrega
							</span>
							{direccionesActivas.map((d: any) => (
								<label
									key={d.id}
									className={`${styles.direccionCard} ${
										direccionSeleccionadaId === d.id
											? styles.direccionCardSelected
											: ""
									}`}>
									<input
										type="radio"
										name="direccion"
										value={d.id}
										checked={direccionSeleccionadaId === d.id}
										onChange={() => setDireccionSeleccionadaId(d.id)}
									/>
									<div className={styles.direccionInfo}>
										<div className={styles.direccionCalle}>
											{d.calle} {d.numero}
										</div>
										<div className={styles.direccionLocalidad}>
											{d.localidad}, {d.provincia?.replace(/_/g, " ")}
										</div>
										{d.codigoPostal && (
											<div className={styles.direccionCodigoPostal}>
												CP: {d.codigoPostal}
											</div>
										)}
									</div>
								</label>
							))}
						</div>
					) : (
						<div className={styles.noDirectionesMsg}>
							No tenés direcciones cargadas. Agregá una desde tu perfil.
						</div>
					)}
					<div className={styles.summaryRow}>
						<span>Subtotal</span>
						<span>${subtotal.toLocaleString("es-AR")}</span>
					</div>
					<hr className={styles.summaryDivider} />
					<div className={styles.summaryTotalRow}>
						<span>Total</span>
						<span>${subtotal.toLocaleString("es-AR")}</span>
					</div>
					<button className={styles.checkoutBtn} onClick={handleCheckout}>
						<span style={{ fontSize: 18 }}>🛒</span> FINALIZAR COMPRA
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
