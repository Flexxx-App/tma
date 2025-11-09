import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Text } from "@/shared/ui/text";
import { IOrderItem } from "../model/types";

interface IProps {
  orderItem: IOrderItem;
  currency: string;
  className?: string;
}

export const OrderItemCard = ({ orderItem, currency, className }: IProps) => {
  return (
    <div className={cn(className, "flex gap-2 overflow-hidden")}>
      <Image
        src={orderItem.image}
        alt="Order item"
        width={50}
        height={50}
        className="w-10 h-10 object-cover rounded-sm"
      />
      <div className="flex justify-between w-full gap-2">
        <div className="flex flex-col">
          <Text className="text-sm font-semibold truncate w-38">
            {orderItem.title}
          </Text>
          <Text className="text-sm text-muted-foreground flex-1 shrink-0">
            Qty: {orderItem.quantity}
          </Text>
        </div>
        <Text className="text-sm font-thin w-fit text-right whitespace-nowrap shrink-0">
          {orderItem.totalAmount} {currency}
        </Text>
      </div>
    </div>
  );
};
