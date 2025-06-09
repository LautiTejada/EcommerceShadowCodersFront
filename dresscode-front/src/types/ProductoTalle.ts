import type { Talle } from "./Talle";

export interface ProductoTalle {
  id?: number; 
  activo : boolean;
  productoId: number; 
  talle: Talle; 
  cantidad: number;
} 