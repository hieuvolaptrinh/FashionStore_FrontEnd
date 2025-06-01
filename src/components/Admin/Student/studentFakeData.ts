export interface StudentProduct {
  id: number;
  name: string;
  msv: string;
  productName: string;
  image: string;
  money: number;
  quantity: number;
  commission: number;
  status: "Chưa nộp" | "Đã nộp" | "Đang làm";
}

export const studentProductData: StudentProduct[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    msv: "123456",
    productName: "Ví da",
    image: "/images/p11.jpg",
    money: 1232132,
    quantity: 86,
    commission: 123213,
    status: "Đã nộp",
  },
  {
    id: 2,
    name: "Trần Thị B",
    msv: "123457",
    productName: "Túi xách",
    image: "/images/p12.jpg",
    money: 1500000,
    quantity: 53,
    commission: 150000,
    status: "Đang làm",
  },
  {
    id: 3,
    name: "Lê Văn C",
    msv: "123458",
    productName: "Balo",
    image: "/images/p13.jpg",
    money: 2000000,
    quantity: 64,
    commission: 200000,
    status: "Chưa nộp",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    msv: "123459",
    productName: "Ví nữ",
    image: "/images/p14.jpg",
    money: 1800000,
    quantity: 63,
    commission: 180000,
    status: "Đã nộp",
  },
];
