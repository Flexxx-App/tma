import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui";

export interface ITicket {
  id: string;
  name: string;
  quantity: number;
}

interface ITicketListProps {
  tickets: ITicket[];
}

interface ITicketItemProps {
  name: string;
  quantity: number;
}

const TicketItem = ({ name, quantity }: ITicketItemProps) => {
  return (
    <div className={cn("flex justify-between")}>
      <Text className="text-sm">{name}</Text>
      <Text className="text-sm text-muted-foreground">x{quantity}</Text>
    </div>
  );
};

export const TicketList = ({ tickets }: ITicketListProps) => {
  return (
    <div className="flex flex-col gap-2 bg-card rounded-md p-4">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          name={ticket.name}
          quantity={ticket.quantity || 1}
        />
      ))}
    </div>
  );
};
