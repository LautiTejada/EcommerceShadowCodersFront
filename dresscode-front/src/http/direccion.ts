
import type { Direccion } from "../types/Direccion";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

  try {
    return await apiFetch(`${baseUrl}/direcciones`);
  } catch (error) {
    console.error("Error fetching direcciones:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/direcciones/active`);
  } catch (error) {
    console.error("Error fetching direcciones activas:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/direcciones/${id}`);
  } catch (error) {
    console.error(`Error fetching direccion with id ${id}:`, error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/direcciones/${id}/status`, {
      method: "PUT",
    });
  } catch (error) {
    console.error("Error changing direccion status:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/direcciones/${id}/activate`, {
      method: "PUT",
    });
  } catch (error) {
    console.error("Error activating direccion:", error);
    throw error;
  }
};

  try {
    return await apiFetch(`${baseUrl}/direcciones/${id}/deactivate`, {
      method: "PUT",
    });
  } catch (error) {
    console.error("Error deactivating direccion:", error);
    throw error;
  }
};
  try {
    return await apiFetch(`${baseUrl}/usuarios/${usuarioId}/direcciones`, {
      method: "POST",
      body: JSON.stringify(direccion),
    });
  } catch (error) {
    console.error("Error creando dirección:", error);
    throw error;
  }
};
