import { TicketsPage as TicketsPageComponent } from "@/pages/(tickets)/ui/tickets-page";

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return <TicketsPageComponent eventId={eventId} />;
}
