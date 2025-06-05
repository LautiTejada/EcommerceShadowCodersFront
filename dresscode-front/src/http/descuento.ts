import type { Descuento } from "../types/Descuento";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDescuentos = async () => {
  try {
    const response = await fetch(`${baseUrl}/descuentos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching descuentos:', error);
    throw error;
  }
}

export const crearDescuento = async (descuento : Descuento) => {
  try {
    const response = await fetch(`${baseUrl}/descuentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(descuento),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating descuento:', error);
    throw error;
  }
}

export const eliminarDescuento = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting descuento:', error);
    throw error;
  }
}

export const actualizarDescuento = async (id: string, descuento: { nombre: string, porcentaje: number }) => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(descuento),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating descuento:', error);
    throw error;
  }
}