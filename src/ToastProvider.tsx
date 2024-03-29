import { useEffect, useState } from "react";
import type { Toast } from "./type";
import { ToastContext } from "./ToastContext";
import ToastContainer from "./components/ToastContainer";
import ReactDOM from "react-dom";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    console.log("TOAST PROVIDER MOUNTED");
  }, []);

  const showToast = (body: string) => {
    console.log("SHOWING TOAST");
    const id = Math.random().toString(36).substring(2, 12);
    setToasts((currentToasts) => [...currentToasts, { id, body }]);
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
      {ReactDOM.createPortal(
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ToastContainer />
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};
