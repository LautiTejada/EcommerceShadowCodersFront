import { Helmet } from "react-helmet-async";
import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../http/auth";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!email.trim()) {
			setError("Ingresá tu email");
			return;
		}
		setLoading(true);
		try {
			await forgotPassword(email.trim());
			setSent(true);
		} catch {
			// El backend siempre responde 200, si hay error es de red
			setError("No se pudo enviar el email. Intentá de nuevo.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Helmet>
				<title>Recuperar contraseña | DressCode</title>
				<meta name="robots" content="noindex" />
			</Helmet>
			<div className="auth-container">
				<div className="auth-form">
					{sent ? (
						<>
							<div style={{ textAlign: "center", marginBottom: 24 }}>
								<svg
									width="56"
									height="56"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#810000"
									strokeWidth="1.5"
									style={{ margin: "0 auto 16px", display: "block" }}>
									<rect x="2" y="4" width="20" height="16" rx="2" />
									<path d="M2 7l10 7 10-7" />
								</svg>
								<h1 style={{ color: "#fff", fontSize: "1.5rem", margin: "0 0 8px" }}>
									¡Revisá tu email!
								</h1>
								<p style={{ color: "#aaa", lineHeight: 1.6 }}>
									Si el email que ingresaste está registrado, vas a recibir un
									enlace para restablecer tu contraseña en los próximos minutos.
								</p>
							</div>
							<p className="auth-footer">
								<Link to="/login">Volver al inicio de sesión</Link>
							</p>
						</>
					) : (
						<>
							<h1
								id="forgot-title"
								style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 700, margin: "0 0 8px" }}>
								Recuperar contraseña
							</h1>
							<p style={{ color: "#ccc", marginBottom: 24 }}>
								Ingresá tu email y te enviamos un enlace para crear una nueva contraseña.
							</p>
							<form
								onSubmit={handleSubmit}
								style={{ width: "100%" }}
								aria-labelledby="forgot-title">
								{error && (
									<div className="error" role="alert">
										{error}
									</div>
								)}
								<div>
									<label htmlFor="forgot-email">Correo electrónico</label>
									<input
										type="email"
										id="forgot-email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										placeholder="tu@email.com"
										required
									/>
								</div>
								<button type="submit" className="auth-btn" disabled={loading}>
									{loading ? "Enviando..." : "Enviar enlace"}
								</button>
							</form>
							<p className="auth-footer">
								<Link to="/login">Volver al inicio de sesión</Link>
							</p>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default ForgotPassword;
