import React from "react";

export type ToastProps = {
  message: string;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Toast;
