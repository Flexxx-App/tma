"use client";

import { AvatarForm } from "./avatar-form";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  InputGroup,
  InputGroupInput,
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemIndicator,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
  Slider,
} from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { Mars, Search, Venus, VenusAndMars } from "lucide-react";
import { CircleIcon } from "lucide-react";
import { OnboardingFormData } from "./oboarding-page";

export const UserDetailsStep = () => {
  const form = useFormContext<OnboardingFormData>();
  const watchAge = form.watch("age");
  const genderOptions = [
    { label: "Male", value: "male", icon: <Mars /> },
    { label: "Female", value: "female", icon: <Venus /> },
    { label: "Other", value: "other", icon: <VenusAndMars /> },
  ];

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full! mb-10!">
      <AvatarForm />
      <FieldGroup className="w-full gap-4">
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder="John"
                {...form.register("first_name", { required: true })}
              />
            </InputGroup>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder="Doe"
                {...form.register("last_name")}
              />
            </InputGroup>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder="@username"
                {...form.register("username", { required: true })}
              />
            </InputGroup>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Age</FieldLabel>
          <FieldContent>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-15">
                {watchAge || 18} y.o.
              </span>
              <Slider
                min={12}
                max={100}
                step={1}
                value={[watchAge || 18]}
                onValueChange={(value) => {
                  if (value[0] !== watchAge) {
                    form.setValue("age", value[0], {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }
                }}
                className="w-full"
              />
            </div>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Gender</FieldLabel>
          <FieldContent>
            <Choicebox
              defaultValue="male"
              style={{
                gridTemplateColumns: `repeat(${genderOptions.length}, 1fr)`,
              }}
              autoFocus={false}
            >
              {genderOptions.map((option) => (
                <ChoiceboxItem key={option.value} value={option.value}>
                  <ChoiceboxItemHeader>
                    {option.icon}
                    <ChoiceboxItemTitle>{option.label}</ChoiceboxItemTitle>
                  </ChoiceboxItemHeader>
                  <ChoiceboxItemContent>
                    <ChoiceboxItemIndicator>
                      <CircleIcon className="size-2 fill-primary" />
                    </ChoiceboxItemIndicator>
                  </ChoiceboxItemContent>
                </ChoiceboxItem>
              ))}
            </Choicebox>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  );
};
