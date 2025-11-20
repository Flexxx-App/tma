/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useMemo } from "react";
import { Page } from "@/shared/ui";
import { useForm, FormProvider } from "react-hook-form";
import { UserGenderEnum } from "@/entities/user/model/types";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { useMainButton } from "@/shared/tma/useMainButton";
import { useCompleteOnboardingMutation } from "@/entities/user/model/api";
import { UserDetailsStep } from "./user-details-step";
import { useRouter } from "next/navigation";

export type OnboardingFormData = {
  avatar_url: string | null;
  first_name: string;
  last_name: string | null;
  username: string;
  gender: UserGenderEnum | null;
  age: number | null;
  phone: string | null;
};

export const OnboardingPage = () => {
  const router = useRouter();
  const initData = useMemo(
    () => (typeof window === "undefined" ? null : retrieveLaunchParams()),
    [],
  );

  const tgWebAppUser =
    initData && typeof initData === "object" && "tgWebAppUser" in initData
      ? ((initData as any).tgWebAppUser ?? {})
      : {};

  const firstName =
    typeof tgWebAppUser.firstName === "string" ? tgWebAppUser.firstName : "";
  const lastName =
    typeof tgWebAppUser.lastName === "string" ? tgWebAppUser.lastName : "";
  const username = tgWebAppUser.username;
  const avatar_url =
    typeof tgWebAppUser.photoUrl === "string" ? tgWebAppUser.photoUrl : null;

  const form = useForm<OnboardingFormData>({
    mode: "onChange",
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      username: username || "",
      avatar_url: avatar_url || null,
      gender: "male",
      age: 18,
      phone: null,
    },
  });

  const [completeOnboarding, { isLoading }] = useCompleteOnboardingMutation();

  const watchAge = form.watch("age");
  const watchFirstName = form.watch("first_name");
  const watchUsername = form.watch("username");

  const isStep1Valid = useMemo(() => {
    return Boolean(
      watchFirstName?.trim() &&
        watchUsername?.trim() &&
        (watchAge === null || watchAge === undefined || watchAge >= 12),
    );
  }, [watchAge, watchFirstName, watchUsername]);

  useMainButton({
    text: "Go",
    isEnabled: true,
    isVisible: isStep1Valid,
    isLoaderVisible: isLoading,
    onClick: async () => {
      const valid = await form.trigger();
      if (!valid) return;

      const values = form.getValues();
      await completeOnboarding(values as OnboardingFormData)
        .unwrap()
        .then((res) => {
          router.push("/");
        })
        .catch((e) => {
          // TODO: optionally show toast
          console.error(e);
        });
    },
  });

  useEffect(() => {
    form.setValue(
      "avatar_url",
      initData?.tgWebAppData?.user?.photo_url || null,
    );
  }, [initData]);

  return (
    <Page className="flex flex-col gap-4 px-4">
      <FormProvider {...form}>
        <UserDetailsStep />
      </FormProvider>
    </Page>
  );
};
