import React from "react";
import OrderItem from "../components/Client/Order/OrderItem";

interface Order {
  id: string;
  status: string;
  total: number;
  date: string;
  details: OrderDetail[];
}

interface OrderDetail {
  detailId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

const mockOrders: Order[] = [
  {
    id: "DH001",
    status: "Đã giao",
    total: 1500000,
    date: "15/04/2025",
    details: [
      {
        detailId: "CT001",
        productName: "Áo thun",
        price: 500000,
        quantity: 2,
        image: "https://via.placeholder.com/60",
      },
      {
        detailId: "CT002",
        productName: "Quần jeans",
        price: 500000,
        quantity: 1,
        image: "https://via.placeholder.com/60",
      },
    ],
  },
  {
    id: "DH002",
    status: "Đang xử lý",
    total: 800000,
    date: "14/04/2025",
    details: [
      {
        detailId: "CT003",
        productName: "Giày thể thao",
        price: 800000,
        quantity: 1,
        image: "https://via.placeholder.com/60",
      },
    ],
  },
];

const OrderPage: React.FC = () => (
  <div className="container py-5">
    <h2 className="mb-4">Danh sách đơn hàng</h2>
    <div className="accordion" id="ordersAccordion">
      {mockOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  </div>
);

export default OrderPage;
