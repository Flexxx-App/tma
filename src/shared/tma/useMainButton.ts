import { useEffect, useRef } from "react";
import { mainButton, RGB } from "@tma.js/sdk";

interface UseMainButtonOptions {
  onClick?: () => void;
  text: string;
  bgColor?: RGB;
  textColor?: RGB;
  isEnabled?: boolean;
  isLoaderVisible?: boolean;
  isShineEffectEnabled?: boolean;
  isShineEffectVisible?: boolean;
  isVisible?: boolean;
}

export function useMainButton(options: UseMainButtonOptions) {
  const isVisible = options.isVisible ?? true;
  const prevOptionsRef = useRef<
    Partial<UseMainButtonOptions> & { isVisible?: boolean }
  >({});
  const offClickRef = useRef<VoidFunction | null>(null);

  useEffect(() => {
    const prev = prevOptionsRef.current;

    if (prev.text !== options.text) {
      mainButton.setText(options.text);
    }

    if (prev.isLoaderVisible !== options.isLoaderVisible) {
      if (options.isLoaderVisible) {
        mainButton.showLoader();
      } else {
        mainButton.hideLoader();
      }
    }

    if (
      prev.isShineEffectEnabled !== options.isShineEffectEnabled &&
      options.isShineEffectEnabled
    ) {
      mainButton.enableShineEffect();
    }

    if (prev.bgColor !== options.bgColor && options.bgColor) {
      mainButton.setBgColor(options.bgColor);
    }
    if (prev.textColor !== options.textColor && options.textColor) {
      mainButton.setTextColor(options.textColor);
    }

    if (
      prev.isEnabled !== options.isEnabled &&
      options.isEnabled !== undefined
    ) {
      if (options.isEnabled) {
        mainButton.enable();
      } else {
        mainButton.disable();
      }
    }

    if (prev.isVisible !== isVisible) {
      if (isVisible) {
        mainButton.show();
      } else {
        mainButton.hide();
      }
    }

    if (prev.onClick !== options.onClick) {
      if (offClickRef.current) {
        offClickRef.current();
        offClickRef.current = null;
      }

      if (options.onClick) {
        offClickRef.current = mainButton.onClick(() => {
          options.onClick?.();
        });
      }
    }

    prevOptionsRef.current = { ...options, isVisible };
  }, [
    options.text,
    options.isLoaderVisible,
    options.isShineEffectEnabled,
    options.bgColor,
    options.textColor,
    options.isEnabled,
    options.onClick,
    isVisible,
  ]);

  useEffect(() => {
    return () => {
      if (offClickRef.current) {
        offClickRef.current();
      }
      mainButton.hide();
    };
  }, []);
}
