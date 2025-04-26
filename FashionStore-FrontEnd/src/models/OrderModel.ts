export interface OrderModel {
  addressId: number;
  paymentTypeId: number;
  shippingMethodId: number;
  selectedIds: number[]; // Danh sách cartDetailId
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
  isPay: boolean;
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
