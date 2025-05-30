import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import OrderStatusBadge from "../../components/Shipper/OrderStatusBadge";
import { mockOrders } from "../../components/Shipper/OrderFake";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const orderData = mockOrders.find((o) => o.orderId === Number(orderId));

  const [currentStatus, setCurrentStatus] = useState<string>(
    orderData?.status || ""
  );

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const handleUpdateStatus = (newStatus: string) => {
    if (!orderData) return;
    setCurrentStatus(newStatus);
    setNotification({
      open: true,
      message: `Cập nhật trạng thái đơn hàng #${orderData.orderId} thành công!`,
      type: "success",
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleBackToList = () => {
    navigate("/shipper");
  };

  if (!orderData) {
    return (
      <Container className="py-4">
        <Typography variant="h5" color="error">
          Không tìm thấy đơn hàng
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBackToList}>
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  const order = { ...orderData, status: currentStatus || orderData.status };

  return (
    <Container className="py-4">
      <Button startIcon={<ArrowBackIcon />} onClick={handleBackToList}>
        Quay lại danh sách
      </Button>

      <Col>
        <Typography variant="h4" component="h1" color="primary">
          Chi tiết đơn hàng #{order.orderId}
        </Typography>
      </Col>

      <Row>
        <Col xs={12} lg={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin người nhận
              </Typography>
              <Row>
                <Col xs={12} md={6} className="mb-2">
                  <Typography variant="body1">
                    <strong>Họ tên:</strong> {order.recipientName}
                  </Typography>
                </Col>
                <Col xs={12} md={6} className="mb-2">
                  <Typography variant="body1">
                    <strong>Số điện thoại:</strong> {order.recipientPhone}
                  </Typography>
                </Col>
                <Col xs={12}>
                  <Typography variant="body1">
                    <strong>Địa chỉ:</strong> {order.recipientAddress}
                  </Typography>
                </Col>
              </Row>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Danh sách sản phẩm
              </Typography>
              <List>
                {order.orderDetails.map((detail) => (
                  <React.Fragment key={detail.orderDetailId}>
                    <ListItem>
                      <Row className="w-100">
                        <Col xs={12} md={2} className="mb-2">
                          <img
                            src={detail.mainImage}
                            alt={detail.productName}
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #eee",
                              maxHeight: "120px",
                            }}
                          />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle1"
                                fontWeight="medium"
                              >
                                {detail.productName}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {detail.description}
                              </Typography>
                            }
                          />
                        </Col>
                        <Col xs={12} md={4}>
                          <Stack
                            direction="column"
                            spacing={1}
                            alignItems="flex-end"
                          >
                            <Typography variant="body2" color="text.secondary">
                              {formatPrice(detail.price)} x {detail.quantity}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {formatPrice(detail.price * detail.quantity)}
                            </Typography>
                          </Stack>
                        </Col>
                      </Row>
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                  </React.Fragment>
                ))}
                <ListItem>
                  <Row className="w-100">
                    <Col xs={12} md={8}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Tạm tính (
                          {order.orderDetails.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}{" "}
                          sản phẩm)
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Phí vận chuyển
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                          Tổng tiền
                        </Typography>
                      </Stack>
                    </Col>
                    <Col xs={12} md={4}>
                      <Stack spacing={1} alignItems="flex-end">
                        <Typography variant="subtitle2" color="text.secondary">
                          {formatPrice(
                            order.orderDetails.reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )
                          )}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {formatPrice(30000)}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ textAlign: "right", fontWeight: "bold", mt: 1 }}
                          color="error"
                        >
                          {formatPrice(order.totalPrice)}
                        </Typography>
                      </Stack>
                    </Col>
                  </Row>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin đơn hàng
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Mã đơn hàng:</strong> #{order.orderId}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Ngày tạo:</strong> {formatDate(order.createAt)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Trạng thái:</strong>{" "}
                  <OrderStatusBadge status={order.status} />
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Thanh toán:</strong>{" "}
                  {order.pay ? "Đã thanh toán" : "Chưa thanh toán"}
                </Typography>
                <Typography variant="body1">
                  <strong>Tổng số sản phẩm:</strong>{" "}
                  {order.orderDetails.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  sản phẩm
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="h6" gutterBottom>
                  Cập nhật trạng thái
                </Typography>

                {order.status === "shipping" && (
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => handleUpdateStatus("delivered")}
                  >
                    Xác nhận đã giao hàng
                  </Button>
                )}

                {order.status === "return_requested" && (
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => handleUpdateStatus("returned")}
                  >
                    Xác nhận đổi/trả thành công
                  </Button>
                )}

                {order.status !== "shipping" &&
                  order.status !== "return_requested" && (
                    <Chip
                      label="Không có hành động cần thực hiện"
                      color="default"
                      sx={{ width: "100%" }}
                    />
                  )}
              </Box>
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

export default OrderDetail;
