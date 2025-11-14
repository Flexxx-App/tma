"use client";

import { ProfilePage as ProfilePageComponent } from "@/pages/(profile)/ui/profile-page";
import { backButton } from "@tma.js/sdk";
import { useEffect } from "react";

export default function ProfilePage() { 
  useEffect(() => {
    backButton.hide();
  }, []);

  return <ProfilePageComponent />;
}
