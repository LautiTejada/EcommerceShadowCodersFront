import type { Categoria } from "./Categoria";

export interface Tipo {
    id?: number;
    nombre: string;
    activo: boolean;
    categorias?: Categoria[];
}