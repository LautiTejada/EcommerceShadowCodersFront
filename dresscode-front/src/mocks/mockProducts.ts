import type { Producto } from "../types/Producto";

const img = (n: number): string => `/assets/ImagesProducts/image ${n}.png`;

export const mockProductos: Producto[] = [
	// ─── ZAPATILLAS (sin descuento) ────────────────────────────
	{
		id: 9001,
		nombre: "Nike Air Force 1 '07",
		precio: 89999,
		descripcion: "Clásica zapatilla urbana de cuero blanco.",
		color: "Blanco",
		categoria: { id: 1, activo: true, nombreCategoria: "ZAPATILLAS" },
		imagenes: [{ id: 1, urlImagen: img(8), principal: true, productoId: 9001 }],
		descuentos: [],
		talles: [],
	},
	{
		id: 9002,
		nombre: "Adidas Samba OG",
		precio: 79999,
		descripcion: "Ícono retro con suela de goma.",
		color: "Blanco/Negro",
		categoria: { id: 1, activo: true, nombreCategoria: "ZAPATILLAS" },
		imagenes: [{ id: 2, urlImagen: img(9), principal: true, productoId: 9002 }],
		descuentos: [],
		talles: [],
	},
	{
		id: 9003,
		nombre: "Puma RS-X Efekt",
		precio: 74999,
		descripcion: "Running system con suela chunky.",
		color: "Negro/Rojo",
		categoria: { id: 1, activo: true, nombreCategoria: "ZAPATILLAS" },
		imagenes: [
			{ id: 3, urlImagen: img(10), principal: true, productoId: 9003 },
		],
		descuentos: [],
		talles: [],
	},
	{
		id: 9004,
		nombre: "New Balance 574",
		precio: 85000,
		descripcion: "Amortiguación ENCAP para todo el día.",
		color: "Gris",
		categoria: { id: 1, activo: true, nombreCategoria: "ZAPATILLAS" },
		imagenes: [
			{ id: 4, urlImagen: img(11), principal: true, productoId: 9004 },
		],
		descuentos: [],
		talles: [],
	},
	// ─── REMERAS (sin descuento) ────────────────────────────────
	{
		id: 9005,
		nombre: "Nike Oversize Swoosh",
		precio: 34999,
		descripcion: "Remera oversize con logo bordado.",
		color: "Negro",
		categoria: { id: 2, activo: true, nombreCategoria: "REMERAS" },
		imagenes: [
			{ id: 5, urlImagen: img(12), principal: true, productoId: 9005 },
		],
		descuentos: [],
		talles: [],
	},
	{
		id: 9006,
		nombre: "Adidas Trefoil Tee",
		precio: 29999,
		descripcion: "Algodón 100% con estampa clásica.",
		color: "Blanco",
		categoria: { id: 2, activo: true, nombreCategoria: "REMERAS" },
		imagenes: [{ id: 6, urlImagen: img(8), principal: true, productoId: 9006 }],
		descuentos: [],
		talles: [],
	},
	{
		id: 9007,
		nombre: "Puma Essentials Logo",
		precio: 24999,
		descripcion: "Remera básica cómoda para el día a día.",
		color: "Gris Melange",
		categoria: { id: 2, activo: true, nombreCategoria: "REMERAS" },
		imagenes: [{ id: 7, urlImagen: img(9), principal: true, productoId: 9007 }],
		descuentos: [],
		talles: [],
	},
	// ─── OFERTAS (con descuento activo) ────────────────────────
	{
		id: 9008,
		nombre: "Air Jordan 1 Retro High",
		precio: 120000,
		descripcion: "El clásico de los clásicos.",
		color: "Rojo/Negro",
		categoria: { id: 1, activo: true, nombreCategoria: "ZAPATILLAS" },
		imagenes: [
			{ id: 8, urlImagen: img(10), principal: true, productoId: 9008 },
		],
		descuentos: [
			{
				id: 1,
				activo: true,
				descuento: {
					id: 1,
					activo: true,
					fechaInicio: "2026-01-01",
					fechaCierre: "2026-12-31",
					porcentajeDescuento: 30,
				},
				producto: {
					id: 9008,
					nombre: "Air Jordan 1 Retro High",
					precio: 120000,
					descripcion: "",
					color: "",
				},
			},
		],
		talles: [],
	},
	{
		id: 9009,
		nombre: "Nike Dunk Low Retro",
		precio: 95000,
		descripcion: "Dunk de perfil bajo ideal para streetwear.",
		color: "Verde/Blanco",
		categoria: { id: 1, activo: true, nombreCategoria: "ZAPATILLAS" },
		imagenes: [
			{ id: 9, urlImagen: img(11), principal: true, productoId: 9009 },
		],
		descuentos: [
			{
				id: 2,
				activo: true,
				descuento: {
					id: 2,
					activo: true,
					fechaInicio: "2026-01-01",
					fechaCierre: "2026-12-31",
					porcentajeDescuento: 20,
				},
				producto: {
					id: 9009,
					nombre: "Nike Dunk Low Retro",
					precio: 95000,
					descripcion: "",
					color: "",
				},
			},
		],
		talles: [],
	},
	{
		id: 9010,
		nombre: "Jordan Flight MVP Tee",
		precio: 45000,
		descripcion: "Remera técnica con gráfico Flight.",
		color: "Negro",
		categoria: { id: 2, activo: true, nombreCategoria: "REMERAS" },
		imagenes: [
			{ id: 10, urlImagen: img(12), principal: true, productoId: 9010 },
		],
		descuentos: [
			{
				id: 3,
				activo: true,
				descuento: {
					id: 3,
					activo: true,
					fechaInicio: "2026-01-01",
					fechaCierre: "2026-12-31",
					porcentajeDescuento: 25,
				},
				producto: {
					id: 9010,
					nombre: "Jordan Flight MVP Tee",
					precio: 45000,
					descripcion: "",
					color: "",
				},
			},
		],
		talles: [],
	},
];
