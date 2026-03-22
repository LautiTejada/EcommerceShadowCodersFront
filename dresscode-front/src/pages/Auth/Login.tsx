import "./Auth.css";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sileo } from "sileo";
import { validateForm, isRequired } from "../../utils/validate";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login, loading } = useAuth();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [localError, setLocalError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError(null);
		// Validación centralizada
		const fields = { username, password };
		const rules = {
			username: [isRequired],
			password: [isRequired],
		};
		const validationErrors = validateForm(fields, rules);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) {
			sileo.error({
				title: "Error",
				description: "Completa todos los campos requeridos.",
				type: "error",
			});
			return;
		}
		try {
			await login({ username, password });
			sileo.success({
				title: "¡Bienvenido!",
				description: "Inicio de sesión exitoso.",
				type: "success",
			});
			// Si el login es exitoso, el usuario será redirigido automáticamente
		} catch (err: unknown) {
			if (err instanceof Error) {
				setLocalError(err?.message || "Error al iniciar sesión");
				sileo.error({
					title: "Error",
					description: err?.message || "Error al iniciar sesión",
					type: "error",
				});
			}
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-form">
				<h1
					id="login-title"
					style={{
						letterSpacing: 1,
						fontWeight: 700,
						fontSize: "2rem",
						color: "#fff",
					}}>
					Iniciar sesión
				</h1>
				<p style={{ color: "#ccc", marginBottom: 24 }}>
					¡Bienvenido de vuelta!
				</p>
				<form
					onSubmit={handleSubmit}
					autoComplete="on"
					style={{ width: "100%" }}
					role="form"
					aria-labelledby="login-title">
					{localError && (
						<div className="error" role="alert">
							{localError}
						</div>
					)}
					<div>
						<label htmlFor="username">Nombre de usuario</label>
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
							aria-describedby={errors.username ? "username-error" : undefined}
						/>
						{errors.username && (
							<div className="error" id="username-error" role="alert">
								{errors.username}
							</div>
						)}
					</div>
					<div>
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password"
							placeholder="Tu contraseña"
							required
							aria-invalid={!!errors.password}
							aria-describedby={errors.password ? "password-error" : undefined}
						/>
						{errors.password && (
							<div className="error" id="password-error" role="alert">
								{errors.password}
							</div>
						)}
					</div>
					<button type="submit" disabled={loading} style={{ marginTop: 24 }}>
						{loading ? "Cargando..." : "Iniciar sesión"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
