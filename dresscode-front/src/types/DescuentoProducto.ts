import type { Descuento } from "./Descuento";
import type { Producto } from "./Producto";

export interface DescuentoProducto {
  id?: number;
  activo: boolean;
  descuento: Descuento;
  producto: Producto; 
}