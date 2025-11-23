import {
  Field,
  FieldContent,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/shared/ui";
import { KeyRound, UserRound } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { IAuthScanner } from "@/entities/scanner/model/types";

interface IProps {
  className?: string;
}

export const LoginForm = ({ className }: IProps) => {
  const form = useFormContext<IAuthScanner>();
  return (
    <FieldGroup className={className}>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <FieldContent>
          <InputGroup>
            <InputGroupInput
              type="text"
              placeholder="John Doe"
              {...form.register("device_name", { required: true })}
            />
            <FieldError
              errors={
                form.formState.errors.device_name
                  ? [form.formState.errors.device_name]
                  : undefined
              }
            />
            <InputGroupAddon align="inline-end">
              <UserRound className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <FieldContent>
          <InputGroup>
            <InputGroupInput
              type="password"
              placeholder="FLEX-XXXX-XXXX"
              {...form.register("password")}
              data-invalid={!!form.formState.errors.password}
            />
            <FieldError
              errors={
                form.formState.errors.password
                  ? [form.formState.errors.password]
                  : undefined
              }
            />
            <InputGroupAddon align="inline-end">
              <KeyRound className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
};
