
import type { Producto } from "../types/Producto";
import type { Talle } from "../types/Talle";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

  try {
    return await apiFetch(`${baseUrl}/talles`);
  } catch (error) {
    console.error('Error fetching talles:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/talles`, {
      method: 'POST',
      body: JSON.stringify(talle),
    });
  } catch (error) {
    console.error('Error creating talle:', error);
    throw error;
  }
}


  try {
    return await apiFetch(`${baseUrl}/talles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(talle),
    });
  } catch (error) {
    console.error('Error updating talle:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/talles/${id}/activate`, {
      method: 'PUT',
    });
  } catch (error) {
    console.error('Error activating talle:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/talles/${id}/desactivate`, {
      method: 'PUT',
    });
  } catch (error) {
    console.error('Error deactivating talle:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/${talleId.id}/productos/${productoId}`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error assigning talle to producto:', error);
    throw error;
  }
}

export const eliminarTalleDeProducto = async (productoId: Producto, talleId: Talle) => {
  try {
    const response = await fetch(`${baseUrl}/${talleId.id}/productos/${productoId.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing talle from producto:', error);
    throw error;
  }
}