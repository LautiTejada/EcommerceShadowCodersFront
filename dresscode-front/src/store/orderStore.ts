import { create } from "zustand";

interface OrderDetail {
  id: number;
  cantidad: number;
  idProducto: number;
}

interface Order {
  id: number;
  idDireccionUsuario: number;
  fecha: Date;
  precioTotal: number;
  metodoPago: string;
  estado: string;
  detalles: OrderDetail[];
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}));
