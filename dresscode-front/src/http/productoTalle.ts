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

export const crearProductoTalle = async (productoTalle: { productoId: string, talleId: string, stock: number }) => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles`, {
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

export const eliminarProductoTalle = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/producto-talles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting producto talle:', error);
    throw error;
  }
}

export const actualizarProductoTalle = async (id: string, productoTalle: { productoId: string, talleId: string, stock: number }) => {
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