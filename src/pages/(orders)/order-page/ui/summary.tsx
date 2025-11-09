import { IOrder } from "@/entities/order/model/types";
import { cn } from "@/shared/lib/utils";
import { OrderItemCard } from "@/entities/order/ui/order-item-card";
import { Separator } from "@/shared/ui/separator";
import { Text } from "@/shared/ui/text";

interface IProps {
  order: IOrder;
  className?: string;
}

interface ISummaryFeeItemProps {
  label: string;
  value: number;
  currency: string;
}

const SummaryFeeItem = ({ label, value, currency }: ISummaryFeeItemProps) => {
  return (
    <div className="flex justify-between">
      <Text className="text-sm">{label}</Text>
      <Text className="text-sm font-thin">
        {value} {currency}
      </Text>
    </div>
  );
};

export const Summary = ({ order, className }: IProps) => {
  return (
    <div
      className={cn(className, "flex flex-col gap-2 bg-card rounded-md p-4")}
    >
      <div className="flex flex-col gap-2">
        {order.items.map((item) => (
          <OrderItemCard
            key={item.id}
            orderItem={item}
            currency={order.currency}
          />
        ))}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <SummaryFeeItem
          label="Subtotal"
          value={order.subtotalAmount}
          currency={order.currency}
        />
        <SummaryFeeItem
          label="Shipping"
          value={order.shippingAmount}
          currency={order.currency}
        />
        <SummaryFeeItem
          label="Tax"
          value={order.taxAmount}
          currency={order.currency}
        />
      </div>
      <Separator />
      <div className="flex justify-between gap-2">
        <Text className="text-sm">Total</Text>
        <Text className="text-sm">
          {order.totalAmount} {order.currency}
        </Text>
      </div>
    </div>
  );
};
