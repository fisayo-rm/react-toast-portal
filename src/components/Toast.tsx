import React, { useMemo, useState } from "react";
import "./Toast.css";
import type { Toast } from "../type";
import { useToast } from "../ToastContext";

type ToastProps = {
  status: Toast;
  baseIconClass?: string;
  delayed?: boolean;
};

const ToastComponent: React.FC<ToastProps> = ({ status, delayed = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { removeToast } = useToast();
  const notificationClass = useMemo(() => {
    const classes: Record<string, boolean> = {};

    if (status.mode === "loader") {
      classes["rtp-cursor-wait"] = true;
    }

    classes[`rtp-theme-${status.theme}`] = true;

    return Object.keys(classes)
      .filter((key) => classes[key])
      .join(" ");
  }, [status.mode, status.theme]);

  const isNotification = useMemo(
    () => ["prompt", "loader"].indexOf(status.mode!) === -1,
    [status.mode],
  );

  const dismiss = (id: string) => {
    if (isNotification) removeToast(id);
  };
  return (
    <div
      className={`rtp-notification ${notificationClass}`}
      role="alert"
      draggable="false"
      data-delayed={delayed}
      onClick={() => dismiss(status.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="rtp-content">
        {status.title && <h2 className="rtp-title">{status.title}</h2>}
        {status.body && <h2 className="rtp-paragraph">{status.body}</h2>}
      </div>
    </div>
  );
};

export default ToastComponent;
