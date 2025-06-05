import type { DetalleOrden } from "../types/DetalleOrden";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDetalleOrden = async (id: number) => {
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

export const crearDetalleOrden = async (detalle: DetalleOrden) => {
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

export const actualizarDetalleOrden = async (
  id: number,
  detalle: DetalleOrden
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
