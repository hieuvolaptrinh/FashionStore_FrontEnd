import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import GenericTable from "../../components/GenericTable";
import { Order } from "../../models/OrderModel";
import OrderStatusBadge from "../../components/Shipper/OrderStatusBadge";
import OrderActionButtons from "../../components/Shipper/OrderActionButtons";
import { mockOrders } from "../../components/Shipper/OrderFake";

const ListOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

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
    {
      header: "Số sản phẩm",
      accessor: (order: Order) =>
        order.orderDetails.reduce((total, item) => total + item.quantity, 0),
    },
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
          <Typography variant="h4" component="h1" color="primary" >
            Quản lý đơn hàng
          </Typography>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <GenericTable<Order>
                data={orders}
                columns={columns}
                rowKey="orderId"
                actions={renderActions}
              />
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
