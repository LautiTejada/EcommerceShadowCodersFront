import type { Producto } from "./Producto";
import type { Talle } from "./Talle";

export interface ProductoTalle {
  id?: number; 
  producto: Producto; 
  talle: Talle; 
  cantidad: number;
} 