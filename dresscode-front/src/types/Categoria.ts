import type { Producto } from "./Producto";
import type { Tipo } from "./Tipo";

export interface Categoria {
  id?: number; 
  activo: boolean;
  nombreCategoria: string;
  tipo?: number | Tipo;
  productos?: Producto[];
}