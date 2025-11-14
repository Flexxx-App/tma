import { cn } from "@/shared/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  FieldGroup,
  FieldContent,
  FieldLabel,
  InputGroup,
  Field,
  InputGroupInput,
} from "@/shared/ui";
import { SocialsForm } from "./socials-form";

interface IProps {
  className?: string;
}
export const EditProfileForm = ({ className }: IProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 justify-center flex-col",
        className
      )}
    >
      <Avatar className="size-24">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <FieldGroup>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput type="text" />
            </InputGroup>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupInput type="text" placeholder="@username" />
            </InputGroup>
          </FieldContent>
        </Field>
      </FieldGroup>
      <SocialsForm />
    </div>
  );
};
