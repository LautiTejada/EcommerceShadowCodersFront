import type { Talle } from "../types/Talle";

const baseUrl = import.meta.env.VITE_API_URL;

export const getTalle = async () => {
  try {
    const response = await fetch(`${baseUrl}/talles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching talles:', error);
    throw error;
  }
}

export const crearTalle = async (talle: Talle) => {
  try {
    const response = await fetch(`${baseUrl}/talles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(talle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating talle:', error);
    throw error;
  }
}


export const actualizarTalle = async (id: number, talle: Talle) => {
  try {
    const response = await fetch(`${baseUrl}/talles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(talle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating talle:', error);
    throw error;
  }
}
