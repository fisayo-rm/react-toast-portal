import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import Toast from "./components/Toast";

type Toast = {
  id: string;
  message: string;
};

const ToastContext = createContext({});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 12);
    setToasts((currentToasts) => [...currentToasts, { id, message }]);
  };

  const removeToast = (id: string) => {
    console.log("TOAST ID", id);
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  };

  const contextValue = { showToast, removeToast };

  return (
    <ToastContext.Provider value={contextValue}>
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
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            ></Toast>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};
