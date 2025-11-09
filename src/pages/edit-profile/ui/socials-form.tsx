import {
  Field,
  FieldContent,
  FieldLabel,
  InputGroupInput,
  InputGroup,
  InputGroupAddon,
} from "@/shared/ui";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";

interface IProps {
  className?: string;
}

const socialInputs = [
  {
    id: 1,
    label: "Instagram",
    placeholder: "@",
    icon: InstagramIcon,
  },
  {
    id: 2,
    label: "Facebook",
    placeholder: "@",
    icon: FacebookIcon,
  },
  {
    id: 3,
    label: "TikTok",
    placeholder: "@",
    icon: YoutubeIcon,
  },
];

export const SocialsForm = ({ className }: IProps) => {
  return (
    <Field className={className}>
      <FieldLabel>Socials</FieldLabel>
      <FieldContent>
        {socialInputs.map((input) => (
          <InputGroup key={input.id}>
            <InputGroupInput type="text" placeholder={input.placeholder} />
            <InputGroupAddon align="inline-end">
              <input.icon className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        ))}
      </FieldContent>
    </Field>
  );
};
