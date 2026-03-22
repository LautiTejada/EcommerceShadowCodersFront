import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUsuarioStore } from "../../../store/userStore";

interface AdminRouteProps {
	children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);

	if (!usuarioActual) {
		// No logueado
		return <Navigate to="/login" replace />;
	}
	if (usuarioActual.rol !== "ADMIN") {
		// Logueado pero no admin
		return <Navigate to="/" replace />;
	}
	return <>{children}</>;
};

export default AdminRoute;
