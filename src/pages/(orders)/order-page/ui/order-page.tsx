import { Page, Field, FieldLabel, FieldContent } from "@/shared/ui";
import { OrderPageHeader } from "./header";
import { IOrder } from "@/entities/order/model/types";
import { Tracking } from "./tracking";
import { Summary } from "./summary";
import { Customer } from "./customer";

const mockOrder: IOrder = {
  id: "1290210",
  userId: "1",
  event: {
    id: "1",
    posterUrl: "https://example.com/poster.jpg",
    title: "Event 1",
  },
  createdAt: "2025-01-01T00:00:00.000Z",
  status: "fulfilled",
  totalAmount: 120,
  subtotalAmount: 100,
  shippingAmount: 10,
  taxAmount: 10,
  currency: "USD",
  items: [
    {
      id: "1",
      orderId: "1",
      title: "Event Merch T-Shirt Black Men",
      quantity: 2,
      totalAmount: 40,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIY969YenTvHsgWRjmSsFWgpWdnRS0aEaYw&s",
    },
  ],
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
};

export const OrderPage = ({ id }: { id: string }) => {
  console.log(id);
  return (
    <Page className="flex flex-col gap-7 p-4 mb-20">
      <OrderPageHeader
        id={mockOrder.id}
        status={mockOrder.status}
        createdAt={mockOrder.createdAt}
      />
      <Field>
        <FieldLabel>Tracking updates</FieldLabel>
        <FieldContent>
          <Tracking
            trackingNumber={mockOrder.shipping.trackingNumber}
            trackingUrl={mockOrder.shipping.trackingUrl}
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <FieldContent>
          <Summary order={mockOrder} />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Customer</FieldLabel>
        <FieldContent>
          <Customer order={mockOrder} />
        </FieldContent>
      </Field>
    </Page>
  );
};
