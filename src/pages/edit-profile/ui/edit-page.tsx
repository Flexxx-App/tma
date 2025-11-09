import { Page } from "@/shared/ui";
import { EditProfileForm } from "./form";

export const ProfileEditPage = () => {
  return (
    <Page className="flex flex-col">
      <EditProfileForm className="pt-10" />
    </Page>
  );
};
