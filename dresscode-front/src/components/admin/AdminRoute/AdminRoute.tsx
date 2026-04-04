import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUsuarioStore } from "../../../store/userStore";

interface AdminRouteProps {
	children: ReactNode;
}

import Loader from "../../ui/Loader/Loader";

const AdminRoute = ({ children }: AdminRouteProps) => {
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);
	const cargando = useUsuarioStore((s: any) => s.cargando);

	// Si hay token pero el usuario aún no se cargó en el store, esperar
	const tieneToken = Boolean(localStorage.getItem("token"));
	if (cargando || (tieneToken && !usuarioActual)) {
		return <Loader />;
	}
	if (!usuarioActual) {
		return <Navigate to="/login" replace />;
	}
	if (usuarioActual.rol !== "ADMIN") {
		return <Navigate to="/" replace />;
	}
	return <>{children}</>;
};

export default AdminRoute;
