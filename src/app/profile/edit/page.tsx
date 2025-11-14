"use client";
import { ProfileEditPage as ProfileEditPageComponent } from "@/pages/edit-profile/ui/edit-page";
import { useBackButton } from "@/shared/tma/useBackButton";
import { useMainButton } from "@/shared/tma/useMainButton";

export default function ProfileEditPage() {
  useBackButton();
  useMainButton({
    text: "Save",
    isVisible: true,
    isEnabled: true,
    isLoaderVisible: false,
    isShineEffectEnabled: false,
    onClick: () => {
      console.log("Save");
    },
  });
  return <ProfileEditPageComponent />;
}
