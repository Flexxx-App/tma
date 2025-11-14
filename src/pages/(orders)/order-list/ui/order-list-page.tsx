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
    subtotalAmount: 100,
    shippingAmount: 10,
    taxAmount: 10,
    shipping: {
      trackingNumber: "1234567890",
      trackingUrl: "https://example.com/tracking",
    },
    customer: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Main St, Anytown, USA",
      paymentMethod: "PayPal",
    },
    items: [
      {
        id: "1",
        orderId: "1",
        totalAmount: 100,
        title: "Event 1",
        quantity: 1,
        image:
          "https://cdn.europosters.eu/image/750/posters/vintage-new-york-poster-i187882.jpg",
      },
      {
        id: "2",
        orderId: "1",
        totalAmount: 100,
        title: "Event 2",
        quantity: 1,
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
