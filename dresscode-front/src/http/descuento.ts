
import type { Descuento } from "../types/Descuento";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

  try {
    return await apiFetch(`${baseUrl}/descuentos`);
  } catch (error) {
    console.error("Error fetching descuentos:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/descuentos/active`);
  } catch (error) {
    console.error("Error fetching descuentos:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/descuentos/save`, {
      method: "POST",
      body: JSON.stringify(descuento),
    });
  } catch (error) {
    console.error("Error creating descuento:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/descuentos/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(descuento),
    });
  } catch (error) {
    console.error("Error updating descuento:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/descuentos/${id}`);
  } catch (error) {
    console.error(`Error fetching descuento with id ${id}:`, error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/descuentos/${id}/status`, {
      method: "PUT",
    });
  } catch (error) {
    console.error(`Error changing status of descuento with id ${id}:`, error);
    throw error;
  }
};

export const traerProductosPorDescuento = async (descuentoId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/descuentos/${descuentoId}/productos`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching descuentos:", error);
    throw error;
  }
};

export const agregarProductoADescuento = async (
  descuentoId: number,
  productoId: number
) => {
  try {
    const response = await fetch(
      `${baseUrl}/descuentos/${descuentoId}/productos/${productoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      // @ts-ignore
      error.status = response.status;
      throw error;
    }
    return response.status;
  } catch (error) {
    console.error("Error creating descuento producto:", error);
    throw error;
  }
};

export const eliminarProductoDeDescuento = async (
  descuentoId: number,
  productoId: number
) => {
  try {
    const response = await fetch(
      `${baseUrl}/descuentos/${descuentoId}/productos/${productoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  } catch (error) {
    console.error("Error eliminando producto de descuento:", error);
    throw error;
  }
};

export const activarDescuento = async (id: number): Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}/activate`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error activating descuento with id ${id}:`, error);
    throw error;
  }
};

export const desactivarDescuento = async (id: number): Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}/deactivate`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deactivating descuento with id ${id}:`, error);
    throw error;
  }
};
