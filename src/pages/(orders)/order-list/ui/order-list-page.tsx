import { Page } from "@/shared/ui";
import { OrderList } from "./order-list";
import { useGetOrdersInfiniteQuery } from "@/entities/order/model/api";
import { useMemo } from "react";
import { useGetMeQuery } from "@/entities/user/model/api";

export const OrderListPage = () => {
  const { data: user } = useGetMeQuery();
  const {
    data: ordersData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetOrdersInfiniteQuery(
    {
      user_id: user?.id ?? "",
    },
    {
      skip: !user?.id,
    },
  );
  const orders = useMemo(
    () => ordersData?.pages.flatMap((page) => page) ?? [],
    [ordersData],
  );

  return (
    <Page className="flex flex-col gap-4 p-4">
      <OrderList
        orders={orders}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Page>
  );
};
