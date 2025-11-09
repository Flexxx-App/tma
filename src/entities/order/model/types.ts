export type OrderStatus = "pending" | "paid" | "cancelled" | "fulfilled";

export interface IOrderCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  paymentMethod: string | null;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  title: string;
  image: string;
  quantity: number;
  totalAmount: number;
}

export interface IOrderEvent {
  id: string;
  posterUrl: string;
  title: string;
}

export interface IOrderShipping {
  trackingNumber: string;
  trackingUrl: string;
}

export interface IOrder {
  id: string;
  userId: string;
  event: IOrderEvent;
  createdAt: string;
  status: OrderStatus;
  totalAmount: number;
  subtotalAmount: number;
  shippingAmount: number;
  taxAmount: number;
  currency: string;
  items: IOrderItem[];
  shipping: IOrderShipping;
  customer: IOrderCustomer;
}
