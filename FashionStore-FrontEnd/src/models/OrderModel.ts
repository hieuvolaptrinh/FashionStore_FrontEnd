export interface OrderModel {
  addressId: number;
  paymentTypeId: number;
  shippingMethodId: number;
  selectedIds: number[]; // Danh sách cartDetailId
  bankAccountId?: number; // Optional bank account ID for bank transfer payments
}
export interface PaymentType {
  paymentTypeId?: number;
  paymentTypeName: string;
  description: string;
  fee: number; // phí vận chuyển
}

export interface ShippingMethod {
  shippingMethodId?: number;
  shippingMethodName: string;
  description: string;
  fee: number; // phí vận chuyển
}

export interface ResponseOrder {
  orderId: number;
  status: string;
  totalPrice: number;
  createAt: number;
  pay: boolean;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  orderDetailId: number;
  quantity: number;
  price: number;
  mainImage: string;
  productName: string;
  description: string;
}

// fake data
export interface Order {
  orderId: number;
  status: string; // "shipping", "delivered", "return_requested"
  totalPrice: number;
  createAt: number;
  pay: boolean;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  orderDetails: OrderDetail[];
}
