import React, { useEffect, useState } from "react";
import "./ToastContainer.css";
import ToastComponent from "./Toast";
import useSettings from "../hooks/useSettings";
import { useToast } from "../ToastContext";

const ToastContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { settings, updateSettings } = useSettings();
  const { toasts } = useToast();
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div>
      <div
        className={`${isLoaded && "rtp-cloak"} rtp-backdrop-hidden ${toasts.length > 0 && settings.withBackdrop && "rtp-backdrop-visible"}`}
        style={{ backgroundColor: settings.backdrop }}
      ></div>
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} status={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
