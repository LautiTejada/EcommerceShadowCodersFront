import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sileo } from "sileo";

function Register() {
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { register, loading } = useAuth();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null); // Limpiar error anterior
		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden");
			sileo.error({
				title: "Error",
				description: "Las contraseñas no coinciden",
				type: "error",
			});
			return;
		}
		try {
			await register({ username, email, password });
			sileo.success({
				title: "¡Registro exitoso!",
				description: "Tu cuenta fue creada correctamente.",
				type: "success",
			});
		} catch (err: unknown) {
			// Manejo de errores
			if (err instanceof Error) {
				let msg = err?.message || "Error en el registro";
				if (
					msg.includes("Duplicate entry") &&
					msg.includes("for key") &&
					msg.includes("email")
				) {
					msg = "El email ya está registrado";
				}
				setError(msg);
				sileo.error({
					title: "Error",
					description: msg,
					type: "error",
				});
				console.error("Error en el registro:", err);
			}
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-form">
				{/* Placeholder para el logo */}

				<h1 id="register-title">Crear cuenta</h1>
				<p>Bienvenido al team!</p>
				<form onSubmit={handleSubmit} role="form" aria-labelledby="register-title">
					{error && (
						<div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
					)}
					<div>
						<label htmlFor="name">NOMBRE</label>
						<input
							type="text"
							id="name"
							value={username}
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="email">CORREO ELECTRONICO</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="password">CONTRASEÑA</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" disabled={loading} className="modern-btn">
						{loading ? "CARGANDO..." : "CREAR CUENTA"}
					</button>
				</form>
				<p>
					Ya sos parte? <a href="/login">INICIAR SESION</a>
				</p>
			</div>
		</div>
	);
}

export default Register;
