"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/lib/types";

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  setOpen: (value: boolean) => void;
};

function buildLineId(item: Omit<CartItem, "lineId">) {
  return `${item.productId}_${item.color ?? "default"}_${item.length ?? "default"}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const lineId = buildLineId(item);
          const current = state.items.find((line) => line.lineId === lineId);

          if (current) {
            return {
              items: state.items.map((line) =>
                line.lineId === lineId ? { ...line, quantity: line.quantity + item.quantity } : line,
              ),
            };
          }

          return { items: [...state.items, { ...item, lineId }] };
        }),
      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((item) => item.lineId !== lineId) })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.lineId === lineId ? { ...item, quantity } : item)),
        })),
      clear: () => set({ items: [] }),
      setOpen: (value) => set({ isOpen: value }),
    }),
    {
      name: "amora-cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
