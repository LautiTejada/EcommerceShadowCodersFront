import { create } from "zustand";
import type { Categoria } from "../types/Categoria";
import type { Producto } from "../types/Producto";
import { activateProducto, addProductoConCategoria, desactivateProducto, getProductoById, getProductos, getProductosActivos, getProductosPorCategoria, updateProducto } from "../http/producto";


interface ProductoState {
    productos: Producto[];
    productosActivos: Producto[];
    productoActual: Producto | null;

    fetchProductos: () => Promise<void>;
    fetchProductosActivos: () => Promise<void>;
    agregarProductoConCategoria: (producto: Producto, categoriaId: number) => Promise<Producto>;
    fetchProductoById: (id: number) => Promise<Producto | null>;
    editarProducto: (id: number, producto: Producto) => Promise<void>;
    activarProducto: (id: number) => Promise<void>;
    desactivarProducto: (id: number) => Promise<void>;
    fetchProductosPorCategoria: (categoria: Categoria) => Promise<void>;
    setProductoActual: (producto: Producto | null) => void;
}


export const useProductoStore = create<ProductoState>((set, get) => ({

    productos: [],
    productosActivos: [],
    productoActual: null,
    
    fetchProductos: async () => {
       try {
         const productosFromApi = await getProductos();
         set({ productos: productosFromApi });
       } catch (error) {
         console.error('Error cargando productos:', error);
       }
    },
    
    fetchProductosActivos: async () => {
       try {
         const activos = await getProductosActivos();
         set({ productosActivos: activos });
       } catch (error) {
         console.error('Error cargando productos activos:', error);
       }
    },
    
    agregarProductoConCategoria: async (producto, categoriaId) => {
       try {
         const nuevoProducto = await addProductoConCategoria(producto, categoriaId);
         get().fetchProductos();
         return nuevoProducto;
      } catch (error) {
         console.error('Error agregando producto con categoría:', error);
         throw error;
      }
    },

    fetchProductoById: async (id) => {
        try {
            return await getProductoById(id);
        } catch (error) {
            console.error(`Error fetching producto by ID ${id}:`, error);
            return null;
        }
    },

    editarProducto: async (id, producto) => {
        try {
            await updateProducto(id, producto);
            await get().fetchProductos();
            await get().fetchProductosActivos();
        } catch (error) {
            console.error(`Error editing producto with ID ${id}:`, error);
        }
    },

    activarProducto: async (id) => {
        try {
            await activateProducto(id);
            await get().fetchProductos();
            await get().fetchProductosActivos();
        } catch (error) {
            console.error(`Error activating producto with ID ${id}:`, error);
        }
    },

    desactivarProducto: async (id) => {
        try {
            await desactivateProducto(id); 
            await get().fetchProductos();
            await get().fetchProductosActivos();
        } catch (error) {
            console.error(`Error deactivating producto with ID ${id}:`, error);
        }
    },

    fetchProductosPorCategoria: async (categoria) => {
        try {
            const productos = await getProductosPorCategoria(categoria);
            set({ productos });
        } catch (error) {
            console.error(`Error fetching productos for category ${categoria.id}:`, error);
        }
    },

    setProductoActual: (producto) => set({ productoActual: producto }),

}));