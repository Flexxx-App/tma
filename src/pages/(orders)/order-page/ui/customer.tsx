import { IOrder } from "@/entities/order/model/types";
import { Text } from "@/shared/ui/text";
import { Separator } from "@/shared/ui/separator";

interface IProps {
  order: IOrder;
}
export const Customer = ({ order }: IProps) => {
  const { customer } = order;

  return (
    <div className="flex flex-col gap-4 rounded-md bg-card p-4">
      <div className="flex flex-col">
        <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Contact
        </Text>
        <Text className="text-sm">
          {customer.firstName} {customer.lastName}
        </Text>
        <Text className="text-sm ">{customer.email}</Text>
        {customer.phone ? (
          <Text className="text-sm">{customer.phone}</Text>
        ) : null}
      </div>

      <Separator />

      <div className="flex flex-col gap-1">
        <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Shipping address
        </Text>
        <Text className="text-sm">
          {customer.address ? customer.address : "-"}
        </Text>
      </div>

      <Separator />

      <div className="flex flex-col gap-1">
        <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Payment
        </Text>
        <Text className="text-sm">
          {customer.paymentMethod ? customer.paymentMethod : "-"}
        </Text>
      </div>
    </div>
  );
};
