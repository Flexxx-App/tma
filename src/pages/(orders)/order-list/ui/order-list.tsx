import { IOrder } from "@/entities/order/model/types";
import { OrderCard } from "@/entities/order/ui/order-card";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface IProps {
  orders: IOrder[];
  className?: string;
}

export const OrderList = ({ orders, className, ...props }: IProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {orders.map((order) => (
        <Link href={`/orders/${order.id}`} key={order.id}>
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
};
