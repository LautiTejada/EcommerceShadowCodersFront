import type { Categoria } from "../types/Categoria";
import type { ImagenProducto } from "../types/ImagenProducto";
import type { Producto } from "../types/Producto";

const baseUrl = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  try {
    const response = await fetch(`${baseUrl}/productos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
}

export const getProductosActivos = async () => {
  try {
    const response = await fetch(`${baseUrl}/productos/active`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching active productos:', error);
    throw error;
  }
}

export const addProductoConCategoria = async (producto: Producto, categoriaId:number ) => {
  try {
    const response = await fetch(`${baseUrl}/productos/${categoriaId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating producto with category:', error);
    throw error;
  }
}

export const getProductoById = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/productos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching producto:', error);
    throw error;
  }
}


export const updateProducto = async (id: number, producto: Producto) => {
  try {
    const response = await fetch(`${baseUrl}/productos/${id}/editar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating producto:', error);
    throw error;
  }
}



export const activateProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/productos/${id}/activate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error activating producto:', error);
    throw error;
  }
}

export const desactivateProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/productos/${id}/deactivate`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deactivating producto:', error);
    throw error;
  }
}

export const getProductosPorCategoria = async (categoria: Categoria) => {
  try {
    const response = await fetch(`${baseUrl}/productos/categoria/${categoria.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching productos by category:', error);
    throw error;
  }
}


//revisarlo proximamente
export const crearImagenProducto = async (imagenId: number, imagen: ImagenProducto) => {
  try {
    const formData = new FormData();
    formData.append('file', imagen.urlImagen);

    const response = await fetch(`${baseUrl}/productos/${imagenId}/imagen`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
}

//REvisar tambien proximamente
export const editarImagenProducto = async (id: number, imagen: ImagenProducto) => {
  try {
    const formData = new FormData();
    formData.append('file', imagen.urlImagen);

    const response = await fetch(`${baseUrl}/productos/${id}/imagen`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product image:', error);
    throw error;
  }
}

//Revisar
export const getImagenesProducto = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/productos/${id}/imagenes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
}

//Revisar
export const eliminarImagenProducto = async (id: number) => { 
  try {
    const response = await fetch(`${baseUrl}/productos/${id}/imagen`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting product image:', error);
    throw error;
  }
}

export const getProductosFiltrados = async(filtros: any) => {
    const params = new URLSearchParams();

    if (filtros.tipos?.length) filtros.tipos.forEach((id: string) => params.append("tipoIds", id));
    if (filtros.categorias?.length) filtros.categorias.forEach((id: string) => params.append("categoriaIds", id));
    if (filtros.marcas?.length) filtros.marcas.forEach((marca: string) => params.append("marcas", marca));
    if (filtros.precioMin) params.append("precioMin", filtros.precioMin);
    if (filtros.precioMax) params.append("precioMax", filtros.precioMax);

    const response = await fetch(`${baseUrl}/productos/filtrar?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};