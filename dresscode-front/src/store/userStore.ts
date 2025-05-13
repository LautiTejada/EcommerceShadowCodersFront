import { create } from "zustand";

interface User {
  id: number;
  nombre: string;
  email: string;
  contraseña: string;
  rol: boolean;
}

interface Address {
  id: number;
  calle: string;
  localidad: string;
  cp: string;
}

interface UserState {
  users: User[];
  addresses: Address[];
  addUser: (user: User) => void;
  addAddress: (address: Address) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  addresses: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  addAddress: (address) =>
    set((state) => ({ addresses: [...state.addresses, address] })),
}));
