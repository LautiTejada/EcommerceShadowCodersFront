import { Helmet } from "react-helmet-async";
import "./Auth.css";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { loading } = useAuth();
	const [errors] = useState<Record<string, string>>({});
	const [localError, setLocalError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError(null);
		// ...existing logic for login/validation...
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
								aria-describedby={
									errors.username ? "username-error" : undefined
								}
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
								aria-describedby={
									errors.password ? "password-error" : undefined
								}
							/>
							{errors.password && (
								<div className="error" id="password-error" role="alert">
									{errors.password}
								</div>
							)}
						</div>
						<button type="submit" className="auth-btn" disabled={loading}>
							{loading ? "Cargando..." : "Iniciar sesión"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
