import { FiltersCatalog } from "../../components/ui/FiltersCatalog/FiltersCatalog";
import ProductCard from "../../components/ui/ProductCard/ProductCard";

// Ejemplo de productos (puedes reemplazarlo por tu fetch o props)
const products = [
  {
    id: 1,
    name: "NIKE DUNK LOW",
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/9b7e2e2b-4e3d-4e2a-8b2a-1e2a2e2a2e2a/dunk-low-zapatillas.png",
    discount: 30,
    price: 90000,
    oldPrice: 130000,
  },
  {
    id: 2,
    name: "VANS U HYLNANE",
    image: "https://static.vans.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/8b7e2e2b-4e3d-4e2a-8b2a-1e2a2e2a2e2a/u-hylnane-zapatillas.png",
    discount: 0,
    price: 80000,
    oldPrice: 80000,
  },
  // ...agrega más productos aquí
];

export const Catalog = () => {
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
      <div style={{ flex: "0 0 260px", marginRight: 32 , backgroundColor: "#181818", padding: 16, borderRadius: 4 }}>
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
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};