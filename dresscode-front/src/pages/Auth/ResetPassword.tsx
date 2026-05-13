import { Helmet } from "react-helmet-async";
import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../http/auth";

function ResetPassword() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") ?? "";
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [done, setDone] = useState(false);

	if (!token) {
		return (
			<div className="auth-container">
				<div className="auth-form">
					<p style={{ color: "#ef4444", textAlign: "center" }}>
						Enlace inválido. Solicitá uno nuevo desde{" "}
						<Link to="/forgot-password">acá</Link>.
					</p>
				</div>
			</div>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (password.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres");
			return;
		}
		if (password !== confirm) {
			setError("Las contraseñas no coinciden");
			return;
		}
		setLoading(true);
		try {
			await resetPassword(token, password);
			setDone(true);
			setTimeout(() => navigate("/login"), 2500);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Token inválido o expirado");
		} finally {
			setLoading(false);
		}
	};

	const EyeIcon = ({ open }: { open: boolean }) =>
		open ? (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
				<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
				<line x1="1" y1="1" x2="23" y2="23" />
			</svg>
		) : (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		);

	return (
		<>
			<Helmet>
				<title>Nueva contraseña | DressCode</title>
				<meta name="robots" content="noindex" />
			</Helmet>
			<div className="auth-container">
				<div className="auth-form">
					{done ? (
						<div style={{ textAlign: "center" }}>
							<svg
								width="56"
								height="56"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#10b981"
								strokeWidth="1.5"
								style={{ margin: "0 auto 16px", display: "block" }}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
							</svg>
							<h1 style={{ color: "#fff", fontSize: "1.5rem", margin: "0 0 8px" }}>
								¡Contraseña actualizada!
							</h1>
							<p style={{ color: "#aaa" }}>
								Vas a ser redirigido al inicio de sesión...
							</p>
						</div>
					) : (
						<>
							<h1
								id="reset-title"
								style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 700, margin: "0 0 8px" }}>
								Nueva contraseña
							</h1>
							<p style={{ color: "#ccc", marginBottom: 24 }}>
								Elegí una contraseña segura para tu cuenta.
							</p>
							<form
								onSubmit={handleSubmit}
								style={{ width: "100%" }}
								aria-labelledby="reset-title">
								{error && (
									<div className="error" role="alert">
										{error}
									</div>
								)}
								<div>
									<label htmlFor="new-password">Nueva contraseña</label>
									<div className="password-wrapper">
										<input
											type={showPassword ? "text" : "password"}
											id="new-password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Mínimo 6 caracteres"
											autoComplete="new-password"
											required
										/>
										<button
											type="button"
											className="password-toggle"
											onClick={() => setShowPassword((v) => !v)}
											aria-label={showPassword ? "Ocultar" : "Mostrar"}>
											<EyeIcon open={showPassword} />
										</button>
									</div>
								</div>
								<div>
									<label htmlFor="confirm-password">Confirmar contraseña</label>
									<div className="password-wrapper">
										<input
											type={showConfirm ? "text" : "password"}
											id="confirm-password"
											value={confirm}
											onChange={(e) => setConfirm(e.target.value)}
											placeholder="Repetí la contraseña"
											autoComplete="new-password"
											required
										/>
										<button
											type="button"
											className="password-toggle"
											onClick={() => setShowConfirm((v) => !v)}
											aria-label={showConfirm ? "Ocultar" : "Mostrar"}>
											<EyeIcon open={showConfirm} />
										</button>
									</div>
								</div>
								<button type="submit" className="auth-btn" disabled={loading}>
									{loading ? "Guardando..." : "Guardar contraseña"}
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default ResetPassword;
