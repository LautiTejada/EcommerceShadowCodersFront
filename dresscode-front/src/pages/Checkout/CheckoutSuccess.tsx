import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCartStore } from "../../store/cartStore";

const CheckoutSuccess = () => {
	const [searchParams] = useSearchParams();
	const { clearCart } = useCartStore();
	const ordenId = searchParams.get("external_reference") ?? searchParams.get("preference_id");

	useEffect(() => {
		// MercadoPago redirige aquí tras pago exitoso — limpiamos el carrito por seguridad
		clearCart();
	}, [clearCart]);

	return (
		<>
			<Helmet>
				<title>Pago exitoso | DressCode</title>
				<meta name="robots" content="noindex" />
			</Helmet>
			<div
				style={{
					minHeight: "60vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "48px 24px",
					background: "#fff",
					textAlign: "center",
				}}>
				<div
					style={{
						width: 72,
						height: 72,
						borderRadius: "50%",
						background: "#1e7e34",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 24,
					}}>
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
				<h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
					Pago aprobado
				</h1>
				<p style={{ color: "#555", fontSize: "1.1rem", marginBottom: 8 }}>
					Tu pedido fue confirmado exitosamente.
				</p>
				{ordenId && (
					<p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 32 }}>
						Referencia: {ordenId}
					</p>
				)}
				{!ordenId && <div style={{ marginBottom: 32 }} />}
				<p style={{ color: "#555", marginBottom: 32, maxWidth: 400 }}>
					Pronto recibirás un email con los detalles de tu compra. Podés seguir el estado
					desde tu perfil en <strong>Historial de pedidos</strong>.
				</p>
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
					<Link
						to="/profile"
						style={{
							padding: "12px 28px",
							background: "#810000",
							color: "#fff",
							borderRadius: 6,
							fontWeight: 700,
							textDecoration: "none",
							fontSize: "1rem",
						}}>
						Ver mis pedidos
					</Link>
					<Link
						to="/catalog"
						style={{
							padding: "12px 28px",
							background: "#f5f5f7",
							color: "#1a1a1a",
							borderRadius: 6,
							fontWeight: 700,
							textDecoration: "none",
							fontSize: "1rem",
						}}>
						Seguir comprando
					</Link>
				</div>
			</div>
		</>
	);
};

export default CheckoutSuccess;
