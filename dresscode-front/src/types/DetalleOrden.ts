import type { ProductoTalle } from "./ProductoTalle";

export interface DetalleOrden {
  id?: number; 
  ordenDeCompraId: number; 
  productoTalle: ProductoTalle;
  cantidad: number;
  precioUnitario: number;
}