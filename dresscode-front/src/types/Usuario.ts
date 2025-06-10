import type { Direccion } from "./Direccion";
import type { Rol } from "./enums/Rol";

export interface Usuario {
  id?: number;
  activo: boolean;
  username: string;
  email: string;
  password: string;
  rol: Rol;
  direcciones?: Direccion[];
}
