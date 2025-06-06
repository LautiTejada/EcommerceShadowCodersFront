import type { ImagenProducto } from "../types/ImagenProducto";

interface imagenProductoState {
    imagenes: ImagenProducto[];
    imagenesActivas: ImagenProducto[];
    fetchImagenes: () => Promise<void>;
    fetchImagenesActivas: () => Promise<void>;
    fetchImagenById: (id: number) => Promise<ImagenProducto | null>;
    toggleStateImagen: (id: number) => Promise<void>;
    activateImagen: (id: number) => Promise<void>;
    desactivateImagen: (id: number) => Promise<void>;
}