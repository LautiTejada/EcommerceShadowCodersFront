import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await register({ name, email, password });
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Placeholder para el logo */}

        <h1>Crear cuenta</h1>
        <p>Bienvenido al team!</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">NOMBRE</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
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
