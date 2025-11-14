import { useEffect } from "react";
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
  useEffect(() => {
    mainButton.setText(options.text);
    if (options.isLoaderVisible) {
      mainButton.showLoader();
    }
    if (options.isShineEffectEnabled) {
      mainButton.enableShineEffect();
    }
    if (options.bgColor) {
      mainButton.setBgColor(options.bgColor);
    }
    if (options.textColor) {
      mainButton.setTextColor(options.textColor);
    }
    if (options.isEnabled) {
      mainButton.enable();
    }
    if (isVisible) {
      mainButton.show();
    }
    mainButton.onClick(options.onClick ?? (() => {}));

    return () => {
      mainButton.hide();
    };
  }, [options.text, options.onClick, options.bgColor, options.textColor]);
}
