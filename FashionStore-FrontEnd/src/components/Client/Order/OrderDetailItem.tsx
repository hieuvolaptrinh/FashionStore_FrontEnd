import React from "react";
import { useNavigate } from "react-router-dom";
import type { OrderDetail } from "../../../models/OrderModel";
import { TableContainer, Paper, Button, Typography } from "@mui/material";
import GenericTable from "../../GenericTable";

const OrderDetailItem: React.FC<{
  orderDetails: OrderDetail[];
  status: string;
}> = ({ orderDetails, status }) => {
  const navigate = useNavigate();

  const handleReviewClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const columns = [
    { header: "Mã CTDH", accessor: "orderDetailId" },
    {
      header: "Hình ảnh",
      accessor: (detail: OrderDetail) => (
        <img
          src={detail.mainImage}
          alt={detail.productName}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
    },
    {
      header: "Sản phẩm",
      accessor: (detail: OrderDetail) => (
        <div>
          <Typography variant="subtitle2" sx={{ color: "#333" }}>
            {detail.productName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            {detail.description}
          </Typography>
        </div>
      ),
    },
    {
      header: "Giá",
      accessor: (detail: OrderDetail) =>
        `${detail.price.toLocaleString("vi-VN")} đ`,
    },
    { header: "Số lượng", accessor: "quantity" },
    {
      header: "Tổng tiền",
      accessor: (detail: OrderDetail) =>
        `${(detail.price * detail.quantity).toLocaleString("vi-VN")} đ`,
    },
    {
      header: "Đánh giá",
      accessor: (detail: OrderDetail) =>
        status === "Đã giao" ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleReviewClick(detail.orderDetailId)}
          >
            Đánh giá Ngay
          </Button>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "#ff9800", fontWeight: 500 }}
          >
            Đợi nhận hàng rồi đánh giá sản phẩm nhé!
          </Typography>
        ),
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ p: 2, borderRadius: 2 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
      >
        Chi tiết đơn hàng
      </Typography>
      <GenericTable
        data={orderDetails}
        columns={columns}
        rowKey="orderDetailId"
      />
    </TableContainer>
  );
};

export default OrderDetailItem;
