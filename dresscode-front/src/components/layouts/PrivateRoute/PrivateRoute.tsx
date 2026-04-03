import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUsuarioStore } from "../../../store/userStore";

interface PrivateRouteProps {
	children: ReactNode;
}

import Loader from "../../ui/Loader/Loader";

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);
	const cargando = useUsuarioStore((s: any) => s.cargando);

	// Si está cargando, o si hay token pero el usuario aún no se cargó en el store, esperar
	const tieneToken = Boolean(localStorage.getItem("token"));
	if (cargando || (tieneToken && !usuarioActual)) {
		return <Loader />;
	}
	if (!usuarioActual) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

export default PrivateRoute;
