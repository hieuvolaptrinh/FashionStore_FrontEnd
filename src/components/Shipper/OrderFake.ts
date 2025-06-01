import { Order } from "../../models/OrderModel";

export const mockOrders: Order[] = [
  {
    orderId: 1001,
    status: "shipping",
    totalPrice: 350000,
    createAt: Date.now() - 24 * 60 * 60 * 1000, 
    pay: true,
    recipientName: "Nguyễn Văn A",
    recipientPhone: "0123456789",
    recipientAddress: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 1,
        quantity: 2,
        price: 65000,
        mainImage: "/images/p11.jpg",
        productName: "Vòng tay đá tự nhiên",
        description:
          "Vòng tay thủ công sử dụng đá tự nhiên, mang lại vẻ đẹp tinh tế và ý nghĩa phong thủy.",
      },
      {
        orderDetailId: 2,
        quantity: 1,
        price: 220000,
        mainImage: "/images/p81.jpg",
        productName: "Gối tựa thêu tay",
        description:
          "Gối lưng handmade có họa tiết thêu tay tinh tế, dùng trang trí hoặc nghỉ ngơi.",
      },
    ],
  },
  {
    orderId: 1002,
    status: "delivered",
    totalPrice: 325000,
    createAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    pay: true,
    recipientName: "Trần Thị B",
    recipientPhone: "0987654321",
    recipientAddress: "456 Nguyễn Huệ, Quận 1, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 3,
        quantity: 1,
        price: 100000,
        mainImage: "/images/p21.jpg",
        productName: "Túi vải bố họa tiết tay",
        description:
          "Túi handmade từ vải bố thân thiện với môi trường, in họa tiết vẽ tay độc đáo.",
      },
      {
        orderDetailId: 4,
        quantity: 3,
        price: 75000,
        mainImage: "/images/p51.jpg",
        productName: "Nến thơm thiên nhiên",
        description:
          "Nến handmade từ sáp đậu nành, hương liệu thiên nhiên giúp thư giãn.",
      },
    ],
  },
  {
    orderId: 1003,
    status: "return_requested",
    totalPrice: 310000,
    createAt: Date.now() - 3 * 24 * 60 * 60 * 1000, 
    pay: true,
    recipientName: "Lê Văn C",
    recipientPhone: "0909123456",
    recipientAddress: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 5,
        quantity: 1,
        price: 130000,
        mainImage: "/images/p31.jpg",
        productName: "Sổ tay da vintage",
        description:
          "Sổ tay thủ công bọc da, giấy kraft phong cách cổ điển phù hợp học sinh, sinh viên.",
      },
      {
        orderDetailId: 6,
        quantity: 2,
        price: 90000,
        mainImage: "/images/p91.jpg",
        productName: "Bình gốm mini decor",
        description:
          "Bình gốm thủ công nhỏ gọn, trang trí bàn làm việc hoặc kệ sách.",
      },
    ],
  },
];
