/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Snackbar } from "@mui/material";
import { format } from "date-fns";
import { getAllOrdersAdmin } from "../../../service/API/OrderAPI";
import GenericTable from "../../GenericTable";
import OrderStatusSelect from "./OrderStatusSelect";
import { ResponseOrder } from "../../../models/OrderModel";
import { Container, Row, Col } from "react-bootstrap";
import RevenueChart from "../Charts/RevenueChart";

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<ResponseOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrdersAdmin();
        setOrders(data);
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng: " + err);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSnackbar({
      open: true,
      message: `Cập nhật đơn hàng ${orderId} thành ${newStatus}`,
    });
  };

  const columns = [
    { header: "ID", accessor: "orderId" },
    { header: "Trạng Thái", accessor: "status" },
    {
      header: "Giá",
      accessor: (order: ResponseOrder) =>
        `${order.totalPrice.toLocaleString("vi-VN")} VND`,
    },
    {
      header: "Ngày Đặt",
      accessor: (order: ResponseOrder) =>
        format(new Date(order.createAt), "dd/MM/yyyy"),
    },
    {
      header: "Thanh Toán",
      accessor: (order: ResponseOrder) =>
        order.pay ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN",
    },
    {
      header: "Cập Nhật",
      accessor: (order: ResponseOrder) => (
        <OrderStatusSelect
          orderId={order.orderId}
          currentStatus={order.status}
          onStatusChange={handleStatusChange}
        />
      ),
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={12} xl={12}>
          <div className="bg-secondary rounded h-100 p-4">
            <Typography variant="h4">Doanh Thu</Typography>
            <RevenueChart />
          </div>
        </Col>
        <Col sm={12} xl={12}>
          <Box
            sx={{
              padding: 2,
              maxWidth: "1200px",
              margin: "0 auto",
              bgcolor: "#f5f5f5",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
              Quản Lý Đơn Hàng
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <GenericTable data={orders} columns={columns} rowKey="orderId" />
            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
              <Alert severity="success">{snackbar.message}</Alert>
            </Snackbar>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersTable;
