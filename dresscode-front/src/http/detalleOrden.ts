
import type { DetalleOrden } from "../types/DetalleOrden";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

  try {
    return await apiFetch(`${baseUrl}/detalles-orden/${id}`);
  } catch (error) {
    console.error("Error fetching detalle orden:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/detalles-orden`);
  } catch (error) {
    console.error("Error fetching detalles orden:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/detalles-orden/active`);
  } catch (error) {
    console.error("Error fetching detalles orden activos:", error);
    throw error;
  }
};


  try {
    return await apiFetch(`${baseUrl}/detalles-orden`, {
      method: "POST",
      body: JSON.stringify(detalle),
    });
  } catch (error) {
    console.error("Error creating detalle orden:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/detalles-orden/${detalleId}`, {
      method: "PUT",
      body: JSON.stringify({ cantidad: nuevaCantidad }),
    });
  } catch (error) {
    console.error("Error updating detalle orden:", error);
    throw error;
  }
};


  try {
    return await apiFetch(`${baseUrl}/detalles-orden/orden/${ordenId}`);
  } catch (error) {
    console.error("Error fetching detalles orden by orden id:", error);
    throw error;
  }
};

