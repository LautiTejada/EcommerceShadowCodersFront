import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sileo } from "sileo";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login, loading } = useAuth();
	const [localError, setLocalError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError(null);
		try {
			await login({ username, password });
			sileo.success({
				title: "¡Bienvenido!",
				description: "Inicio de sesión exitoso.",
				type: "success",
			});
			// Si el login es exitoso, el usuario será redirigido automáticamente
		} catch (err: unknown) {
			// Manejo de errores local
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
					style={{ width: "100%" }}>
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
						/>
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
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="modern-btn"
						aria-busy={loading}>
						{loading ? "CARGANDO..." : "INICIAR SESIÓN"}
					</button>
				</form>
				<p style={{ color: "#ccc", marginTop: 18 }}>
					¿Eres nuevo?{" "}
					<a
						href="/register"
						style={{ color: "#b00", textDecoration: "underline" }}>
						Regístrate
					</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
