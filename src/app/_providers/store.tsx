import { useRef } from "react";
import { type AppStore, store } from "@/app/_store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider as ReduxProvider } from "react-redux";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
    setupListeners(storeRef.current.dispatch);
  }

  return <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>;
};
