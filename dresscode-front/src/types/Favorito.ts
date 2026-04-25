import type { Producto } from "./Producto";
import type { Usuario } from "./Usuario";

export interface Favorito {
	id: number;
	usuario: Usuario;
	producto: Producto;
	fechaAgregado: string; // ISO 8601 DateTime
	activo: boolean;
}

export type FavoritoResponse = Favorito;
