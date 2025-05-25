import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import GenericTable from "../../components/GenericTable";
import { Order } from "../../models/OrderModel";
import OrderStatusBadge from "../../components/Shipper/OrderStatusBadge";
import OrderActionButtons from "../../components/Shipper/OrderActionButtons";

const ListOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          orderId: 1001,
          status: "shipping",
          totalPrice: 850000,
          createAt: Date.now() - 24 * 60 * 60 * 1000, // yesterday
          pay: true,
          recipientName: "Nguyễn Văn A",
          recipientPhone: "0123456789",
          recipientAddress: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          orderDetails: [
            {
              orderDetailId: 1,
              quantity: 2,
              price: 450000,
              mainImage: "./images/p91.jpg",
              productName: "Áo thun nam",
              description: "Size L, Màu đen",
            },
          ],
        },
        {
          orderId: 1002,
          status: "delivered",
          totalPrice: 1200000,
          createAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
          pay: true,
          recipientName: "Trần Thị B",
          recipientPhone: "0987654321",
          recipientAddress: "456 Nguyễn Huệ, Quận 1, TP.HCM",
          orderDetails: [
            {
              orderDetailId: 2,
              quantity: 1,
              price: 1200000,
              mainImage: "./images/p92.jpg",
              productName: "Giày thể thao",
              description: "Size 42, Màu trắng",
            },
          ],
        },
        {
          orderId: 1003,
          status: "return_requested",
          totalPrice: 650000,
          createAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
          pay: true,
          recipientName: "Lê Văn C",
          recipientPhone: "0909123456",
          recipientAddress: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
          orderDetails: [
            {
              orderDetailId: 3,
              quantity: 1,
              price: 650000,
              mainImage: "./images/p93.jpg",
              productName: "Quần jean nam",
              description: "Size 32, Màu xanh đậm",
            },
          ],
        },
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );

    setNotification({
      open: true,
      message: `Cập nhật trạng thái đơn hàng #${orderId} thành công!`,
      type: "success",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    { header: "Mã đơn hàng", accessor: "orderId" },
    { header: "Tên người nhận", accessor: "recipientName" },
    { header: "Số điện thoại", accessor: "recipientPhone" },
    { header: "Địa chỉ", accessor: "recipientAddress" },
    {
      header: "Ngày tạo",
      accessor: (order: Order) => formatDate(order.createAt),
    },
    {
      header: "Trạng thái",
      accessor: (order: Order) => <OrderStatusBadge status={order.status} />,
    },
  ];

  const renderActions = (order: Order) => (
    <OrderActionButtons
      orderId={order.orderId}
      status={order.status}
      onUpdateStatus={handleUpdateStatus}
    />
  );

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Typography variant="h4" component="h1" gutterBottom>
            Quản lý đơn hàng
          </Typography>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <Typography>Đang tải dữ liệu...</Typography>
                </Box>
              ) : (
                <GenericTable<Order>
                  data={orders}
                  columns={columns}
                  rowKey="orderId"
                  actions={renderActions}
                />
              )}
            </CardContent>
          </Card>
        </Col>
      </Row>

      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListOrder;
