
const baseUrl = import.meta.env.VITE_API_URL;

export const getCategorias = async () => {
  try {
    const response = await fetch(`${baseUrl}/categorias`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
}

export const crearCategoria = async (categoria: { nombre: string }) => {
  try {
    const response = await fetch(`${baseUrl}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating categoria:', error);
    throw error;
  }
}

export const eliminarCategoria = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting categoria:', error);
    throw error;
  }
}

export const actualizarCategoria = async (id: string, categoria: { nombre: string }) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating categoria:', error);
    throw error;
  }
}