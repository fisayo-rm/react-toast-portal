import React, { useMemo } from "react";
import { Toast } from "../type";
import { isObject } from "../utils";

type IconProps = {
  mode: Toast["mode"];
  type: Toast["type"];
  icon: Toast["icon"];
  baseIconClass?: string;
};

const IconComponent: React.FC<IconProps> = ({
  baseIconClass = "",
  mode,
  type,
  icon,
}) => {
  const containerClasses = useMemo(() => {
    const classes: Record<string, boolean> = {};

    if (mode !== "loader") {
      classes["rtp-circle"] = !icon;
    }
    classes["rtp-prompt"] = mode === "prompt";

    if (mode === undefined || mode.length === 0) {
      classes["rtp-" + (type ? type : "info")] = true;
    }

    return Object.keys(classes)
      .filter((key) => classes[key])
      .join(" ");
  }, [mode, mode?.length, type, icon]);
  const userIcon = useMemo(() => {
    if (!icon) {
      return null;
    }

    // let toastIcon: Icon & { class: string } = {
    let toastIcon = {
      tag: "i",
      ligature: "",
      class: baseIconClass,
    };

    if (typeof icon === "string") {
      if (icon.toLowerCase().includes("<svg")) {
        toastIcon.tag = "div";
        toastIcon.ligature = icon;
      } else {
        toastIcon.class = toastIcon.class + " " + icon;
      }
    }

    if (isObject(icon)) {
      toastIcon = { ...toastIcon, ...icon };
    }

    return toastIcon;
  }, [
    isObject(icon) ? icon.tag : undefined,
    isObject(icon) ? icon.ligature : undefined,
    baseIconClass,
  ]);

  let Component;
  if (userIcon) {
    Component = (
      <DynamicElementComponent
        className={`rtp-icon ${userIcon.class}`}
        elementType={userIcon.tag}
      >
        {userIcon.ligature}
      </DynamicElementComponent>
    );
  } else if (mode === "loader") {
    Component = <div className="rtp-spinner" />;
  } else if (mode === "prompt") {
    Component = (
      <div className="rtp-icon">
        <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
          <path
            d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33
                       13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33
                       13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z"
          />
        </svg>
      </div>
    );
  } else if (containerClasses.includes("rtp-success")) {
    Component = (
      <div className="rtp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41
                         0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"
          />
        </svg>
      </div>
    );
  } else if (containerClasses.includes("rtp-error")) {
    Component = (
      <div className="rtp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02
                         0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89
                         4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          />
        </svg>
      </div>
    );
  } else if (containerClasses.includes("rtp-warning")) {
    Component = (
      <div className="rtp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="19" r="2" />
          <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
    );
  } else if (containerClasses.includes("rtp-info")) {
    Component = (
      <div className="rtp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`rtp-icon-container ${containerClasses}`}>{Component}</div>
  );
};

interface DynamicElementProps {
  elementType: "div" | "i" | string;
  children: React.ReactNode;
  className?: string;
}

const DynamicElementComponent: React.FC<DynamicElementProps> = ({
  elementType,
  children,
}) => {
  const Element = elementType as keyof JSX.IntrinsicElements;

  return <Element>{children}</Element>;
};

export default IconComponent;
