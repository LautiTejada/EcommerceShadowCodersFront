import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface RegisterData extends UserCredentials {
  name: string;
}

// URL base del API - Asegúrate de que coincida con tu backend
const API_URL = "http://localhost:8080";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);

      // Transformar los datos al formato que espera el backend
      const backendData = {
        username: userData.name,
        email: userData.email,
        password: userData.password,
        activo: true,
        rol: "USER",
      };

      console.log("Enviando datos de registro:", backendData);
      console.log("URL:", `${API_URL}/auth/register`);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(backendData),
      });

      console.log(
        "Respuesta del servidor:",
        response.status,
        response.statusText
      );

      // Intentar leer el cuerpo de la respuesta
      let responseData;
      try {
        responseData = await response.json();
        console.log("Datos de respuesta:", responseData);
      } catch (e) {
        console.error("Error al parsear JSON:", e);
        throw new Error("Error al procesar la respuesta del servidor");
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Error en el registro");
      }

      // Si el registro es exitoso y recibimos un token, lo guardamos
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        // Redirigir directamente al home ya que el usuario está autenticado
        navigate("/");
      } else {
        // Si no hay token, redirigir al login
        navigate("/login");
      }

      return responseData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error en el registro";
      console.error("Error completo:", err);
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

      console.log("Enviando datos de login:", credentials);
      console.log("URL:", `${API_URL}/auth/login`);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      console.log(
        "Respuesta del servidor:",
        response.status,
        response.statusText
      );

      // Intentar leer el cuerpo de la respuesta
      let responseData;
      try {
        responseData = await response.json();
        console.log("Datos de respuesta:", responseData);
      } catch (e) {
        console.error("Error al parsear JSON:", e);
        throw new Error("Error al procesar la respuesta del servidor");
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Error en el login");
      }

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }

      navigate("/");
      return responseData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error en el login";
      console.error("Error completo:", err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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
