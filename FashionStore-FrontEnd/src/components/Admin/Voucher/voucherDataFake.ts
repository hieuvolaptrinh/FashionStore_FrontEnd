export interface Voucher {
  id: string;
  code: string;
  expiryDate: string;
  discountAmount: number;
  conditions: string;
}

export const voucherData: Voucher[] = [
  {
    id: "1",
    code: "SUMMER2024",
    expiryDate: "2024-08-31",
    discountAmount: 200000,
    conditions: "Áp dụng cho đơn hàng từ 1 triệu đồng trở lên",
  },
  {
    id: "2",
    code: "WELCOME10",
    expiryDate: "2024-12-31",
    discountAmount: 100000,
    conditions: "Áp dụng cho khách hàng mới, giảm tối đa 10% giá trị đơn hàng",
  },
  {
    id: "3",
    code: "FLASH50",
    expiryDate: "2024-06-30",
    discountAmount: 500000,
    conditions: "Áp dụng cho tất cả sản phẩm trong chương trình Flash Sale",
  },
];
