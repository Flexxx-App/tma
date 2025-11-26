import { GeneratedInvitePage as GeneratedInvitePageComponent } from "@/pages/(scanner)/generated-invite";
import React from "react";

export default function GeneratedInvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return <GeneratedInvitePageComponent inviteId={id} />;
}
