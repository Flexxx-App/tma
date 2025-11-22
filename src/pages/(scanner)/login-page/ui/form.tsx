import {
  Field,
  FieldContent,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  FieldError,
} from "@/shared/ui";
import { KeyRound } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { IAuthScanner } from "@/entities/scanner/model/types";

interface IProps {
  className?: string;
}

export const LoginForm = ({ className }: IProps) => {
  const form = useFormContext<IAuthScanner>();
  return (
    <Field>
      <FieldContent>
        <InputGroup>
          <InputGroupInput
            type="password"
            placeholder="Password"
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
  );
};
