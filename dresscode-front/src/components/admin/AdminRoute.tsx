import { Navigate } from "react-router-dom";
import { useUsuarioStore } from "../../store/userStore";
import type { JSX } from "react";

interface AdminRouteProps {
	children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
	const { usuarioActual } = useUsuarioStore();

	if (!usuarioActual) {
		return <Navigate to="/login" />;
	}

	if (usuarioActual.rol !== "ADMIN") {
		return <Navigate to="/" />;
	}

	return children;
};

export default AdminRoute;
