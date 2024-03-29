import { createContext, useContext } from "react";
import type { Toast, ToastOptions } from "./type";

type ContextType = {
  showToast: (status: ToastOptions) => string;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

export const ToastContext = createContext({
  showToast: () => "",
  removeToast: () => {},
  toasts: [],
} as ContextType);

export const useToastContext = (): ContextType => useContext(ToastContext);
