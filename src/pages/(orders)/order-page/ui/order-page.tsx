import { Page, Field, FieldLabel, FieldContent } from "@/shared/ui";
import { OrderPageHeader } from "./header";
import { Tracking } from "./tracking";
import { Summary } from "./summary";
import { Customer } from "./customer";
import { useGetOrderQuery } from "@/entities/order/model/api";
import LoadingPage from "@/app/orders/[id]/loading";

export const OrderPage = ({ id }: { id: string }) => {
  const { data: order } = useGetOrderQuery(id, {
    skip: !id,
  });

  if (!order) {
    return <LoadingPage />;
  }

  return (
    <Page className="flex flex-col gap-7 p-4 mb-20">
      <OrderPageHeader
        id={order.id}
        status={order.status}
        createdAt={order.createdAt}
      />
      <Field>
        <FieldLabel>Tracking updates</FieldLabel>
        <FieldContent>
          <Tracking
            trackingNumber={order.shipping.trackingNumber}
            trackingUrl={order.shipping.trackingUrl}
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <FieldContent>
          <Summary order={order} />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Customer</FieldLabel>
        <FieldContent>
          <Customer order={order} />
        </FieldContent>
      </Field>
    </Page>
  );
};
