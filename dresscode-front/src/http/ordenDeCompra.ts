import type { EstadoOrden } from "../types/enums/EstadoOrden";
import type { OrdenDeCompra } from "../types/OrdenDeCompra";


const baseUrl = import.meta.env.VITE_API_URL;

export const getOrdenDeCompra = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/ordenes-de-compra/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orden de compra:", error);
    throw error;
  }
};

export const getOrdenesPorUsuario = async (usuarioId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/ordenes-de-compra/usuario/${usuarioId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orden de compra por usuario:", error);
    throw error;
  }
};


export const actualizarDetalleOrdenDeCompra = async (
  detalleId: number,
  ordenDeCompra: EstadoOrden
) => {
  try {
    const response = await fetch(
      `${baseUrl}/ordenes-de-compra/detalle/${detalleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: ordenDeCompra }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating detalle orden:", error);
    throw error;
  }
};

export const crearOrdenDeCompra = async (ordenDeCompra: OrdenDeCompra) => {
  try {
    const response = await fetch(`${baseUrl}/ordenes-de-compra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ordenDeCompra),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating orden de compra:", error);
    throw error;
  }
}