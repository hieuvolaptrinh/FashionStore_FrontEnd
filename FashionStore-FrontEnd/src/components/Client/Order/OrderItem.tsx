import React, { useState } from "react";
import { ResponseOrder } from "../../../models/OrderModel";
import { format } from "date-fns";
import { Badge, Card } from "@mui/material";
import { styled } from "@mui/system";
import OrderDetail from "./OrderDetail";

const StyledCard = styled(Card)({
  marginBottom: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  },
  "& .card-header": {
    background: "linear-gradient(to right, #ffffff, #f8f9fa)",
    padding: "20px",
    cursor: "pointer",
    borderBottom: "1px solid #e0e0e0",
    transition: "background 0.3s ease",
  },
  "& .card-header:hover": {
    background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
  },
  "& .status-badge": {
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "bold",
  },
  "@media (max-width: 600px)": {
    fontSize: "0.9rem",
    "& .card-header": {
      padding: "15px",
    },
  },
});

const OrderItem: React.FC<{ order: ResponseOrder }> = ({ order }) => {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã giao":
        return { backgroundColor: "#4caf50", color: "white" };
      case "Đang giao":
        return { backgroundColor: "#2196f3", color: "white" };
      case "Chưa xử lý":
        return { backgroundColor: "#ff9800", color: "white" };
      case "Đã hủy":
        return { backgroundColor: "#f44336", color: "white" };
      default:
        return { backgroundColor: "#757575", color: "white" };
    }
  };

  return (
    <StyledCard>
      <div
        className="card-header"
        onClick={() => setOpen(!open)}
        data-bs-toggle="collapse"
        data-bs-target={`#collapse-${order.orderId}`}
        role="button"
      >
        <div className="row align-items-center">
          <div className="col-md-3 col-6">
            <strong style={{ color: "#333" }}>Mã đơn: </strong>
            <span style={{ color: "#1976d2", fontWeight: "bold" }}>
              {order.orderId}
            </span>
          </div>
          <div className="col-md-3 col-6">
            <strong style={{ color: "#333" }}>Trạng thái: </strong>
            <Badge className="status-badge" sx={getStatusColor(order.status)}>
              {order.status}
            </Badge>
          </div>
          <div className="col-md-3 col-6">
            <strong style={{ color: "#333" }}>Tổng: </strong>
            <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
              {order.totalPrice.toLocaleString("vi-VN")} VNĐ
            </span>
          </div>
          <div className="col-md-3 col-6">
            <strong style={{ color: "#333" }}>Ngày: </strong>
            <span>{format(new Date(order.createAt), "dd/MM/yyyy")}</span>
          </div>
        </div>
      </div>
      <div
        id={`collapse-${order.orderId}`}
        className={`collapse ${open ? "show" : ""}`}
      >
        <div
          className="card-body"
          style={{ padding: "20px", backgroundColor: "#fafafa" }}
        >
          <OrderDetail orderDetails={order.orderDetails} status={order.status} />
        </div>
      </div>
    </StyledCard>
  );
};

export default OrderItem;
