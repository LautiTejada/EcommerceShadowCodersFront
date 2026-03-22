# Documentación y buenas prácticas

## Estructura del proyecto

- `/src/pages`: Vistas principales (Home, Catalog, Auth, etc)
- `/src/components`: Componentes reutilizables (ui, layouts, admin)
- `/src/http`: Lógica de acceso a la API (usar `apiFetch`)
- `/src/store`: Zustand stores para estado global
- `/src/utils`: Utilidades y helpers (validación, formateo, etc)
- `/public/assets`: Imágenes y recursos estáticos

## Buenas prácticas

- Usar `apiFetch` para todas las llamadas a la API (maneja JWT y errores)
- Validar formularios con helpers de `/src/utils/validate.ts` o librerías externas
- Usar lazy loading para páginas y componentes pesados
- Mantener los imports ordenados y eliminar los no usados
- Documentar componentes complejos con comentarios breves
- Usar ARIA y semántica para accesibilidad
- Usar Helmet para SEO
- Mantener el código modular y reutilizable

## Ejemplo de documentación en un componente

```tsx
/**
 * Card de producto con animación y soporte para descuentos
 * @param product Producto a mostrar
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => { ... }
```

## Cómo contribuir

- Seguir la estructura y convenciones del repo
- Probar los cambios con `npm run dev` y `npm run build`
- Hacer PRs descriptivos y con screenshots si aplica

---

> Para dudas, sugerencias o mejoras, crear un issue o PR.
