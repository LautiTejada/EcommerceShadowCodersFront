import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiltersCatalog } from "../../components/ui/FiltersCatalog/FiltersCatalog";
import { useProductoStore } from "../../store/productoStore";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import { useCategoriaStore } from "../../store/categoriaStore";
import Loader from "../../components/ui/Loader/Loader";
import { sileo } from "sileo";

// --- Mueve la función normalizar aquí ---
const normalizar = (str: string) =>
	str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toUpperCase();

export const Catalog = ({ filter }: { filter?: string }) => {
	const { productosActivos, fetchProductosActivos, fetchProductosFiltrados } =
		useProductoStore();
	const { categoriasActivas, fetchCategoriasActivas } = useCategoriaStore();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Cargar categorías activas si no están cargadas
	useEffect(() => {
		setLoading(true);
		setError(null);
		if (!categoriasActivas || categoriasActivas.length === 0) {
			fetchCategoriasActivas();
		} else {
			setLoading(false);
		}
	}, [fetchCategoriasActivas, categoriasActivas]);

	// Cargar productos según filtro y pathname
	useEffect(() => {
		const filtros: any = {};
		setLoading(true);
		setError(null);
		try {
			if (location.pathname.includes("calzados") || filter === "CALZADOS") {
				const cats = categoriasActivas.filter(
					(c: any) =>
						normalizar(c.nombreCategoria).includes("ZAPATILLA") ||
						normalizar(c.nombreCategoria).includes("CALZADO"),
				);
				if (cats.length) filtros.categorias = cats.map((c: any) => c.id);
			} else if (location.pathname.includes("ropa") || filter === "ROPA") {
				const cats = categoriasActivas.filter(
					(c: any) =>
						!normalizar(c.nombreCategoria).includes("ZAPATILLA") &&
						!normalizar(c.nombreCategoria).includes("ZAPATILLAS") &&
						!normalizar(c.nombreCategoria).includes("CALZADO") &&
						!normalizar(c.nombreCategoria).includes("CALZADOS") &&
						!normalizar(c.nombreCategoria).includes("OFERTA"),
				);
				if (cats.length) filtros.categorias = cats.map((c: any) => c.id);
			} else if (
				location.pathname.includes("ofertas") ||
				filter === "OFERTAS"
			) {
				// No se agregan filtros, se muestran todas las ofertas
			}

			if (Object.keys(filtros).length) {
				fetchProductosFiltrados(filtros).finally(() => setLoading(false));
			} else if (productosActivos.length === 0) {
				fetchProductosActivos().finally(() => setLoading(false));
			} else {
				setLoading(false);
			}
		} catch (err: any) {
			setError("Error al cargar productos");
			setLoading(false);
			sileo.error({
				title: "Error",
				description: "No se pudieron cargar los productos.",
				type: "error",
			});
		}
	}, [
		location.pathname,
		filter,
		fetchProductosActivos,
		fetchProductosFiltrados,
		categoriasActivas,
		productosActivos.length,
	]);

	// --- FILTRO FINAL SOLO PARA OFERTAS Y ROPA ---
	const productosFiltrados =
		location.pathname.includes("ofertas") || filter === "OFERTAS"
			? productosActivos.filter(
					(producto: any) =>
						producto.descuentos &&
						producto.descuentos.some(
							(d: any) => d.activo && d.descuento?.activo,
						),
				)
			: location.pathname.includes("ropa") || filter === "ROPA"
				? productosActivos.filter(
						(producto: any) =>
							// Excluir productos con descuento activo
							!(
								producto.descuentos &&
								producto.descuentos.some(
									(d: any) => d.activo && d.descuento?.activo,
								)
							) &&
							// Excluir productos cuya categoría sea zapatilla o calzado
							!(
								normalizar(producto.categoria?.nombreCategoria || "").includes(
									"ZAPATILLA",
								) ||
								normalizar(producto.categoria?.nombreCategoria || "").includes(
									"ZAPATILLAS",
								) ||
								normalizar(producto.categoria?.nombreCategoria || "").includes(
									"CALZADO",
								) ||
								normalizar(producto.categoria?.nombreCategoria || "").includes(
									"CALZADOS",
								)
							),
					)
				: productosActivos;

	if (loading) {
		return <Loader />;
	}
	if (error) {
		return <div style={{ color: "red", padding: 32 }}>{error}</div>;
	}

	// SEO dinámico según filtro
	const getTitle = () => {
		if (location.pathname.includes("ofertas") || filter === "OFERTAS")
			return "Ofertas en Moda Urbana | DressCode";
		if (location.pathname.includes("calzados") || filter === "CALZADOS")
			return "Calzados Urbanos | DressCode";
		if (location.pathname.includes("ropa") || filter === "ROPA")
			return "Ropa Urbana | DressCode";
		return "Catálogo de Productos | DressCode";
	};
	const getDescription = () => {
		if (location.pathname.includes("ofertas") || filter === "OFERTAS")
			return "Aprovechá las mejores ofertas en zapatillas, remeras y más. Moda urbana y deportiva al mejor precio.";
		if (location.pathname.includes("calzados") || filter === "CALZADOS")
			return "Descubrí nuestra selección de calzados urbanos y deportivos. Últimas tendencias en zapatillas.";
		if (location.pathname.includes("ropa") || filter === "ROPA")
			return "Explorá la mejor ropa urbana y deportiva. Remeras, buzos y más con estilo.";
		return "Catálogo completo de productos DressCode. Moda urbana y deportiva para todos los estilos.";
	};

	return (
		<>
			<Helmet>
				<title>{getTitle()}</title>
				<meta name="description" content={getDescription()} />
				<meta property="og:title" content={getTitle()} />
				<meta property="og:description" content={getDescription()} />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`https://tusitio.com${location.pathname}`}
				/>
				<meta
					property="og:image"
					content="/public/assets/ImagesCarousel/og-default.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={getTitle()} />
				<meta name="twitter:description" content={getDescription()} />
				<meta
					name="twitter:image"
					content="/public/assets/ImagesCarousel/og-default.jpg"
				/>
			</Helmet>
			<div
				style={{
					display: "flex",
					background: "#000",
					minHeight: "100vh",
					padding: 24,
					boxSizing: "border-box",
				}}>
				{/* Barra de filtros */}
				<div
					style={{
						flex: "0 0 260px",
						marginRight: 32,
						backgroundColor: "#181818",
						padding: 16,
						borderRadius: 4,
					}}>
					<FiltersCatalog />
				</div>
				{/* Grid de productos */}
				<div
					style={{
						flex: 1,
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
						gap: "24px",
						alignContent: "flex-start",
						overflow: "auto", // Permite scroll si hay demasiados productos
					}}>
					{productosFiltrados.length === 0 ? (
						<div
							style={{
								color: "#fff",
								fontSize: 20,
								gridColumn: "1/-1",
								textAlign: "center",
								padding: 40,
							}}>
							No hay productos para mostrar.
						</div>
					) : (
						productosFiltrados
							.filter(
								(product) => product.id !== undefined && product.id !== null,
							)
							.map((product) => (
								<ProductCard key={product.id} product={product} />
							))
					)}
				</div>
			</div>
		</>
	);
};
