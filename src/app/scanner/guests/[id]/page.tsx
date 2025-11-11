import { GuestInfoPage as GuestInfoPageComponent } from "@/pages/(scanner)/guest-info/ui/guest-info-page";

export default async function GuestInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GuestInfoPageComponent id={id} />;
}
