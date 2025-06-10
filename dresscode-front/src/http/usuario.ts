import type { Direccion } from "../types/Direccion";
import type { Usuario } from "../types/Usuario";

const baseUrl = import.meta.env.VITE_API_URL;

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  if (response.status === 204) return null;
  return response.json();
};

export const getUsuarios = async () => {
  const response = await fetch(`${baseUrl}/usuarios`);
  return handleResponse(response);
};

export const getUsuariosActivos = async () => {
  const response = await fetch(`${baseUrl}/usuarios/active`);

  return handleResponse(response);
};

export const getUsuarioPorId = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}`);
  return handleResponse(response);
};

export const crearUsuario = async (usuario: Usuario) => {
  const response = await fetch(`${baseUrl}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return handleResponse(response);
};

export const updateUsuario = async (id: number, usuario: Usuario) => {
  try {
    const response = await fetch(`${baseUrl}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: usuario.username,
        email: usuario.email,
        password: usuario.password,
        activo: usuario.activo,
        rol: usuario.rol,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

export const cambiarStateUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}/status`, {
    method: "PUT",
  });
  return handleResponse(response);
};

export const activateUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}/activate`, {
    method: "PUT",
  });
  return handleResponse(response);
};

export const desactivateUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}/deactivate`, {
    method: "PUT",
  });
  return handleResponse(response);
};

export const createDireccionDeUsuario = async (
  usuarioId: number,
  direccion: Direccion
) => {
  const response = await fetch(`${baseUrl}/usuarios/${usuarioId}/direcciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(direccion),
  });
  return handleResponse(response);
};

export const updateDireccionDeUsuario = async (
  usuarioId: number,
  direccionId: number,
  direccion: Direccion
) => {
  const response = await fetch(
    `${baseUrl}/usuarios/${usuarioId}/direcciones/${direccionId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(direccion),
    }
  );
  return handleResponse(response);
};

export const getDireccionesDeUsuario = async (usuarioId: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${usuarioId}/direcciones`);
  return handleResponse(response);
};
