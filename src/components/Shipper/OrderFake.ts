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
  // Thêm các đơn hàng đã giao thành công
  {
    orderId: 1004,
    status: "delivered",
    totalPrice: 175000,
    createAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    pay: true,
    recipientName: "Phạm Thị D",
    recipientPhone: "0978123654",
    recipientAddress: "123 Nguyễn Du, Quận 3, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 7,
        quantity: 1,
        price: 175000,
        mainImage: "/images/p42.jpg",
        productName: "Khăn len thủ công",
        description:
          "Khăn len được đan thủ công từ len tự nhiên, ấm áp và thời trang.",
      },
    ],
  },
  {
    orderId: 1005,
    status: "delivered",
    totalPrice: 450000,
    createAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    pay: true,
    recipientName: "Hoàng Văn E",
    recipientPhone: "0912345987",
    recipientAddress: "456 Lý Thường Kiệt, Quận 10, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 8,
        quantity: 3,
        price: 90000,
        mainImage: "/images/p61.jpg",
        productName: "Túi đeo chéo canvas",
        description:
          "Túi đeo chéo làm từ canvas bền đẹp, thiết kế trẻ trung hiện đại.",
      },
      {
        orderDetailId: 9,
        quantity: 1,
        price: 180000,
        mainImage: "/images/p71.jpg",
        productName: "Đèn ngủ handmade",
        description:
          "Đèn ngủ handmade từ nguyên liệu tự nhiên, tạo không gian ấm áp.",
      },
    ],
  },
  {
    orderId: 1006,
    status: "delivered",
    totalPrice: 520000,
    createAt: Date.now() - 12 * 24 * 60 * 60 * 1000,
    pay: true,
    recipientName: "Mai Thị F",
    recipientPhone: "0965432109",
    recipientAddress: "789 Hồ Xuân Hương, Quận Phú Nhuận, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 10,
        quantity: 2,
        price: 170000,
        mainImage: "/images/p13.jpg",
        productName: "Tranh thêu tay",
        description: "Tranh thêu tay tinh xảo với họa tiết hoa cỏ tự nhiên.",
      },
      {
        orderDetailId: 11,
        quantity: 1,
        price: 180000,
        mainImage: "/images/p23.jpg",
        productName: "Bộ ly sứ handmade",
        description: "Bộ ly sứ được làm và vẽ thủ công, độc đáo và sang trọng.",
      },
    ],
  },
  {
    orderId: 1007,
    status: "delivered",
    totalPrice: 280000,
    createAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    pay: true,
    recipientName: "Trịnh Văn G",
    recipientPhone: "0934567890",
    recipientAddress: "321 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 12,
        quantity: 1,
        price: 280000,
        mainImage: "/images/p33.jpg",
        productName: "Ví da handmade",
        description:
          "Ví da thủ công từ da bò thật 100%, thiết kế tinh tế và bền bỉ.",
      },
    ],
  },
  {
    orderId: 1008,
    status: "delivered",
    totalPrice: 390000,
    createAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    pay: true,
    recipientName: "Lý Thị H",
    recipientPhone: "0901234567",
    recipientAddress: "654 Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 13,
        quantity: 2,
        price: 120000,
        mainImage: "/images/p43.jpg",
        productName: "Móc khóa gỗ khắc tên",
        description:
          "Móc khóa gỗ thủ công được khắc tên theo yêu cầu, quà tặng ý nghĩa.",
      },
      {
        orderDetailId: 14,
        quantity: 1,
        price: 150000,
        mainImage: "/images/p53.jpg",
        productName: "Hộp đựng trang sức",
        description:
          "Hộp đựng trang sức handmade từ gỗ tự nhiên với họa tiết chạm khắc.",
      },
    ],
  },
  {
    orderId: 1009,
    status: "delivered",
    totalPrice: 630000,
    createAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    pay: true,
    recipientName: "Phan Văn I",
    recipientPhone: "0989876543",
    recipientAddress: "258 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    orderDetails: [
      {
        orderDetailId: 15,
        quantity: 1,
        price: 420000,
        mainImage: "/images/p63.jpg",
        productName: "Đồng hồ treo tường vintage",
        description:
          "Đồng hồ treo tường thủ công phong cách vintage, làm từ gỗ tự nhiên.",
      },
      {
        orderDetailId: 16,
        quantity: 3,
        price: 70000,
        mainImage: "/images/p73.jpg",
        productName: "Cốc uống trà gốm sứ",
        description:
          "Cốc uống trà làm từ gốm sứ thủ công với men tráng độc đáo.",
      },
    ],
  },
];
