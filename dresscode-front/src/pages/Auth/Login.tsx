import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      console.error("Error en el login:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Iniciar Sesion</h1>
        <p>Bienvenido de vuelta!</p>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "CARGANDO..." : "INICIAR SESION"}
          </button>
        </form>
        <p>
          Eres nuevo? <a href="/register">REGISTRATE</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
