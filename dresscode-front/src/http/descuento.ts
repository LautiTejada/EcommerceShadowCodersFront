import type { Descuento } from "../types/Descuento";

const baseUrl = import.meta.env.VITE_API_URL;

export const getDescuentos = async () : Promise<Descuento[]> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching descuentos:', error);
    throw error;
  }
}

export const getDescuentosActivos = async () : Promise<Descuento[]> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching descuentos:', error);
    throw error;
  }
}

export const crearDescuento = async (descuento : Descuento) : Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(descuento),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating descuento:', error);
    throw error;
  }
}


export const actualizarDescuento = async (id: number, descuento: Descuento) : Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(descuento),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating descuento:', error);
    throw error;
  }
}

export const getDescuentoById = async (id: number) : Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching descuento with id ${id}:`, error);
    throw error;
  }
}

export const cambiarEstadoDescuento = async (id: number) : Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}/status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error changing status of descuento with id ${id}:`, error);
    throw error;
  }
}

export const traerProductosPorDescuento = async (descuentoId: number) => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${descuentoId}/productos`)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
  } catch (error) {
    console.error('Error fetching descuentos:', error);
    throw error;
  }
}

export const agregarProductoADescuento = async (descuentoId : number, productoId: number) =>{
  try {
    const response = await fetch(`${baseUrl}/descuentos/${descuentoId}/productos/${productoId}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  } catch (error) {
    console.error('Error creating descuento producto:', error);
    throw error;
  }
}

export const eliminarProductoDeDescuento = async (descuentoId: number, productoId: number) => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${descuentoId}/productos/${productoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status; // o return true;
  } catch (error) {
    console.error('Error eliminando producto de descuento:', error);
    throw error;
  }
}


export const activarDescuento = async (id: number) : Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}/activate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error activating descuento with id ${id}:`, error);
    throw error;
  }
}

export const desactivarDescuento = async (id: number) : Promise<Descuento> => {
  try {
    const response = await fetch(`${baseUrl}/descuentos/${id}/deactivate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deactivating descuento with id ${id}:`, error);
    throw error;
  }
}