import { useToastContext } from "../ToastContext";
import { Status, Toast } from "../type";

export interface ToastPluginAPI {
  notify: (status: Status, title?: string) => Toast["id"];
  success: (status: Status, title?: string) => Toast["id"];
  info: (status: Status, title?: string) => Toast["id"];
}

export const useToast = (): ToastPluginAPI => {
  const { showToast } = useToastContext();
  const notify = (
    status: Status,
    title?: string,
  ): ReturnType<ToastPluginAPI["notify"]> => {
    if (typeof status === "string") {
      status = {
        body: status,
      };
    }
    if (title) {
      status.title = title;
    }
    if (!status.type) {
      status.type = "success";
    }

    return showToast(status);
  };

  const toastMethods: ToastPluginAPI = {
    notify,
    success: (status: Status, title?: string) => notify(status, title),
    info: (status: Status, title?: string) => {
      if (typeof status === "string") {
        status = {
          body: status,
        };
      }

      if (title) {
        status.title = title;
      }
      status.type = "info";
      return notify(status);
    },
  };

  return toastMethods;
};
