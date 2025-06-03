import type { DetalleOrden } from "./DetalleOrden";
import type { Direccion } from "./Direccion";
import type { EstadoOrden } from "./enums/EstadoOrden";
import type { MetodoPago } from "./enums/MetodoPago";
import type { Usuario } from "./Usuario";

export interface OrdenDeCompra {
    id?: number;
    usuario: Usuario;
    direccion: Direccion; 
    fecha: string;
    precioTotal: number;
    metodoPago: MetodoPago; 
    estadoOrden: EstadoOrden; 
    detalles?: DetalleOrden[];
}