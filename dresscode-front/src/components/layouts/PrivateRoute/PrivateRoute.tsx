import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUsuarioStore } from "../../../store/userStore";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);

	if (!usuarioActual) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

export default PrivateRoute;
