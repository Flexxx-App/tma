import { Skeleton } from "@/shared/ui";

export default function OrdersLoading() {
  const orders = Array.from({ length: 3 }, (_, index) => index);
  return (
    <div className="flex flex-col gap-4 p-4">
      {orders.map((order) => (
        <Skeleton key={order} className="w-full h-40 rounded-md" />
      ))}
    </div>
  );
}
