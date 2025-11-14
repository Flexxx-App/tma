"use client";
import { Page, Text } from "@/shared/ui";
import { LoginForm } from "./form";
import { ShieldCheck } from "lucide-react";
import { useMainButton } from "@/shared/tma/useMainButton";

export const ScannerLoginPage = () => {
  useMainButton({
    text: "Login",
    isVisible: true,
    isEnabled: true,
    isLoaderVisible: false,
    isShineEffectEnabled: false,
    onClick: () => {
      console.log("Login");
    },
  });

  return (
    <Page className="flex justify-center p-4">
      <div className="w-full h-fit max-w-sm rounded-xl border bg-card/60 p-6 mt-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="rounded-full bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
            <ShieldCheck className="size-10" aria-hidden="true" />
          </div>
          <Text className="text-xl font-semibold">Scanner access</Text>
          <Text className="text-muted-foreground">
            Enter your organization password to continue
          </Text>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </Page>
  );
};
