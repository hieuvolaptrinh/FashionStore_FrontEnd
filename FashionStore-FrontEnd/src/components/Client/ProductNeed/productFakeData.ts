export type ProductNeed = {
  id: number;
  productName: string;
  description: string;
  salePrice: number;
  type: string;
  images: string[];
  instructions: string;
  materials: string[];
};
export const dataFake: ProductNeed[] = [
  {
    id: 1,
    productName: "Vòng tay đá tự nhiên",
    description:
      "Vòng tay thủ công sử dụng đá tự nhiên, mang lại vẻ đẹp tinh tế và ý nghĩa phong thủy.",
    salePrice: 65000,
    type: "Trang sức",
    images: [
      "./images/p11.jpg",
      "./images/p12.jpg",
      "./images/p13.jpg",
      "./images/p14.jpg",
    ],
    instructions:
      "Xâu chuỗi đá theo thứ tự mẫu, buộc dây chắc chắn và kiểm tra độ bền.",
    materials: ["Đá tự nhiên", "Dây chun co giãn", "Keo dán"],
  },
  {
    id: 2,
    productName: "Túi vải bố họa tiết tay",
    description:
      "Túi handmade từ vải bố thân thiện với môi trường, in họa tiết vẽ tay độc đáo.",
    salePrice: 100000,
    type: "Túi xách",
    images: ["./images/p21.jpg", "./images/p22.jpg", "./images/p23.jpg"],
    instructions:
      "Cắt vải theo mẫu, may đường viền, vẽ và in họa tiết bằng tay.",
    materials: ["Vải bố", "Chỉ may", "Mực vẽ vải", "Kim may", "Máy may"],
  },
  {
    id: 3,
    productName: "Sổ tay da vintage",
    description:
      "Sổ tay thủ công bọc da, giấy kraft phong cách cổ điển phù hợp học sinh, sinh viên.",
    salePrice: 130000,
    type: "Văn phòng phẩm",
    images: ["./images/p31.jpg", "./images/p32.jpg", "./images/p33.jpg"],
    instructions:
      "Cắt giấy, bọc da và khâu gáy bằng tay để đảm bảo độ chắc chắn.",
    materials: ["Giấy kraft", "Da PU", "Kim khâu", "Chỉ sáp"],
  },
  {
    id: 4,
    productName: "Móc khóa len thú bông",
    description: "Móc khóa hình thú đan len thủ công đáng yêu, nhiều màu sắc.",
    salePrice: 35000,
    type: "Phụ kiện",
    images: ["./images/p41.jpg", "./images/p42.jpg"],
    instructions: "Móc len theo chart, nhồi bông và gắn móc khóa.",
    materials: ["Len cotton", "Kim móc", "Bông nhồi", "Móc khoá"],
  },
  {
    id: 5,
    productName: "Nến thơm thiên nhiên",
    description:
      "Nến handmade từ sáp đậu nành, hương liệu thiên nhiên giúp thư giãn.",
    salePrice: 75000,
    type: "Trang trí",
    images: ["./images/p51.jpg", "./images/p52.jpg", "./images/p53.jpg"],
    instructions: "Đun chảy sáp, thêm tinh dầu, đổ khuôn và để nguội.",
    materials: [
      "Sáp đậu nành",
      "Tinh dầu thiên nhiên",
      "Bấc nến",
      "Hũ thủy tinh",
    ],
  },
  {
    id: 6,
    productName: "Giỏ lục bình handmade",
    description:
      "Giỏ đựng đồ thủ công đan từ lục bình, thân thiện môi trường và bền đẹp.",
    salePrice: 160000,
    type: "Gia dụng",
    images: ["./images/p61.jpg", "./images/p62.jpg", "./images/p63.jpg"],
    instructions: "Ngâm mềm lục bình, đan theo khuôn, xử lý chống ẩm mốc.",
    materials: ["Cọng lục bình", "Khuôn tre", "Dây buộc", "Sơn bảo vệ"],
  },
  {
    id: 7,
    productName: "Đèn lồng giấy handmade",
    description: "Đèn giấy gấp thủ công dùng trang trí phòng ngủ, dịp lễ Tết.",
    salePrice: 60000,
    type: "Trang trí",
    images: ["./images/p71.jpg", "./images/p72.jpg", "./images/p73.jpg"],
    instructions: "Cắt giấy theo mẫu, gấp và dán thành hình đèn lồng.",
    materials: ["Giấy màu", "Keo dán", "Kéo", "Dây treo"],
  },
  {
    id: 8,
    productName: "Gối tựa thêu tay",
    description:
      "Gối lưng handmade có họa tiết thêu tay tinh tế, dùng trang trí hoặc nghỉ ngơi.",
    salePrice: 220000,
    type: "Gia dụng",
    images: ["./images/p81.jpg", "./images/p82.jpg"],
    instructions: "Cắt vải, thêu họa tiết bằng tay, may ruột gối và vỏ gối.",
    materials: ["Vải thô", "Chỉ thêu", "Bông gòn", "Kim thêu"],
  },
  {
    id: 9,
    productName: "Bình gốm mini decor",
    description:
      "Bình gốm thủ công nhỏ gọn, trang trí bàn làm việc hoặc kệ sách.",
    salePrice: 90000,
    type: "Trang trí",
    images: [
      "./images/p91.jpg",
      "./images/p92.jpg",
      "./images/p93.jpg",
      "./images/p94.jpg",
    ],
    instructions: "Nặn đất, tạo hình, nung trong lò, sơn và phủ men.",
    materials: ["Đất sét", "Lò nung", "Sơn gốm", "Men bóng"],
  },
  {
    id: 10,
    productName: "Trang sức resin thủ công",
    description:
      "Dây chuyền, hoa tai làm từ nhựa resin với hoa khô, ánh kim nghệ thuật.",
    salePrice: 95000,
    type: "Trang sức",
    images: ["./images/p101.jpg", "./images/p102.jpg", "./images/p103.jpg"],
    instructions:
      "Pha resin, đổ vào khuôn cùng phụ kiện, phơi khô trong vòng 24h.",
    materials: ["Nhựa resin", "Khuôn silicone", "Hoa khô", "Móc trang sức"],
  },
];
