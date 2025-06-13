import type { ProductoTalle } from "../types/ProductoTalle";

const baseUrl = import.meta.env.VITE_API_URL;

export const getProductoTalles = async () => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching producto talles:', error);
    throw error;
  }
}

export const crearProductoTalle = async (productoTalle: ProductoTalle) => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoTalle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating producto talle:', error);
    throw error;
  }
}

export const actualizarCantidadProductoTalle = async (idProductoTalle: number, cantidad: number) => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles/${idProductoTalle}/cantidad`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cantidad }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating producto talle:', error);
    throw error;
  }
}



export const actualizarProductoTalle = async (id: number, productoTalle: ProductoTalle) => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoTalle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating producto talle:', error);
    throw error;
  }
}

export const obtenerCantidadTotal = async (productoId: number) => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles/producto/${productoId}/cantidad-total`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching total producto talles:', error);
    throw error;
  }
}

