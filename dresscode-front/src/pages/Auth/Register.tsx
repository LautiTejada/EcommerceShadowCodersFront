import { Helmet } from "react-helmet-async";
import "./Auth.css";

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUsuarioStore } from "../../store/userStore";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [localError, setLocalError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { register, loading } = useAuth();
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);

	if (usuarioActual) {
		return <Navigate to="/" replace />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError(null);
		const errs: Record<string, string> = {};
		if (!username.trim()) errs.username = "El nombre es requerido";
		if (!email.trim()) errs.email = "El email es requerido";
		if (password.length < 6)
			errs.password = "La contraseña debe tener al menos 6 caracteres";
		if (password !== confirmPassword)
			errs.confirmPassword = "Las contraseñas no coinciden";
		if (Object.keys(errs).length > 0) {
			setFieldErrors(errs);
			return;
		}
		setFieldErrors({});
		try {
			await register({ username, email, password });
		} catch (err) {
			setLocalError(
				err instanceof Error ? err.message : "Error al registrarse",
			);
		}
	};

	return (
		<>
			<Helmet>
				<title>Crear cuenta | DressCode</title>
				<meta
					name="description"
					content="Registrate en DressCode y accede a las mejores ofertas en moda urbana y deportiva."
				/>
				<meta name="robots" content="noindex, follow" />
			</Helmet>
			<div className="auth-container">
				<div className="auth-form">
					<h1 id="register-title">Crear cuenta</h1>
					<p>¡Bienvenido al team!</p>
					<form
						onSubmit={handleSubmit}
						role="form"
						aria-labelledby="register-title"
						autoComplete="on"
						style={{ width: "100%" }}>
						{localError && (
							<div className="error" role="alert" style={{ marginBottom: 12 }}>
								{localError}
							</div>
						)}
						<div>
							<label htmlFor="reg-username">Nombre de usuario</label>
							<input
								type="text"
								id="reg-username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								autoComplete="username"
								placeholder="Tu usuario"
								required
								aria-invalid={!!fieldErrors.username}
								aria-describedby={
									fieldErrors.username ? "username-error" : undefined
								}
							/>
							{fieldErrors.username && (
								<div className="error" id="username-error" role="alert">
									{fieldErrors.username}
								</div>
							)}
						</div>
						<div>
							<label htmlFor="reg-email">Correo electrónico</label>
							<input
								type="email"
								id="reg-email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								placeholder="Tu email"
								required
								aria-invalid={!!fieldErrors.email}
								aria-describedby={fieldErrors.email ? "email-error" : undefined}
							/>
							{fieldErrors.email && (
								<div className="error" id="email-error" role="alert">
									{fieldErrors.email}
								</div>
							)}
						</div>
						<div>
							<label htmlFor="reg-password">Contraseña</label>
							<div className="password-wrapper">
								<input
									type={showPassword ? "text" : "password"}
									id="reg-password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="new-password"
									placeholder="Mínimo 6 caracteres"
									required
									aria-invalid={!!fieldErrors.password}
									aria-describedby={
										fieldErrors.password ? "password-error" : undefined
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
							{fieldErrors.password && (
								<div className="error" id="password-error" role="alert">
									{fieldErrors.password}
								</div>
							)}
						</div>
						<div>
							<label htmlFor="reg-confirmPassword">Confirmar contraseña</label>
							<div className="password-wrapper">
								<input
									type={showConfirm ? "text" : "password"}
									id="reg-confirmPassword"
									name="confirmPassword"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									autoComplete="new-password"
									placeholder="Repetí tu contraseña"
									required
									aria-invalid={!!fieldErrors.confirmPassword}
									aria-describedby={
										fieldErrors.confirmPassword
											? "confirmPassword-error"
											: undefined
									}
								/>
								<button
									type="button"
									className="password-toggle"
									onClick={() => setShowConfirm((v) => !v)}
									aria-label={
										showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"
									}>
									{showConfirm ? (
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
							{fieldErrors.confirmPassword && (
								<div className="error" id="confirmPassword-error" role="alert">
									{fieldErrors.confirmPassword}
								</div>
							)}
						</div>
						<button type="submit" className="auth-btn" disabled={loading}>
							{loading ? "Cargando..." : "Crear cuenta"}
						</button>
					</form>
					<p className="auth-footer">
						¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Register;
