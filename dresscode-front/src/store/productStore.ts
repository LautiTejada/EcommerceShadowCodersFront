import { create } from 'zustand';

interface Category {
  id: number;
  nombre: string;
  idTipo: number;
}

interface Product {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  color: string;
  marca: string;
  idCategoria: number;
}

interface Talle {
  id: number;
  tipoTalle: string;
}

interface ProductState {
  categories: Category[];
  products: Product[];
  talles: Talle[];
  addProduct: (product: Product) => void;
  addCategory: (category: Category) => void;
  addTalle: (talle: Talle) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  categories: [],
  products: [],
  talles: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  addTalle: (talle) => set((state) => ({ talles: [...state.talles, talle] })),
}));
