import { UserInfoWidget } from "./user-info";
import { Button, Page } from "@/shared/ui";
import { PencilIcon, ScanLine } from "lucide-react";
import { NavList } from "./nav-list";

export const ProfilePage = () => {
  return (
    <Page>
      <UserInfoWidget
        name="John Doe"
        username="john.doe"
        avatar="https://github.com/shadcn.png"
        className="pt-10"
      />
      <NavList className="px-4" />
      <Button
        className="absolute right-4 p-2! h-8 top-4 rounded-full! border-none text-md text-muted-foreground hover:bg-transparent hover:text-foreground"
        variant="outline"
      >
        <PencilIcon className="size-4" />
      </Button>
      <Button
        className="absolute p-2! h-8 left-4 top-4 rounded-full! border-none text-md text-muted-foreground hover:bg-transparent hover:text-foreground"
        variant="outline"
      >
        <ScanLine className="size-4" />
      </Button>
    </Page>
  );
};
