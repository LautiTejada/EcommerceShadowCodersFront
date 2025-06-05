import type { Categoria } from "../types/Categoria";

const baseUrl = import.meta.env.VITE_API_URL;

export const getCategorias = async () => {
  try {
    const response = await fetch(`${baseUrl}/categorias`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
}

export const getCategoriasActivas = async () => {
  try {
    const response = await fetch(`${baseUrl}/categorias/active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categorias activas:', error);
    throw error;
  }
}

export const getCategoriaById = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching categoria with id ${id}:`, error);
    throw error;
  }
}

export const crearCategoria = async (categoria: Categoria) => {
  try {
    const response = await fetch(`${baseUrl}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating categoria:', error);
    throw error;
  }
}

export const eliminarCategoria = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting categoria:', error);
    throw error;
  }
}

export const actualizarCategoria = async (id: number, categoria: Categoria) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating categoria:', error);
    throw error;
  }
}

export const cambiarEstadoCategoria = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}/status`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error changing categoria status:', error);
    throw error;
  }
}

export const activarCategoria = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}/activate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error activating categoria:', error);
    throw error;
  }
}

export const desactivarCategoria = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/categorias/${id}/deactivate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deactivating categoria:', error);
    throw error;
  }
}