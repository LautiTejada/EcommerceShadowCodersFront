import type { Direccion } from "../types/Direccion";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDirecciones = async (): Promise<Direccion[]> => {
  try {
    const response = await fetch(`${baseUrl}/direcciones`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching direcciones:", error);
    throw error;
  }
};

export const getDireccionesActivas = async (): Promise<Direccion[]> => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching direcciones activas:", error);
    throw error;
  }
};

export const getDireccionById = async (id: number): Promise<Direccion> => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching direccion with id ${id}:`, error);
    throw error;
  }
};

export const cambiarEstadoDireccion = async (
  id: number
): Promise<Direccion> => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/${id}/status`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error changing direccion status:", error);
    throw error;
  }
};

export const activarDireccion = async (id: number): Promise<Direccion> => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/${id}/activate`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error activating direccion:", error);
    throw error;
  }
};

export const desactivarDireccion = async (id: number): Promise<Direccion> => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/${id}/deactivate`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deactivating direccion:", error);
    throw error;
  }
};
export const crearDireccionDeUsuario = async (
  usuarioId: number,
  direccion: Direccion
): Promise<Direccion> => {
  try {
    const response = await fetch(
      `${baseUrl}/usuarios/${usuarioId}/direcciones`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(direccion),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creando dirección:", error);
    throw error;
  }
};
