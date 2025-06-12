import { useEffect } from "react";
import { FiltersCatalog } from "../../components/ui/FiltersCatalog/FiltersCatalog";
import { useProductoStore } from "../../store/productoStore";
import ProductCard from "../../components/ui/ProductCard/ProductCard";

export const Catalog = () => {
  const { productosActivos, fetchProductosActivos } = useProductoStore();

  useEffect(() => {
    fetchProductosActivos();
  }, [fetchProductosActivos]);

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
        {productosActivos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
