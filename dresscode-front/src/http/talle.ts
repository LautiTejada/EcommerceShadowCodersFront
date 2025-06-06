import type { Producto } from "../types/Producto";
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

export const activarTalle = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/talles/${id}/activate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error activating talle:', error);
    throw error;
  }
}

export const desactivarTalle = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/talles/${id}/desactivate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deactivating talle:', error);
    throw error;
  }
}

export const asignarTalleAProducto = async (productoId: Producto, talleId: Talle) => {
  try {
    const response = await fetch(`${baseUrl}/${talleId.id}/productos/${productoId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error assigning talle to producto:', error);
    throw error;
  }
}

export const eliminarTalleDeProducto = async (productoId: Producto, talleId: Talle) => {
  try {
    const response = await fetch(`${baseUrl}/${talleId.id}/productos/${productoId.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing talle from producto:', error);
    throw error;
  }
}