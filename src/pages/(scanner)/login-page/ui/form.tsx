import {
  Field,
  FieldContent,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/shared/ui";
import { KeyRound } from "lucide-react";

interface IProps {
  className?: string;
}

export const LoginForm = ({ className }: IProps) => {
  return (
    <form className={className}>
      <Field>
        <FieldContent>
          <InputGroup>
            <InputGroupInput type="password" placeholder="Password" />
            <InputGroupAddon align="inline-end">
              <KeyRound className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </FieldContent>
      </Field>
    </form>
  );
};
