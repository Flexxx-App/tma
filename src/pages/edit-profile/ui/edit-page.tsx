"use client";

import { Page } from "@/shared/ui";
import { EditProfileForm } from "./form";
import { UserGenderEnum } from "@/entities/user/model/types";

export type ProfileFormData = {
  first_name?: string;
  last_name?: string;
  username?: string;
  gender?: UserGenderEnum;
  avatar_url?: string | null;
};

export const ProfileEditPage = () => {
  return (
    <Page className="flex flex-col">
      <EditProfileForm className="pt-10" />
    </Page>
  );
};
