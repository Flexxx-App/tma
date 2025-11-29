import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui";
import { IPass } from "@/entities/guest/model/types";

interface ITicketListProps {
  passes: IPass[];
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

export const TicketList = ({ passes }: ITicketListProps) => {
  return (
    <div className="flex flex-col gap-2 bg-card rounded-md p-4">
      {passes.map((pass) => (
        <TicketItem
          key={pass.id}
          name={pass.name}
          quantity={pass.quantity || 1}
        />
      ))}
    </div>
  );
};
