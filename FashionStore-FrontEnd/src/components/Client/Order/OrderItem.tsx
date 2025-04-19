import React from "react";
import OrderDetailComponent from "./OrderDetail";

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

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "bg-success";
      case "Đang xử lý":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="card order-card mb-3">
      <div
        className="card-header"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse-${order.id}`}
        role="button"
      >
        <div className="row align-items-center">
          <div className="col-md-3 col-6">
            <strong>Mã đơn: </strong>
            {order.id}
          </div>
          <div className="col-md-3 col-6">
            <span className={`badge ${getStatusBadge(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="col-md-3 col-6">
            <strong>Tổng: </strong>
            {order.total.toLocaleString("vi-VN")} đ
          </div>
          <div className="col-md-3 col-6">
            <strong>Ngày: </strong>
            {order.date}
          </div>
        </div>
      </div>
      <div id={`collapse-${order.id}`} className="collapse">
        <div className="card-body">
          <OrderDetailComponent details={order.details} />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
