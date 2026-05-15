import { Helmet } from "react-helmet-async";
import "./Auth.css";

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { useUsuarioStore } from "../../store/userStore";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { login, loginConGoogle, loading } = useAuth();
	const [errors] = useState<Record<string, string>>({});
	const [localError, setLocalError] = useState<string | null>(null);
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);

	if (usuarioActual) {
		return <Navigate to="/" replace />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError(null);
		try {
			await login({ username, password });
		} catch (err) {
			setLocalError(
				err instanceof Error ? err.message : "Error al iniciar sesión",
			);
		}
	};

	return (
		<>
			<Helmet>
				<title>Iniciar sesión | DressCode</title>
				<meta
					name="description"
					content="Accede a tu cuenta DressCode para comprar moda urbana y deportiva."
				/>
				<meta name="robots" content="noindex, follow" />
			</Helmet>
			<div className="auth-container">
				<div className="auth-card">
					{/* Body */}
					<div className="auth-card-body">
						<h1 className="auth-heading" id="login-title">
							Bienvenido de vuelta
						</h1>
						<p className="auth-subheading">Ingresá a tu cuenta para continuar</p>

						{localError && (
							<div className="error" role="alert">
								{localError}
							</div>
						)}

						<form
							onSubmit={handleSubmit}
							autoComplete="on"
							role="form"
							aria-labelledby="login-title">
							{/* Campo Usuario */}
							<div className="field-wrapper">
								<label htmlFor="username" className="field-label">
									Nombre de usuario
								</label>
								<div className="input-group">
									<svg
										className="input-icon"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2">
										<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
										<circle cx="12" cy="7" r="4" />
									</svg>
									<input
										type="text"
										id="username"
										name="username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										autoComplete="username"
										placeholder="Tu usuario"
										required
										aria-invalid={!!errors.username}
										aria-describedby={
											errors.username ? "username-error" : undefined
										}
									/>
								</div>
								{errors.username && (
									<div className="error" id="username-error" role="alert">
										{errors.username}
									</div>
								)}
							</div>

							{/* Campo Contraseña */}
							<div className="field-wrapper">
								<label htmlFor="password" className="field-label">
									Contraseña
								</label>
								<div className="input-group">
									<svg
										className="input-icon"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2">
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
										<path d="M7 11V7a5 5 0 0 1 10 0v4" />
									</svg>
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="current-password"
										placeholder="Tu contraseña"
										required
										aria-invalid={!!errors.password}
										aria-describedby={
											errors.password ? "password-error" : undefined
										}
									/>
									<button
										type="button"
										className="password-toggle"
										onClick={() => setShowPassword((v) => !v)}
										aria-label={
											showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
										}>
										{showPassword ? (
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2">
												<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
												<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
												<line x1="1" y1="1" x2="23" y2="23" />
											</svg>
										) : (
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2">
												<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
												<circle cx="12" cy="12" r="3" />
											</svg>
										)}
									</button>
								</div>
								{errors.password && (
									<div className="error" id="password-error" role="alert">
										{errors.password}
									</div>
								)}
							</div>

							<button
								type="submit"
								className="auth-btn"
								disabled={loading}>
								{loading ? "Cargando..." : "Iniciar sesión"}
							</button>
						</form>

						<div className="auth-divider">o</div>

						<div className="google-btn-wrapper">
							<GoogleLogin
								type="icon"
								shape="square"
								size="large"
								theme="filled_black"
								onSuccess={(credentialResponse) => {
									if (credentialResponse.credential) {
										loginConGoogle(credentialResponse.credential).catch(
											(err) =>
												setLocalError(
													err instanceof Error
														? err.message
														: "Error al iniciar sesión",
												),
										);
									}
								}}
								onError={() => {
									setLocalError("Error al iniciar sesión con Google");
								}}
							/>
						</div>

						<p className="auth-footer">
							¿No tenés cuenta? <Link to="/register">Registrate</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
