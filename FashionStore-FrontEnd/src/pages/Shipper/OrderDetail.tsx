import React, { useState, useEffect } from "react";
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
import { Order } from "../../models/OrderModel";
import OrderStatusBadge from "../../components/Shipper/OrderStatusBadge";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
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
    // Simulate API call
    setTimeout(() => {
      // Sample data - in a real app, this would be fetched from an API
      const orderIdNumber = parseInt(orderId || "0", 10);
      const mockOrders: Order[] = [
        {
          orderId: 1001,
          status: "shipping",
          totalPrice: 350000,
          createAt: Date.now() - 24 * 60 * 60 * 1000, // yesterday
          pay: true,
          recipientName: "Nguyễn Văn A",
          recipientPhone: "0123456789",
          recipientAddress: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          orderDetails: [
            {
              orderDetailId: 1,
              quantity: 2,
              price: 65000,
              mainImage: "/images/p11.jpg",
              productName: "Vòng tay đá tự nhiên",
              description:
                "Vòng tay thủ công sử dụng đá tự nhiên, mang lại vẻ đẹp tinh tế và ý nghĩa phong thủy.",
            },
            {
              orderDetailId: 2,
              quantity: 1,
              price: 220000,
              mainImage: "/images/p81.jpg",
              productName: "Gối tựa thêu tay",
              description:
                "Gối lưng handmade có họa tiết thêu tay tinh tế, dùng trang trí hoặc nghỉ ngơi.",
            },
          ],
        },
        {
          orderId: 1002,
          status: "delivered",
          totalPrice: 325000,
          createAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
          pay: true,
          recipientName: "Trần Thị B",
          recipientPhone: "0987654321",
          recipientAddress: "456 Nguyễn Huệ, Quận 1, TP.HCM",
          orderDetails: [
            {
              orderDetailId: 3,
              quantity: 1,
              price: 100000,
              mainImage: "/images/p21.jpg",
              productName: "Túi vải bố họa tiết tay",
              description:
                "Túi handmade từ vải bố thân thiện với môi trường, in họa tiết vẽ tay độc đáo.",
            },
            {
              orderDetailId: 4,
              quantity: 3,
              price: 75000,
              mainImage: "/images/p51.jpg",
              productName: "Nến thơm thiên nhiên",
              description:
                "Nến handmade từ sáp đậu nành, hương liệu thiên nhiên giúp thư giãn.",
            },
          ],
        },
        {
          orderId: 1003,
          status: "return_requested",
          totalPrice: 310000,
          createAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
          pay: true,
          recipientName: "Lê Văn C",
          recipientPhone: "0909123456",
          recipientAddress: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
          orderDetails: [
            {
              orderDetailId: 5,
              quantity: 1,
              price: 130000,
              mainImage: "/images/p31.jpg",
              productName: "Sổ tay da vintage",
              description:
                "Sổ tay thủ công bọc da, giấy kraft phong cách cổ điển phù hợp học sinh, sinh viên.",
            },
            {
              orderDetailId: 6,
              quantity: 2,
              price: 90000,
              mainImage: "/images/p91.jpg",
              productName: "Bình gốm mini decor",
              description:
                "Bình gốm thủ công nhỏ gọn, trang trí bàn làm việc hoặc kệ sách.",
            },
          ],
        },
      ];

      const foundOrder =
        mockOrders.find((o) => o.orderId === orderIdNumber) || null;

      setOrder(foundOrder);
      setLoading(false);
    }, 1000);
  }, [orderId]);

  const handleUpdateStatus = (newStatus: string) => {
    if (!order) return;

    // In a real app, make an API call to update the status
    setOrder({ ...order, status: newStatus });

    setNotification({
      open: true,
      message: `Cập nhật trạng thái đơn hàng #${order.orderId} thành công!`,
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

  if (loading) {
    return (
      <Container className="py-4">
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <Typography>Đang tải dữ liệu...</Typography>
        </Box>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-4">
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h5" color="error">
              Không tìm thấy đơn hàng
            </Typography>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToList}
              sx={{ mt: 2 }}
            >
              Quay lại danh sách
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBackToList}>
            Quay lại danh sách
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Typography variant="h4" component="h1" gutterBottom>
            Chi tiết đơn hàng #{order.orderId}
          </Typography>
        </Col>
      </Row>

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
