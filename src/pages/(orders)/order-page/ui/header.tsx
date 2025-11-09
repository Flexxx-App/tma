import { OrderStatus } from "@/entities/order/model/types";
import { Text } from "@/shared/ui/text";
import { Badge } from "@/shared/ui/badge";
import { formatOrderDate } from "../lib/formatOrderDate";
import { cva } from "class-variance-authority";

interface IProps {
  id: string;
  status: OrderStatus;
  createdAt: string;
}

const statusStyles = cva("w-fit text-primary-foreground", {
  variants: {
    status: {
      pending: "bg-yellow-500",
      paid: "bg-green-500",
      cancelled: "bg-red-500",
      fulfilled: "bg-green-500/10 text-green-500",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

export const OrderPageHeader = ({ id, status, createdAt }: IProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Text className="text-2xl text-primary">#{id}</Text>
        <Badge className={statusStyles({ status })}>{status}</Badge>
      </div>
      <Text className="text-sm text-muted-foreground">
        {formatOrderDate(createdAt)}
      </Text>
    </div>
  );
};
