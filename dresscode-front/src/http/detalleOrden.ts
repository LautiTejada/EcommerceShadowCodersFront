import type { DetalleOrden } from "../types/DetalleOrden";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDetalleOrdenById = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching detalle orden:", error);
    throw error;
  }
};

export const getDetallesOrden = async () => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching detalles orden:", error);
    throw error;
  }
};

export const getDetallesOrdenActivos = async () => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden/active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching detalles orden activos:", error);
    throw error;
  }
};


export const crearDetalleOrden = async (detalle: DetalleOrden) => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden`, {
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

export const actualizarDetalleOrden = async (detalleId: number, nuevaCantidad: number) => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden/${detalleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cantidad: nuevaCantidad }),
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


export const eliminarDetalleOrden = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden/${id}`, {
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


export const getDetallesOrdenByOrdenId = async (ordenId: number) => {
  try {
    const response = await fetch(`${baseUrl}/detalles-orden/orden/${ordenId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching detalles orden by orden id:", error);
    throw error;
  }
};

