"use client";
import { ProfileEditPage as ProfileEditPageComponent } from "@/pages/edit-profile/ui/edit-page";
import { useBackButton } from "@/shared/tma/useBackButton";
import { useMainButton } from "@/shared/tma/useMainButton";
import { useFormContext, useForm, FormProvider } from "react-hook-form";
import { ProfileFormData } from "@/pages/edit-profile/ui/edit-page";
import { useUpdateMeMutation, useGetMeQuery } from "@/entities/user/model/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserGenderEnum } from "@/entities/user/model/types";

function ProfileEditPageWrapper() {
  const router = useRouter();
  const { formState, getValues } = useFormContext<ProfileFormData>();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const hasChanges = formState.isDirty;

  const handleUpdate = async (data: ProfileFormData) => {
    try {
      toast.dismiss();
      await updateMe({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        gender: data.gender,
        avatar_url: data.avatar_url,
      }).unwrap();
      toast.success("Profile updated successfully");
      router.back();
    } catch {
      toast.dismiss();
      toast.error("Failed to update profile");
    }
  };

  useBackButton();

  useMainButton({
    text: "Save",
    isVisible: hasChanges,
    isEnabled: hasChanges && !isUpdating,
    isLoaderVisible: isUpdating,
    onClick: async () => await handleUpdate(getValues()),
  });

  return <ProfileEditPageComponent />;
}

export default function ProfileEditPage() {
  const { data: user } = useGetMeQuery();

  const form = useForm<ProfileFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      gender: "male" as UserGenderEnum,
      avatar_url: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        gender: (user.gender as UserGenderEnum) || "male",
        avatar_url: user.avatar_url || null,
      });
    }
  }, [user, form]);

  return (
    <FormProvider {...form}>
      <ProfileEditPageWrapper />
    </FormProvider>
  );
}
