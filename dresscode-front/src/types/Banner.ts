export interface Marca {
	id: number;
	nombreMarca: string;
}

export interface Banner {
	id: number;
	titulo: string;
	imagenNombre: string;
	marcaId: number;
	marca: Marca;
	orden: number;
	activo: boolean;
	fechaCreacion: string;
	fechaActualizacion: string;
}

export interface CreateBannerRequest {
	titulo: string;
	imagenNombre: string;
	marcaId: number;
	orden: number;
	activo?: boolean;
}
