import { OrderPage as OrderPageComponent } from "@/pages/(orders)/order-page";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderPageComponent id={id} />;
}
