// src/http/tipo.ts
import { Tipo } from "../types/tipo";
import { handleResponse } from "./usuario"; // O extraelo a un archivo común si preferís
const baseUrl = import.meta.env.VITE_API_URL;

export const getTipos = async (): Promise<Tipo[]> => {
  const response = await fetch(`${baseUrl}/tipos`);
  return handleResponse(response);
};

export const crearTipo = async (
  tipo: Omit<Tipo, "id" | "activo" | "categorias">
): Promise<Tipo> => {
  const response = await fetch(`${baseUrl}/tipos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipo),
  });
  return handleResponse(response);
};

export const eliminarTipo = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/tipos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const actualizarTipo = async (
  id: number,
  tipo: Partial<Tipo>
): Promise<Tipo> => {
  const response = await fetch(`${baseUrl}/tipos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipo),
  });
  return handleResponse(response);
};

export const cambiarEstadoTipo = async (id: number): Promise<Tipo> => {
  const response = await fetch(`${baseUrl}/tipos/${id}/status`, {
    method: "PUT",
  });
  return handleResponse(response);
};
