import type { DescuentoProducto } from "./DescuentoProducto";

export interface Descuento {
  id?: number;
  fechaInicio: string; 
  fechaCierre: string;
  porcentajeDescuento: number;
  productos?: DescuentoProducto[]; 
}