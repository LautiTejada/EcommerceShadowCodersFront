import type { ProductoTalle } from "./ProductoTalle";

export interface Talle {
    id?: number;
    activo: boolean;
    tipoTalle: string;
    productos?: ProductoTalle[];
}

