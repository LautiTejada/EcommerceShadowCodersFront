import { Navigate } from "react-router-dom";
import { useUsuarioStore } from "../../store/userStore";
import type { JSX } from "react";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { usuarioActual } = useUsuarioStore();

  if (!usuarioActual) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" />;
  }

  if (usuarioActual.rol !== "ADMIN") {
    // Redirigir al home si no es administrador
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
