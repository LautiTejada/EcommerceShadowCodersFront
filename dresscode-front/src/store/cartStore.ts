import { create } from "zustand";

export interface CartItem {
  productoId: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  talleId?: number;
}
const CART_KEY = "cart";

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productoId: number, talleId?: number) => void;
  updateQuantity: (productoId: number, delta: number, talleId?: number) => void;
  clearCart: () => void;
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
export const useCartStore = create<CartState>((set) => ({
  cart: loadCart(),
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find(
        (i) =>
          i.productoId === item.productoId &&
          (item.talleId ? i.talleId === item.talleId : true)
      );
      let newCart;
      if (existing) {
        newCart = state.cart.map((i) =>
          i.productoId === item.productoId &&
          (item.talleId ? i.talleId === item.talleId : true)
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i
        );
      } else {
        newCart = [...state.cart, item];
      }
      saveCart(newCart);
      return { cart: newCart };
    }),
  removeFromCart: (productoId, talleId) =>
    set((state) => {
      const newCart = state.cart.filter(
        (item) =>
          item.productoId !== productoId ||
          (talleId ? item.talleId !== talleId : false)
      );
      saveCart(newCart);
      return { cart: newCart };
    }),
  updateQuantity: (productoId, delta, talleId) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.productoId === productoId &&
        (talleId ? item.talleId === talleId : true)
          ? { ...item, cantidad: Math.max(1, item.cantidad + delta) }
          : item
      );
      saveCart(newCart);
      return { cart: newCart };
    }),
  clearCart: () => {
    saveCart([]);
    set({ cart: [] });
  },
}));
