import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "../../../store/userStore";

interface PrivateRouteProps {
	children: ReactNode;
}

import Loader from "../../ui/Loader/Loader";

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const usuarioActual = useUsuarioStore((s: any) => s.usuarioActual);
	const cargando = useUsuarioStore((s: any) => s.cargando);
	const error = useUsuarioStore((s: any) => s.error);
	const obtenerUsuarioPorId = useUsuarioStore(
		(s: any) => s.obtenerUsuarioPorId,
	);
	const [loadAttempted, setLoadAttempted] = useState(false);

	const tieneToken = Boolean(localStorage.getItem("token"));
	const usuarioId = localStorage.getItem("usuario");

	// Si hay token pero no hay usuarioActual en el store, cargar el usuario
	useEffect(() => {
		if (
			tieneToken &&
			!usuarioActual &&
			!cargando &&
			!loadAttempted &&
			usuarioId
		) {
			setLoadAttempted(true);
			obtenerUsuarioPorId(Number(usuarioId)).catch((err: any) => {
				console.error("Error cargando usuario en PrivateRoute:", err);
			});
		}
	}, [
		tieneToken,
		usuarioActual,
		cargando,
		loadAttempted,
		usuarioId,
		obtenerUsuarioPorId,
	]);

	// Si está cargando el usuario
	if (cargando || (tieneToken && !usuarioActual && loadAttempted)) {
		return <Loader />;
	}

	// Si no hay usuario y no hay token, redirigir a login
	if (!usuarioActual || !tieneToken) {
		return <Navigate to="/login" replace />;
	}

	// Si hay usuario, mostrar contenido
	return <>{children}</>;
};

export default PrivateRoute;
