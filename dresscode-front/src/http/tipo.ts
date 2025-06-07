import type { Tipo } from "../types/Tipo";

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  if (response.status === 204) return null;
  return response.json();
};

const baseUrl = import.meta.env.VITE_API_URL;

export const getTipos = async (): Promise<Tipo[]> => {
  const response = await fetch(`${baseUrl}/tipos`);
  return handleResponse(response);
};

export const getTiposActivos = async (): Promise<Tipo[]> => {
  const response = await fetch(`${baseUrl}/tipos/active`);
  return handleResponse(response);
};

export const getTipoById = async (id: number): Promise<Tipo | null> => {
  const response = await fetch(`${baseUrl}/tipos/${id}`);
  if (response.status === 404) return null;
  return handleResponse(response);
}

export const addTipo = async (tipo: Tipo) => {
  const response = await fetch(`${baseUrl}/tipos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipo),
  });
  return handleResponse(response);
};

export const updateTipo = async ( id: number, tipo: Tipo) => {
  const response = await fetch(`${baseUrl}/tipos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipo),
  });
  return handleResponse(response);
};

export const toggleStatusTipo = async (id: number) => {
  const response = await fetch(`${baseUrl}/tipos/${id}/status`, {
    method: "PUT",
  });
  return handleResponse(response);
};

export const activateTipo = async (id: number) => {
  const response = await fetch(`${baseUrl}/tipos/${id}/activate`, {
    method: "PUT",
  });
  return handleResponse(response);
}

export const desactivateTipo = async (id: number) => {
  const response = await fetch(`${baseUrl}/tipos/${id}/deactivate`, {
    method: "PUT",
  });
  return handleResponse(response);
}

export const getCategoriasByTipo = async (tipoId: number) => {
  const response = await fetch(`${baseUrl}/tipos/${tipoId}/categorias`);
  if (response.status === 404) return [];
  return handleResponse(response);
}

