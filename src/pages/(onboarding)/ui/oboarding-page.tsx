/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Page,
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperContent,
  StepperTitle,
  StepperIndicator,
  StepperNav,
  StepperPanel,
} from "@/shared/ui";
import { useForm, FormProvider } from "react-hook-form";
import { UserGenderEnum } from "@/entities/user/model/types";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { Venus, Mars, VenusAndMars } from "lucide-react";
import { useMainButton } from "@/shared/tma/useMainButton";
import { useSecondaryButton } from "@/shared/tma/useSecondaryButton";
import { useCompleteOnboardingMutation } from "@/entities/user/model/api";
import { UserDetailsStep } from "./user-details-step";
import { LocationStep } from "./location-step";

export type OnboardingFormData = {
  avatar_url: string | null;
  first_name: string;
  last_name: string | null;
  username: string;
  gender: UserGenderEnum | null;
  age: number | null;
  country: string;
  city: string;
  phone: string | null;
};

const steps = [
  {
    title: "Profile",
    component: <UserDetailsStep />,
  },
  { title: "Location", component: <LocationStep /> },
];

export const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(1);
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
  const username =
    typeof tgWebAppUser.username === "string"
      ? tgWebAppUser.username
      : typeof initData?.tgWebAppStartParam === "string"
        ? initData.tgWebAppStartParam
        : "";
  const avatar_url =
    typeof tgWebAppUser.photoUrl === "string" ? tgWebAppUser.photoUrl : null;

  const form = useForm<OnboardingFormData>({
    mode: "onChange",
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      username: username || "",
      avatar_url: avatar_url || null,
      gender: null,
      age: null,
      country: "",
      city: "",
      phone: null,
    },
  });

  const [completeOnboarding, { isLoading }] = useCompleteOnboardingMutation();

  const watchAge = form.watch("age");
  const watchFirstName = form.watch("first_name");
  const watchUsername = form.watch("username");
  const watchCity = form.watch("city");
  const watchCountry = form.watch("country");

  const isStep1Valid = useMemo(() => {
    return Boolean(
      watchFirstName?.trim() &&
        watchUsername?.trim() &&
        (watchAge === null || watchAge === undefined || watchAge >= 12),
    );
  }, [watchAge, watchFirstName, watchUsername]);

  const isStep2Valid = useMemo(() => {
    console.log(
      "isStep2Valid",
      isStep1Valid,
      watchCity?.trim(),
      watchCountry?.trim(),
    );
    return Boolean(isStep1Valid && watchCity?.trim() && watchCountry?.trim());
  }, [isStep1Valid, watchCity, watchCountry]);

  useMainButton({
    text: activeStep === steps.length ? "Go" : "Next",
    isEnabled: true,
    isVisible: activeStep === 1 ? isStep1Valid : isStep2Valid,
    isLoaderVisible: isLoading && activeStep === 2,
    onClick: async () => {
      if (activeStep === 1) {
        console.log("next step 1");
        setActiveStep(2);
        return;
      }

      const valid = await form.trigger();
      if (!valid) return;

      const values = form.getValues();
      try {
        await completeOnboarding(values as OnboardingFormData).unwrap();
      } catch (e) {
        // TODO: optionally show toast
        console.error(e);
      }
    },
  });

  useSecondaryButton({
    text: "Back",
    isVisible: activeStep > 1,
    position: "top",
    bgColor: "#272c30", // Telegram secondary background color for mini apps
    textColor: "#ffffff", // Telegram secondary text color for mini apps
    onClick: () => {
      setActiveStep((prev) => Math.max(1, prev - 1));
    },
  });

  useEffect(() => {
    form.setValue(
      "avatar_url",
      initData?.tgWebAppData?.user?.photo_url || null,
    );
  }, [initData]);

  return (
    <Page className="flex flex-col gap-4 mb-10">
      <Stepper
        defaultValue={1}
        value={activeStep}
        onValueChange={setActiveStep}
        className="space-y-8 px-4"
      >
        <StepperNav className="gap-3.5 mb-10">
          {steps.map((step, index) => {
            return (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative flex-1 items-start"
              >
                <StepperTrigger className="flex flex-col items-start justify-center gap-3.5 grow">
                  <StepperIndicator className="bg-border rounded-full h-1 w-full data-[state=active]:bg-primary"></StepperIndicator>
                  <div className="flex flex-col items-start gap-1">
                    <StepperTitle className="text-start font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                      {step.title}
                    </StepperTitle>
                  </div>
                </StepperTrigger>
              </StepperItem>
            );
          })}
        </StepperNav>
        <StepperPanel className="text-sm w-full!">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center w-full!"
            >
              <FormProvider {...form}>{step.component}</FormProvider>
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </Page>
  );
};
