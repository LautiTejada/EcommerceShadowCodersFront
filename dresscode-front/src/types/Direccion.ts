import type { Provincia } from "./enums/Provincias";

export interface Direccion{
    id? : number;
    activo: boolean;
    calle: string;
    numero: number;
    codigoPostal: string;
    localidad: string;
    provincia: Provincia;
    pais: string;
}