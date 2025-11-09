import { Page } from "@/shared/ui";
import { OrderList } from "./order-list";
import { IOrder } from "@/entities/order/model/types";

const mockOrders: IOrder[] = [
  {
    id: "1",
    userId: "1",
    event: {
      id: "1",
      posterUrl:
        "https://cdn.europosters.eu/image/750/posters/vintage-new-york-poster-i187882.jpg",
      title: "Event 1",
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    status: "paid",
    totalAmount: 100,
    currency: "USD",
    items: [
      {
        id: "1",
        orderId: "1",
        totalAmount: 100,
        image:
          "https://cdn.europosters.eu/image/750/posters/vintage-new-york-poster-i187882.jpg",
      },
      {
        id: "2",
        orderId: "1",
        totalAmount: 100,
        image:
          "https://cdn.europosters.eu/image/750/posters/vintage-new-york-poster-i187882.jpg",
      },
    ],
  },
];

export const OrderListPage = () => {
  return (
    <Page className="flex flex-col gap-4 p-4">
      <OrderList orders={mockOrders} />
    </Page>
  );
};
