export type XPosition = "left" | "center" | "right";
export type YPosition = "top" | "center" | "bottom";
export type Position = `${YPosition}-${XPosition}`;

export interface Icon {
  tag?: keyof HTMLElementTagNameMap;
  ligature?: string;
  icon?: string;
}

export interface BaseSettings {
  canTimeout?: boolean;
  pauseOnHover?: boolean;
  defaultTitle?: true;
  hideProgressbar?: boolean;
  theme?: "light" | "dark" | string;
  transition?: string | { name: string; moveClass?: string };
  iconEnabled?: boolean;
  draggable?: boolean;
  dragThreshold?: number;
  pauseOnFocusLoss?: boolean;
}

export interface Settings extends BaseSettings {
  singular?: boolean;
  orderLatest?: boolean;
  withBackdrop?: boolean;
  backdrop?: string;
  position?: Position;
  errorDuration?: number;
  successDuration?: number;
  warningInfoDuration?: number;
  baseIconClass?: string;
  maxToasts?: number;
  oneType?: boolean;
  customNotifications?: Record<string, ToastOptions>;
}

export interface ToastOptions extends BaseSettings {
  duration?: number;
  body: string;
  title?: string;
  type?: "info" | "warning" | "error" | "success";
  mode?: "loader" | "prompt";
  answers?: Record<string, any>;
  icon?: string | Icon;
  callback?: CallableFunction;
  delay?: number;
}

export interface Toast extends ToastOptions {
  id: string;
}
