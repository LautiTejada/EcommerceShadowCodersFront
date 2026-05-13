import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CheckoutFailure = () => {
	return (
		<>
			<Helmet>
				<title>Pago no completado | DressCode</title>
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
						background: "#810000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 24,
					}}>
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</div>
				<h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>
					El pago no se completó
				</h1>
				<p style={{ color: "#555", fontSize: "1.1rem", marginBottom: 32, maxWidth: 400 }}>
					No se realizó ningún cobro. Podés volver al carrito e intentar nuevamente,
					o elegir otro método de pago.
				</p>
				<div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
					<Link
						to="/cart"
						style={{
							padding: "12px 28px",
							background: "#810000",
							color: "#fff",
							borderRadius: 6,
							fontWeight: 700,
							textDecoration: "none",
							fontSize: "1rem",
						}}>
						Volver al carrito
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

export default CheckoutFailure;
