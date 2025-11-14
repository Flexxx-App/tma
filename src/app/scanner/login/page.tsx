"use client";
import { ScannerLoginPage as ScannerLoginPageComponent } from "@/pages/(scanner)/login-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export default function ScannerLoginPage() {
  useBackButton();
  return <ScannerLoginPageComponent />;
}
