import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

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
      // Si el login es exitoso, el usuario será redirigido automáticamente
    } catch (err: unknown) {
      // Manejo de errores local
      if (err instanceof Error) {
        setLocalError(err?.message || "Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Iniciar Sesión</h1>
        <p>Bienvenido de vuelta!</p>
        <form onSubmit={handleSubmit}>
          {localError && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {localError}
            </div>
          )}
          <div>
            <label htmlFor="text">NOMBRE DE USUARIO</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" disabled={loading}>
            {loading ? "CARGANDO..." : "INICIAR SESIÓN"}
          </button>
        </form>
        <p>
          ¿Eres nuevo? <a href="/register">REGÍSTRATE</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
