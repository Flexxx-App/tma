import { IOrder, OrderStatus } from "../model/types";
import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";
import Image from "next/image";
import { formatDate } from "@/entities/event/lib/format-date";
import { Badge } from "@/shared/ui/badge";
import { cva } from "class-variance-authority";

interface IProps {
  order: IOrder;
  className?: string;
}

const orderStatusBadgeVariants = cva(
  "w-fit absolute top-4 right-4 text-primary-foreground",
  {
    variants: {
      status: {
        paid: "bg-black text-white",
        pending: "hidden",
        cancelled: "hidden",
        fulfilled: "bg-green-500/10 text-green-500",
        shipped: "bg-blue-500/10 text-blue-500",
        delivered: "bg-green-500/10 text-green-500",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

// Add all possible statuses for display
const statusText: Record<OrderStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  cancelled: "Cancelled",
  fulfilled: "Fulfilled",
};

export const OrderCard = ({ order, className, ...props }: IProps) => {
  const { event, createdAt, totalAmount, currency, status } = order;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md border border-border bg-card/30 backdrop-blur",
        className
      )}
      {...props}
    >
      <Image
        src={event.posterUrl}
        alt={event.title}
        width={100}
        height={100}
        className="w-full h-40 object-cover overflow-hidden rounded-t-md aspect-square"
      />
      <Badge className={orderStatusBadgeVariants({ status })}>
        {statusText[status as OrderStatus]}
      </Badge>
      <div className="flex flex-col px-4 pb-3">
        <Text className="text-sm text-muted-foreground -mt-1">
          {totalAmount} {currency}
        </Text>
        <Text className="text-lg font-semibold">{event.title}</Text>
        <Text className="text-sm text-muted-foreground">
          {formatDate(createdAt)}
        </Text>
      </div>
    </div>
  );
};
