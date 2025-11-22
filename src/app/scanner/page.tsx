"use client";
import { ScannerPage as ScannerPageComponent } from "@/pages/(scanner)/scanner-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export default function ScannerPage() {
  useBackButton();
  return <ScannerPageComponent />;
}
