import { useEffect } from "react";
import { FiltersCatalog } from "../../components/ui/FiltersCatalog/FiltersCatalog";
import { useProductoStore } from "../../store/productoStore";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import { useCategoriaStore } from "../../store/categoriaStore";

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

  useEffect(() => {
    // Siempre tener las categorías activas cargadas
    fetchCategoriasActivas();
  }, [fetchCategoriasActivas]);

  useEffect(() => {
    let filtros: any = {};

    if (location.pathname.includes("calzados") || filter === "CALZADOS") {
      const cats = categoriasActivas.filter(
        (c) =>
          normalizar(c.nombreCategoria).includes("ZAPATILLA") ||
          normalizar(c.nombreCategoria).includes("CALZADO")
      );
      if (cats.length) filtros.categorias = cats.map((c) => c.id);
    } else if (location.pathname.includes("ropa") || filter === "ROPA") {
      const cats = categoriasActivas.filter(
        (c) =>
          !normalizar(c.nombreCategoria).includes("ZAPATILLA") &&
          !normalizar(c.nombreCategoria).includes("ZAPATILLAS") &&
          !normalizar(c.nombreCategoria).includes("CALZADO") &&
          !normalizar(c.nombreCategoria).includes("CALZADOS") &&
          !normalizar(c.nombreCategoria).includes("OFERTA")
      );
      if (cats.length) filtros.categorias = cats.map((c) => c.id);
    } else if (location.pathname.includes("ofertas") || filter === "OFERTAS") {
      // Pedimos todos los productos, filtramos en frontend
    }

    if (Object.keys(filtros).length) {
      fetchProductosFiltrados(filtros);
    } else {
      fetchProductosActivos();
    }
  }, [
    location.pathname,
    filter,
    fetchProductosActivos,
    fetchProductosFiltrados,
    categoriasActivas,
  ]);

  // --- FILTRO FINAL SOLO PARA OFERTAS Y ROPA ---
  const productosFiltrados =
    location.pathname.includes("ofertas") || filter === "OFERTAS"
      ? productosActivos.filter(
          (producto) =>
            producto.descuentos &&
            producto.descuentos.some((d) => d.activo && d.descuento?.activo)
        )
      : location.pathname.includes("ropa") || filter === "ROPA"
      ? productosActivos.filter(
          (producto) =>
            // Excluir productos con descuento activo
            !(
              producto.descuentos &&
              producto.descuentos.some((d) => d.activo && d.descuento?.activo)
            ) &&
            // Excluir productos cuya categoría sea zapatilla o calzado
            !(
              normalizar(producto.categoria?.nombreCategoria || "").includes(
                "ZAPATILLA"
              ) ||
              normalizar(producto.categoria?.nombreCategoria || "").includes(
                "ZAPATILLAS"
              ) ||
              normalizar(producto.categoria?.nombreCategoria || "").includes(
                "CALZADO"
              ) ||
              normalizar(producto.categoria?.nombreCategoria || "").includes(
                "CALZADOS"
              )
            )
        )
      : productosActivos;

  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        minHeight: "100vh",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      {/* Barra de filtros */}
      <div
        style={{
          flex: "0 0 260px",
          marginRight: 32,
          backgroundColor: "#181818",
          padding: 16,
          borderRadius: 4,
        }}
      >
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
        }}
      >
        {productosFiltrados.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
