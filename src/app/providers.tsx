"use client";

import { StoreProvider } from "./_providers/store";
import { AuthInitializer } from "./_providers/auth-initializer";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AuthInitializer>{children}</AuthInitializer>
    </StoreProvider>
  );
};
