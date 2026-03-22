# Checklist de Deploy y Assets

- [x] Revisar que `vite.config.ts` tenga configurado correctamente el `base` si deployás en subcarpeta.
- [x] Revisar que los assets estén en `public/assets` y se usen rutas relativas.
- [x] Revisar que el favicon y meta tags estén en `index.html`.
- [x] Usar `npm run build` para generar la carpeta `dist`.
- [x] Probar `npm run preview` para simular producción.
- [x] Subir la carpeta `dist` al hosting (Netlify, Vercel, GitHub Pages, etc).
- [x] Revisar que las rutas funcionen con F5 y deep linking (configurar rewrites si es necesario).
- [x] Eliminar assets no usados de `public/assets`.
- [x] Revisar que no haya rutas absolutas hardcodeadas.

## Ejemplo de configuración base en Vite

```js
// vite.config.ts
export default defineConfig({
	base: "/mi-subcarpeta/", // solo si deployás en subcarpeta
	plugins: [react()],
});
```

## Documentación oficial

- https://vitejs.dev/guide/static-deploy.html
- https://vitejs.dev/config/shared-options.html#base
