import { IOrder } from "@/entities/order/model/types";
import { OrderCard } from "@/entities/order/ui/order-card";
import { cn } from "@/shared/lib/utils";
import { InfiniteScroll } from "@/shared/ui/infinite-scroll";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/shared/ui/empty";
import { Ghost } from "lucide-react";

interface IProps {
  orders: IOrder[];
  className?: string;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

export const OrderList = ({
  orders,
  className,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  ...props
}: IProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {orders.length > 0 ? (
        <InfiniteScroll
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        >
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id}>
              <OrderCard order={order} />
            </Link>
          ))}
        </InfiniteScroll>
      ) : (
        <Empty>
          <EmptyContent className="flex flex-col items-center justify-center gap-0!">
            <EmptyMedia variant="icon">
              <Ghost className="size-4" />
            </EmptyMedia>
            <EmptyTitle>No orders</EmptyTitle>
            <EmptyDescription>
              Browse events and get back later.
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};
