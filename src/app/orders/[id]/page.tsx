"use client";

import { OrderPage as OrderPageComponent } from "@/pages/(orders)/order-page";
import { useBackButton } from "@/shared/tma/useBackButton";
import React from "react";

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  useBackButton();
  return <OrderPageComponent id={id} />;
}
