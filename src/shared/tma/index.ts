import {
  setDebug,
  init as initSDK,
  mockTelegramEnv,
  type ThemeParams,
  emitEvent,
  backButton,
  mainButton,
  swipeBehavior,
  viewport,
  secondaryButton
} from "@tma.js/sdk";

export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  setDebug(options.debug);
  initSDK();

  options.eruda &&
    void import("eruda").then(({ default: eruda }) => {
      eruda.init();
      eruda.position({ x: window.innerWidth - 50, y: 0 });
    });

  if (options.mockForMacOS) {
    let firstThemeSent = false;
    mockTelegramEnv({
      onEvent(event: { name: string; params: unknown }, next: () => void): void {
        if (
          event.name === "web_app_request_theme" &&
          typeof event.params === "object"
        ) {
          return emitEvent("theme_changed", { theme_params: event.params as ThemeParams });
        }

        if (event.name === "web_app_request_viewport") {
          return emitEvent("safe_area_changed", {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          });
        }

        next();
      },
    });
  }

  backButton.mount();
  mainButton.mount();
  secondaryButton.mount();
  swipeBehavior.mount();
  viewport.mount();
  viewport.expand();
  viewport.stableHeight();

  swipeBehavior.disableVertical();
}
