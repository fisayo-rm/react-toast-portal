import { createContext, useContext } from "react";
import type { Toast, ToastOptions } from "./type";

type ContextType = {
  showToast: (status: ToastOptions) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

export const ToastContext = createContext({
  showToast: () => {},
  removeToast: () => {},
  toasts: [],
} as ContextType);

export const useToast = (): ContextType => useContext(ToastContext);
