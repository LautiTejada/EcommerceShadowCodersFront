import type { Provincia } from "../types/enums/Provincias";

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

export const crearDireccion = async (direccion: { calle: string, ciudad: string, codigoPostal: string, numero: number, localidad: string, provincia: Provincia, pais: string }) => {
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

export const eliminarDireccion = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/direcciones/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting direccion:', error);
    throw error;
  }
}

export const actualizarDireccion = async (id: string, direccion: { calle: string, ciudad: string, codigoPostal: string, numero: number, localidad: string, provincia: Provincia, pais: string }) => {
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