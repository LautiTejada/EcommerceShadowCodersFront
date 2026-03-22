// src/http/README.md

# apiFetch

Este helper centraliza las llamadas a la API y agrega el token JWT automáticamente si se requiere.

## Uso básico

```ts
import { apiFetch } from "./apiFetch";

// Llamada GET sin autenticación
const data = await apiFetch("/api/productos");

// Llamada POST con autenticación
const nuevo = await apiFetch("/api/privado", {
	method: "POST",
	body: JSON.stringify({ foo: "bar" }),
	auth: true,
});
```

- Si `auth: true`, agrega el header Authorization con el token de localStorage.
- Lanza un error si la respuesta no es ok.
- Devuelve el JSON parseado o null si la respuesta es 204.

## Reemplazo progresivo

Puedes reemplazar los fetch de los archivos en `src/http/` por `apiFetch` para unificar el manejo de errores y autenticación.
