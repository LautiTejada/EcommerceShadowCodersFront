const baseUrl = import.meta.env.VITE_API_URL;

export const getDetalleOrden = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/detalleOrden/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching detalle orden:", error);
    throw error;
  }
};

export const crearDetalleOrden = async (detalle: {
  ordenId: string;
  productoId: string;
  cantidad: number;
}) => {
  try {
    const response = await fetch(`${baseUrl}/detalleOrden`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detalle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating detalle orden:", error);
    throw error;
  }
};
export const eliminarDetalleOrden = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/detalleOrden/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting detalle orden:", error);
    throw error;
  }
};
export const actualizarDetalleOrden = async (
  id: string,
  detalle: { ordenId: string; productoId: string; cantidad: number }
) => {
  try {
    const response = await fetch(`${baseUrl}/detalleOrden/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detalle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating detalle orden:", error);
    throw error;
  }
};
