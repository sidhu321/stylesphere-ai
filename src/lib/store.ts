import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (item) =>
        set((s) => {
          const idx = s.items.findIndex(
            (i) => i.product.id === item.product.id && i.size === item.size,
          );
          if (idx >= 0) {
            const next = [...s.items];
            next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
            return { items: next, isOpen: true };
          }
          return { items: [...s.items, item], isOpen: true };
        }),
      remove: (id, size) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.product.id === id && i.size === size)),
        })),
      setQty: (id, size, qty) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i,
            ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.qty * i.product.price, 0),
    }),
    { name: "lx-cart" },
  ),
);

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "lx-wishlist" },
  ),
);
