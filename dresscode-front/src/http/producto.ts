//Revisar si el archivo es correcto

const baseUrl = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  try {
    const response = await fetch(`${baseUrl}/productos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
}

export const crearProducto = async (producto: { nombre: string, precio: number, descripcion: string, categoria: string }) => {
  try {
    const response = await fetch(`${baseUrl}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating producto:', error);
    throw error;
  }
}
