"use client";
import { OrderListPage as OrderListPageComponent } from "@/pages/(orders)/order-list";
import { useBackButton } from "@/shared/tma/useBackButton";

export default function OrdersPage() {
  useBackButton();
  return <OrderListPageComponent />;
}
