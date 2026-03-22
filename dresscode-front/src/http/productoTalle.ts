
import type { ProductoTalle } from "../types/ProductoTalle";
import { apiFetch } from "./apiFetch";
const baseUrl = import.meta.env.VITE_API_URL;

  try {
    return await apiFetch(`${baseUrl}/producto-talles`);
  } catch (error) {
    console.error('Error fetching producto talles:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/producto-talles/crear/${productoId}/talle/${talleId}`, {
      method: 'POST',
      body: JSON.stringify({cantidad}),
    });
  } catch (error) {
    console.error('Error creating producto talle:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/producto-talles/${idProductoTalle}/cantidad`, {
      method: 'PUT',
      body: JSON.stringify({ cantidad }),
    });
  } catch (error) {
    console.error('Error updating producto talle:', error);
    throw error;
  }
}



  try {
    return await apiFetch(`${baseUrl}/producto-talles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productoTalle),
    });
  } catch (error) {
    console.error('Error updating producto talle:', error);
    throw error;
  }
}

  try {
    return await apiFetch(`${baseUrl}/producto-talles/producto/${productoId}/cantidad-total`);
  } catch (error) {
    console.error('Error fetching total producto talles:', error);
    throw error;
  }
}

