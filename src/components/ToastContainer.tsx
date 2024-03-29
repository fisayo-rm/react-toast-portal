import React, { useEffect, useMemo, useState } from "react";
import "./ToastContainer.css";
import ToastComponent from "./Toast";
import useSettings from "../hooks/useSettings";
import { useToastContext } from "../ToastContext";

const ToastContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { settings, updateSettings } = useSettings();
  const { toasts } = useToastContext();
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const flexDirection = useMemo<React.CSSProperties>(
    () => ({
      flexDirection:
        settings.orderLatest && settings.position.split("-")[0] === "bottom"
          ? "column"
          : "column-reverse",
    }),
    [settings.orderLatest, settings.position],
  );

  const positionClasses = useMemo(() => {
    const position = settings.position.split("-");
    const classes: Record<string, boolean> = {};
    if (position[0] === position[1]) {
      classes["rtp-center-center"] = true;
      return classes;
    }

    classes[position[0] === "center" ? "rtp-centerY" : "rtp-" + position[0]] =
      true;
    classes[position[1] === "center" ? "rtp-centerX" : "rtp-" + position[1]] =
      true;

    return Object.keys(classes)
      .filter((key) => classes[key])
      .join(" ");
  }, [settings.position]);
  return (
    <div>
      <div
        className={`${!isLoaded && "rtp-cloak"} rtp-backdrop-hidden ${toasts.length > 0 && settings.withBackdrop && "rtp-backdrop-visible"}`}
        style={{ backgroundColor: settings.backdrop }}
      ></div>
      {/* A transition component will replace this div */}
      <div
        className={`rtp-notification-container ${positionClasses}`}
        style={flexDirection}
      >
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} status={toast} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
