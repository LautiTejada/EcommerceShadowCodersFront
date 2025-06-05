import "./Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Placeholder para el logo */}

        <h1>Crear cuenta</h1>
        <p>Bienvenido al team!</p>
        <div>
          <label htmlFor="name">NOMBRE</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">CORREO ELECTRONICO</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">CONTRASEÑA</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
          <input type="password" id="confirmPassword" />
        </div>
        <button>CREAR CUENTA</button>
        <p>
          Ya sos parte? <a href="/login">INICIAR SESION</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
