import type { DescuentoProducto } from "./DescuentoProducto";

export interface Descuento {
  id?: number;
  activo: boolean;
  fechaInicio: string; 
  fechaCierre: string;
  porcentajeDescuento: number;
  productos?: DescuentoProducto[]; 
}