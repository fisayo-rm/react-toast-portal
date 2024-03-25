import { useState } from "react";
import type { Settings } from "../type";

type DefaultSettings = Omit<Required<Settings>, "transition"> &
  Pick<Settings, "transition">;

type UseSettings = {
  settings: Readonly<DefaultSettings>;
  updateSettings: <T extends keyof Settings | Settings>(
    key: T,
    value?: T extends keyof Settings ? Settings[T] : never,
  ) => Settings;
};

const useSettings = (): UseSettings => {
  const [settings, setSettings] = useState<DefaultSettings>({
    singular: false,
    withBackdrop: false,
    backdrop: "rgba(0, 0, 0. 0.2)",
    position: "bottom-right",
    defaultTitle: true,
    canTimeout: true,
    pauseOnHover: false,
    pauseOnFocusLoss: true,
    iconEnabled: true,
    draggable: true,
    dragThreshold: 0.75,
    hideProgressbar: false,
    errorDuration: 8000,
    successDuration: 4000,
    warningInfoDuration: 6000,
    theme: "dark",
    baseIconClass: "",
    orderLatest: true,
    transition: undefined,
    oneType: false,
    maxToasts: 6,
    customNotifications: {},
  });

  return {
    settings,
    updateSettings: (key, newSettings) => {
      if (typeof key === "object" && newSettings === undefined) {
        setSettings((oldSettings) => ({ ...oldSettings, ...key }));
      } else if (typeof key === "string") {
        setSettings((oldSettings) => ({ ...oldSettings, [key]: newSettings }));
      }
      return settings;
    },
  };
};

export default useSettings;
