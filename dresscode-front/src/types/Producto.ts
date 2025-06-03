import type { Color } from "@mui/material";
import type { Marca } from "./enums/Marca";
import type { Categoria } from "./Categoria";
import type { DescuentoProducto } from "./DescuentoProducto";
import type { ProductoTalle } from "./ProductoTalle";
import type { ImagenProducto } from "./ImagenProducto";

export interface Producto {
    id?: number; 
    nombre: string;
    precio: number;
    descripcion: string;
    color: Color; 
    marca: Marca; 
    categoria: Categoria; 
    descuentos?: DescuentoProducto[]; 
    talles?: ProductoTalle[];
    imagenes?: ImagenProducto[];

}