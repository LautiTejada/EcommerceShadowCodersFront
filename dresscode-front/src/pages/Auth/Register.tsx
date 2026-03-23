
import { Helmet } from "react-helmet-async";
import "./Auth.css";

	<>
		<Helmet>
			<title>Crear cuenta | DressCode</title>
			<meta name="description" content="Registrate en DressCode y accede a las mejores ofertas en moda urbana y deportiva." />
			<meta name="robots" content="noindex, follow" />
		</Helmet>
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
						<label htmlFor="email">CORREO ELECTRONICO</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "email-error" : undefined}
						/>
						{errors.email && (
							<div className="error" id="email-error" role="alert">
								{errors.email}
							</div>
						)}
					</div>
					<div>
						<label htmlFor="password">CONTRASEÑA</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
					<div>
						<label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							aria-invalid={!!errors.confirmPassword}
							aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
						/>
						{errors.confirmPassword && (
							<div className="error" id="confirmPassword-error" role="alert">
								{errors.confirmPassword}
							</div>
						)}
					</div>
					<button type="submit" className="auth-btn" disabled={loading}>
						{loading ? "Cargando..." : "Registrarse"}
					</button>
				</form>
			</div>
		</div>
	</>
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
						<label htmlFor="email">CORREO ELECTRONICO</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "email-error" : undefined}
						/>
						{errors.email && (
							<div className="error" id="email-error" role="alert">
								{errors.email}
							</div>
						)}
					</div>
					<div>
						<label htmlFor="password">CONTRASEÑA</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
					<div>
						<label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							aria-invalid={!!errors.confirmPassword}
							aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
						/>
						{errors.confirmPassword && (
							<div className="error" id="confirmPassword-error" role="alert">
								{errors.confirmPassword}
							</div>
						)}
					</div>
					<button type="submit" disabled={loading} style={{ marginTop: 24 }}>
						{loading ? "Cargando..." : "Registrarse"}
					</button>
				</form>
			</div>
		</div>
	);
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
