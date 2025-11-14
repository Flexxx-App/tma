"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { backButton } from "@tma.js/sdk";

export function useBackButton(options?: { backRoute?: string | null }) {
  const router = useRouter();
  const backRoute = options?.backRoute ?? null;

  useEffect(() => {
    backButton.show();
    const handleBackClick = () => {
      if (backRoute !== null) {
        router.push(backRoute);
      } else {
        router.back();
      }
    };
    backButton.onClick(handleBackClick);

    return () => {
      backButton.hide();
    };
  }, [backRoute, router]);
}