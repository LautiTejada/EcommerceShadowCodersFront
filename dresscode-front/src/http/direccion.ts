import type { Direccion } from "../types/Direccion";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDirecciones = async () => {
  try {
    const response = await fetch(`${baseUrl}/direcciones`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching direcciones:', error);
    throw error;
  }
}

export const crearDireccion = async (direccion : Direccion) => {
  try {
    const response = await fetch(`${baseUrl}/direcciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(direccion),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating direccion:', error);
    throw error;
  }
}

export const actualizarDireccion = async (id: number, direccion: Direccion) => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(direccion),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating direccion:', error);
    throw error;
  }
}