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

export const getUsuarioPorId = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}`);
  return handleResponse(response);
};

export const getUsuariosActivos = async () => {
  const response = await fetch(`${baseUrl}/usuarios/active`);
  return handleResponse(response);
};

export const crearUsuario = async (usuario: {
  nombre: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${baseUrl}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return handleResponse(response);
};

export const actualizarUsuario = async (
  id: number,
  usuario: { nombre: string; email: string; password: string }
) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return handleResponse(response);
};

export const eliminarUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const cambiarEstadoUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}/status`, {
    method: "PUT",
  });
  return handleResponse(response);
};

export const activarUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}/activate`, {
    method: "PUT",
  });
  return handleResponse(response);
};

export const desactivarUsuario = async (id: number) => {
  const response = await fetch(`${baseUrl}/usuarios/${id}/deactivate`, {
    method: "PUT",
  });
  return handleResponse(response);
};
