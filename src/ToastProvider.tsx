import { useEffect, useState } from "react";
import type { Toast, ToastOptions } from "./type";
import { ToastContext } from "./ToastContext";
import ToastContainer from "./components/ToastContainer";
import ReactDOM from "react-dom";
import useSettings from "./hooks/useSettings";
import { isBoolean, uuidV4 } from "./utils";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    console.log("TOAST PROVIDER MOUNTED");
  }, []);

  const { settings } = useSettings();

  const getTitle = (status: ToastOptions) => {
    if (status.title) {
      return status.title;
    }

    if (isBoolean(status.defaultTitle)) {
      if (status.defaultTitle) {
        if (status.mode === "prompt" || status.mode === "loader") {
          return "";
        }

        if (status.type) {
          return status.type.charAt(0).toUpperCase() + status.type.slice(1);
        }
      } else {
        return "";
      }
    }

    if (settings.defaultTitle) {
      if (status.mode === "prompt" || status.mode === "loader") {
        return "";
      }

      if (status.type) {
        return status.type.charAt(0).toUpperCase() + status.type.slice(1);
      }
    }
    return "Info";
  };

  const showToast = (status: ToastOptions) => {
    if (!status.type) {
      status.type = "success";
    }
    const id = uuidV4();
    const toast: Toast = Object.assign({}, status, { id });
    toast.title = getTitle(status);
    toast.theme = status.theme ? status.theme : settings.theme;
    setToasts((currentToasts) => [...currentToasts, toast]);
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
