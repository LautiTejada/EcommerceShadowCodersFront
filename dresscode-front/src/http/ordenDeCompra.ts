//Revisar si el archivo es correcto

const baseUrl = import.meta.env.VITE_API_URL;

export const getOrdenDeCompra = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/ordenDeCompra/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orden de compra:", error);
    throw error;
  }
}