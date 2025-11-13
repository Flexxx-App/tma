"use client";

import { FaceIOProvider } from "./_providers/faceio";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <FaceIOProvider>{children}</FaceIOProvider>
    </SessionProvider>
  );
};
