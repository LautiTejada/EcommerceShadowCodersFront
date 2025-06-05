import type { Tipo } from "../types/Tipo";
import { handleResponse } from "./usuario";
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
