import { GeneratedInvitePage as GeneratedInvitePageComponent } from "@/pages/(scanner)/generated-invite";

export default function GeneratedInvitePage({
  params,
}: {
  params: { id: string };
}) {
  return <GeneratedInvitePageComponent inviteId={params.id} />;
}
