
import type { ImagenProducto } from "../types/ImagenProducto";

const baseUrl = import.meta.env.VITE_API_URL;

export const getImagenesProducto = async () => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching imagenes producto:", error);
    throw error;
  }
}

export const getImagenesProductoActivas = async () => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching imagenes producto activas:", error);
    throw error;
  }
}

export const getImagenProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching imagen producto:", error);
    throw error;
  }
}

export const crearImagenProducto = async (imagen: ImagenProducto) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imagen),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating imagen producto:", error);
    throw error;
  }
}

export const actualizarImagenProducto = async (id: number, imagen: ImagenProducto) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imagen),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating imagen producto:", error);
    throw error;
  }
}

export const eliminarImagenProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting imagen producto:", error);
    throw error;
  }
}

export const cambiarEstadoImagenProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/${id}/status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error changing estado imagen producto:", error);
    throw error;
  }
}

export const activarImagenProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/${id}/activate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error activating imagen producto:", error);
    throw error;
  }
}

export const desactivarImagenProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/${id}/deactivate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deactivating imagen producto:", error);
    throw error;
  }
}

export const getImagenesProductoByProductoId = async (productoId: number) => {
  try {
    const response = await fetch(`${baseUrl}/imagenes-producto/producto/${productoId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching imagenes producto by producto id:", error);
    throw error;
  }
}


