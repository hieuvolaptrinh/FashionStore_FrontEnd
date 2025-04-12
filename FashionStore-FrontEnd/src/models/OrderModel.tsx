export interface OrderModel {
  name: string;
  phone: string;
  paymentMethod: string;
  addressId: number; // Chọn địa chỉ cũ
  selectedIds: number[]; // Danh sách cartDetailId
}
