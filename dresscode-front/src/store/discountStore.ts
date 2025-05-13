import { create } from 'zustand';

interface Discount {
  id: number;
  fechaInicio: Date;
  fechaCierre: Date;
  porcentajeDescuento: number;
}

interface DiscountProduct {
  idDescuento: number;
  idProducto: number;
}

interface DiscountState {
  discounts: Discount[];
  discountProducts: DiscountProduct[];
  addDiscount: (discount: Discount) => void;
  linkDiscountToProduct: (discountProduct: DiscountProduct) => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  discounts: [],
  discountProducts: [],
  addDiscount: (discount) => set((state) => ({ discounts: [...state.discounts, discount] })),
  linkDiscountToProduct: (discountProduct) =>
    set((state) => ({ discountProducts: [...state.discountProducts, discountProduct] })),
}));
