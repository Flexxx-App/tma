"use client";

import { StoreProvider } from "./_providers/store";
import { AuthInitializer } from "./_providers/auth-initializer";
import { IsClientCtxProvider } from "./_providers/is-client-ctx";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AuthInitializer>
        <IsClientCtxProvider>{children}</IsClientCtxProvider>
      </AuthInitializer>
    </StoreProvider>
  );
};
