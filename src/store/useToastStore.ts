import { create } from 'zustand';

export interface ToastData {
  name: string;
  image: string;
  size: string;
}

interface ToastState {
  toast: ToastData | null;
  showToast: (data: ToastData) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (data) => {
    set({ toast: data });
  },
  hideToast: () => set({ toast: null }),
}));
