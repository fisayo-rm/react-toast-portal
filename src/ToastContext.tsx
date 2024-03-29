import { createContext, useContext } from "react";
import type { Toast } from "./type";

type ContextType = {
  showToast: (body: string) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

export const ToastContext = createContext({
  showToast: () => {},
  removeToast: () => {},
  toasts: [],
} as ContextType);

export const useToast = (): ContextType => useContext(ToastContext);
