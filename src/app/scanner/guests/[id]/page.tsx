"use client";
import { GuestInfoPage as GuestInfoPageComponent } from "@/pages/(scanner)/guest-info/ui/guest-info-page";
import { useBackButton } from "@/shared/tma/useBackButton";
import { useParams } from "next/navigation";

export default function GuestInfoPage() {
  const params = useParams();
  const id = params?.id as string;
  useBackButton();
  return <GuestInfoPageComponent id={id} />;
}
