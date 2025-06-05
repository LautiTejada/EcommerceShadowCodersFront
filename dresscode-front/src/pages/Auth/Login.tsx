import "./Auth.css";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Iniciar Sesion</h1>
        <p>Bienvenido de vuelta!</p>
        <div>
          <label htmlFor="email">CORREO ELECTRONICO</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">CONTRASEÑA</label>
          <input type="password" id="password" />
        </div>
        <button>INICIAR SESION</button>
        <p>
          Eres nuevo? <a href="/register">REGISTRATE</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
