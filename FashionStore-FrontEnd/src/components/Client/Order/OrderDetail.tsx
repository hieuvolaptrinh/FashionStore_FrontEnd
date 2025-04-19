import React from "react";
import type { OrderDetail } from "../../../models/OrderModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)({
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  "@media (max-width: 600px)": {
    padding: "10px",
  },
});

const StyledImage = styled("img")({
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 0 15px rgba(25, 118, 210, 0.5)",
    filter: "brightness(1.2)",
  },
  "@media (max-width: 600px)": {
    width: "40px",
    height: "40px",
  },
});

const StyledTable = styled(Table)({
  "& th": {
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    padding: "12px",
  },
  "& td": {
    padding: "12px",
    verticalAlign: "middle",
  },
  "& tr:hover": {
    backgroundColor: "#f5f5f5",
  },
});

const OrderDetail: React.FC<{ orderDetails: OrderDetail[] }> = ({
  orderDetails,
}) => (
  <StyledPaper>
    <h6 style={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
      Chi tiết đơn hàng
    </h6>
    <div className="table-responsive">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Mã CTDH</TableCell>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Sản phẩm</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetails.map((detail) => (
            <TableRow key={detail.orderDetailId}>
              <TableCell>{detail.orderDetailId}</TableCell>
              <TableCell>
                <StyledImage src={detail.mainImage} alt={detail.productName} />
              </TableCell>
              <div>
                <h6 style={{ margin: 0, color: "#333" }}>
                  {detail.productName}
                </h6>
                <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                  {detail.description}
                </p>
              </div>
              <TableCell>{detail.price.toLocaleString("vi-VN")} đ</TableCell>
              <TableCell>{detail.quantity}</TableCell>
              <TableCell>
                {(detail.price * detail.quantity).toLocaleString("vi-VN")} đ
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  </StyledPaper>
);

export default OrderDetail;
