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
