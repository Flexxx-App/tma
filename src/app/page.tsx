"use client";

import { EventTicketsPage } from "@/pages/events";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";

export default function Home() {
  const router = useRouter();
  const launchParams = retrieveLaunchParams();

  useEffect(() => {
    if (launchParams.tgWebAppStartParam?.includes("onboarding")) {
      router.push("/onboarding");
    }
  }, [launchParams.tgWebAppStartParam]);
  return <EventTicketsPage />;
}
