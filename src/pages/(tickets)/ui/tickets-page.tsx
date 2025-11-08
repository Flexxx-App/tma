import { Page } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { TicketList } from "./ticket-list";
import { IPass } from "@/entities/passes/model/types";

interface IProps {
  className?: string;
  eventId: string;
}

const mockPasses: IPass[] = [
  {
    id: "1",
    eventId: "1",
    userId: "1",
    name: "Early Bird",
    createdAt: "2025-01-01",
    secret: "1234567890",
    status: "active",
  },
  {
    id: "2",
    eventId: "1",
    userId: "2",
    name: "Regular",
    createdAt: "2025-01-02",
    secret: "1234567890",
    status: "active",
  },
];

export function TicketsPage({ className, ...props }: IProps) {
  return (
    <Page
      className={cn(
        "flex flex-col gap-2 flex-1 justify-center items-center h-full",
        className
      )}
      {...props}
    >
      <TicketList passes={mockPasses} />
    </Page>
  );
}
