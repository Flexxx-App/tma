"use client"

import { useEffect } from "react";
import { secondaryButton, RGB } from "@tma.js/sdk";

interface UseSecondaryButtonOptions {
  onClick?: () => void;
  text: string;
  bgColor?: RGB;
  textColor?: RGB;
  isEnabled?: boolean;
  isLoaderVisible?: boolean;
  isShineEffectEnabled?: boolean;
  isShineEffectVisible?: boolean;
  isVisible?: boolean;
  position?: "left" | "right" | "top" | "bottom";
}

export function useSecondaryButton(options: UseSecondaryButtonOptions) {
  const isVisible = options.isVisible ?? true;
  const position = options.position ?? "top";
  useEffect(() => {
    secondaryButton.setText(options.text);
    if (options.isLoaderVisible) {
      secondaryButton.showLoader();
    }
    if (options.isShineEffectEnabled) {
      secondaryButton.enableShineEffect();
    }
    if (options.isEnabled) {
      secondaryButton.enable();
    }
    if (isVisible) {
      secondaryButton.show();
    }
    secondaryButton.setPosition(position);
    secondaryButton.onClick(options.onClick ?? (() => {}));

    return () => {
      secondaryButton.hide();
    };
  }, [options.text, options.onClick, options.bgColor, options.textColor]);
}