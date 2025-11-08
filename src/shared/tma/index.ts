import {
  setDebug,
  mountBackButton,
  restoreInitData,
  init as initSDK,
  mountMiniAppSync,
  bindThemeParamsCssVars,
  mountViewport,
  bindViewportCssVars,
  mockTelegramEnv,
  type ThemeParams,
  themeParamsState,
  retrieveLaunchParams,
  emitEvent,
} from "@telegram-apps/sdk-react";

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
      onEvent(event: [string, unknown], next: () => void): void {
        if (
          event[0] === "web_app_request_theme" &&
          typeof event[0] === "string"
        ) {
          let tp: ThemeParams = {};
          if (firstThemeSent) {
            tp = themeParamsState();
          } else {
            firstThemeSent = true;
            tp ||= retrieveLaunchParams().tgWebAppThemeParams;
          }
          return emitEvent("theme_changed", { theme_params: tp });
        }

        if (event[0] === "web_app_request_safe_area") {
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

  mountBackButton.ifAvailable();
  restoreInitData();

  if (mountMiniAppSync.isAvailable()) {
    mountMiniAppSync();
    bindThemeParamsCssVars();
  }

  if (mountViewport.isAvailable()) {
    mountViewport().then(() => {
      bindViewportCssVars();
    });
  }
}
