//Revisar si el archivo es correcto

const baseUrl = import.meta.env.VITE_API_URL;

export const getImagenProducto = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/producto/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching imagen producto:", error);
    throw error;
  }
}

export const eliminarImagenProducto = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/producto/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting imagen producto:', error);
    throw error;
  }
}

