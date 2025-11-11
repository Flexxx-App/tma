"use client";

import { UserInfoWidget } from "./user-info";
import { Button, Page } from "@/shared/ui";
import { PencilIcon, ScanLine } from "lucide-react";
import { NavList } from "./nav-list";
import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerAction,
  BannerDescription,
} from "@/shared/ui";
import { ScanFace } from "lucide-react";
import { useRouter } from "next/navigation";
export const ProfilePage = () => {
  const router = useRouter();
  return (
    <Page className="flex flex-col">
      <UserInfoWidget
        name="John Doe"
        username="john.doe"
        avatar="https://github.com/shadcn.png"
        className="pt-10"
      />
      <div className="px-4 mb-4">
        <Banner className="rounded-lg">
          <div className="flex items-center gap-4">
            <BannerIcon icon={ScanFace} />
            <div className="flex flex-col">
              <BannerTitle className="font-semibold">FaceTix</BannerTitle>
              <BannerDescription className="text-[#444444] hidden sm:block">
                Connect FaceID to enter events faster & easier
              </BannerDescription>
            </div>
          </div>
          <BannerAction>Connect</BannerAction>
        </Banner>
      </div>

      <NavList className="px-4" />
      <Button
        className="absolute right-4 p-2! h-8 top-4 rounded-full! border-none text-md text-muted-foreground hover:bg-transparent hover:text-foreground"
        variant="outline"
        onClick={() => {
          router.push("/profile/edit");
        }}
      >
        <PencilIcon className="size-4" />
      </Button>
      <Button
        className="absolute p-2! h-8 left-4 top-4 rounded-full! border-none text-md text-muted-foreground hover:bg-transparent hover:text-foreground"
        variant="outline"
        onClick={() => {
          router.push("/scanner/login");
        }}
      >
        <ScanLine className="size-4" />
      </Button>
    </Page>
  );
};
