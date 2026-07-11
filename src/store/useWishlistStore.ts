import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/products';

interface WishlistState {
  items: Product[];
  isOpen: boolean;
  toggleItem: (product: Product) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.id === product.id);
        if (exists) {
          set({ items: currentItems.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      hasItem: (id) => {
        return get().items.some((item) => item.id === id);
      },
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'frankiestyles-wishlist-storage',
    }
  )
);
