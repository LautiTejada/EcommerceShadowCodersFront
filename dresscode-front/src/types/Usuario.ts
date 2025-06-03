import type { Direccion } from "./Direccion";

export interface Usuario {
    id?: number;
    activo: boolean;
    username: string;
    email: string;
    password: string;
    direcciones? : Direccion[];
}