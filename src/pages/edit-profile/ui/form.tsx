"use client";

import { cn } from "@/shared/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldError,
  InputGroup,
  Field,
  InputGroupInput,
} from "@/shared/ui";
import { SocialsForm } from "./socials-form";
import { useFormContext } from "react-hook-form";
import { ProfileFormData } from "./edit-page";
import { useGetMeQuery } from "@/entities/user/model/api";

interface IProps {
  className?: string;
}
export const EditProfileForm = ({ className }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormData>();
  const { data: user } = useGetMeQuery();

  const getInitials = () => {
    if (!user) return "U";
    const first = user.first_name?.[0] || "";
    const last = user.last_name?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 justify-center flex-col",
        className,
      )}
    >
      <Avatar className="size-24">
        <AvatarImage src={user?.avatar_url || undefined} />
        <AvatarFallback>{getInitials()}</AvatarFallback>
      </Avatar>
      <FieldGroup>
        <Field data-invalid={!!errors.first_name}>
          <FieldLabel>First Name</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
            </InputGroup>
            <FieldError
              errors={errors.first_name ? [errors.first_name] : undefined}
            />
          </FieldContent>
        </Field>
        <Field data-invalid={!!errors.last_name}>
          <FieldLabel>Last Name</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="text"
                {...register("last_name", {
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
            </InputGroup>
            <FieldError
              errors={errors.last_name ? [errors.last_name] : undefined}
            />
          </FieldContent>
        </Field>
        <Field data-invalid={!!errors.username}>
          <FieldLabel>Username</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder="@username"
                {...register("username", {
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers, and underscores",
                  },
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
            </InputGroup>
            <FieldError
              errors={errors.username ? [errors.username] : undefined}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
      <SocialsForm />
    </div>
  );
};
