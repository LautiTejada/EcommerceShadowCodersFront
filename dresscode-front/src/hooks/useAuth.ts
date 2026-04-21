import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../store/userStore";
import { useFavoritoStore } from "../store/favoritoStore";

interface AuthResponse {
	success: boolean;
	message: string;
	token?: string;
}

interface UserCredentials {
	username: string;
	password: string;
}

interface RegisterData {
	username: string;
	email: string;
	password: string;
}

// URL base del API - Asegúrate de que coincida con tu backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const useAuth = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const register = async (
		userData: RegisterData,
		rol: string = "USER",
	): Promise<AuthResponse> => {
		try {
			setLoading(true);
			setError(null);

			// Transformar los datos al formato que espera el backend
			const backendData = {
				username: userData.username,
				email: userData.email || "", // Asegurarse de que email sea una cadena, incluso si es opcional
				password: userData.password,
				activo: true,
				rol, // Usar el rol dinámico proporcionado
			};

			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "http://localhost:5173",
					"Access-Control-Allow-Credentials": "true",
				},
				credentials: "include",
				mode: "cors",
				body: JSON.stringify(backendData),
			});

			let responseData;
			try {
				responseData = await response.json();
			} catch (e) {
				throw new Error("Error al procesar la respuesta del servidor");
			}

			if (!response.ok) {
				throw new Error(responseData.message || "Error en el registro");
			}

			// Si el registro es exitoso y recibimos un token, lo guardamos
			if (responseData.token) {
				localStorage.setItem("token", responseData.token);
				const usuarioData = responseData.usuario;
				const username =
					responseData.username ?? usuarioData?.username ?? userData.username;
				const userId =
					responseData.id ?? responseData.userId ?? usuarioData?.id;
				// Normalizar el rol a mayúsculas
				const rolRaw = usuarioData?.rol ?? responseData.rol ?? "USER";
				const rol = rolRaw.toUpperCase();
				if (username) localStorage.setItem("username", username);
				if (userId) localStorage.setItem("usuario", String(userId));
				if (rol) localStorage.setItem("rol", rol);

				if (usuarioData) {
					useUsuarioStore.getState().setUsuarioActual(usuarioData);
				} else if (userId) {
					await useUsuarioStore.getState().obtenerUsuarioPorId(Number(userId));
				}
				navigate("/");
			}

			return responseData;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Error en el registro";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const login = async (credentials: UserCredentials): Promise<AuthResponse> => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "http://localhost:5173",
					"Access-Control-Allow-Credentials": "true",
				},
				credentials: "include",
				mode: "cors",
				body: JSON.stringify(credentials),
			});

			let responseData;
			try {
				responseData = await response.json();
			} catch (e) {
				throw new Error("Error al procesar la respuesta del servidor");
			}

			if (!response.ok) {
				throw new Error(responseData.message || "Error en el login");
			}

			if (responseData.token) {
				const userId = responseData.id ?? responseData.userId;
				const username = responseData.username ?? responseData.email;
				// Normalizar el rol: manejar string, array y prefijo ROLE_ de Spring Security
				const rolRaw: string =
					(typeof responseData.rol === "string"
						? responseData.rol
						: Array.isArray(responseData.roles) && responseData.roles.length > 0
							? typeof responseData.roles[0] === "string"
								? responseData.roles[0]
								: (responseData.roles[0]?.authority ?? "USER")
							: Array.isArray(responseData.authorities) &&
								  responseData.authorities.length > 0
								? typeof responseData.authorities[0] === "string"
									? responseData.authorities[0]
									: (responseData.authorities[0]?.authority ?? "USER")
								: "USER") || "USER";
				const rol = rolRaw.toUpperCase().replace(/^ROLE_/, "");

				localStorage.setItem("token", responseData.token);
				if (username) localStorage.setItem("username", username);
				if (userId) localStorage.setItem("usuario", String(userId));
				localStorage.setItem("rol", rol);

				// Setear el usuario en el store directamente desde la respuesta del login
				// (evita llamar a /usuarios/{id} que requiere ADMIN)
				useUsuarioStore.getState().setUsuarioActual({
					id: Number(userId),
					username,
					rol,
					email: responseData.email ?? "",
					activo: true,
					direcciones: responseData.direcciones ?? [],
				} as any);
				// También poblar direccionesUsuario en el store
				if (
					Array.isArray(responseData.direcciones) &&
					responseData.direcciones.length > 0
				) {
					useUsuarioStore
						.getState()
						.setDireccionesUsuario(responseData.direcciones);
				}
			}

			navigate("/");
			return responseData;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Error en el login";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		// Limpiar los stores
		useUsuarioStore.getState().setUsuarioActual(null);
		useFavoritoStore.getState().limpiarFavoritos();

		// Luego limpiar localStorage
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("usuario");
		localStorage.removeItem("rol");

		// Finalmente navegar a login
		navigate("/login");
	};

	return {
		register,
		login,
		logout,
		loading,
		error,
	};
};
