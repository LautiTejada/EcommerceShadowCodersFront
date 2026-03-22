# Limpieza de dependencias y código muerto

## Dependencias

- Ejecutá `npm prune` para eliminar dependencias no usadas.
- Ejecutá `npm outdated` para ver si hay versiones nuevas.
- Usá `depcheck` para detectar dependencias no usadas (instalar con `npm install -g depcheck`).

## Código muerto

- El compilador TypeScript ya advierte sobre variables y parámetros no usados (`noUnusedLocals`, `noUnusedParameters`).
- Revisá imports grises/no usados en VS Code y eliminá los que no se usan.
- Eliminá archivos de componentes, hooks o stores que no estén importados en ningún lado.
- Revisá los warnings de build/lint.

## Scripts útiles

```sh
npm prune
npm outdated
npx depcheck
```

## Recomendación

Hacé limpieza antes de cada release importante para mantener el proyecto liviano y profesional.
