import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  Snackbar,
  Paper,
  Skeleton,
} from "@mui/material";
import { format } from "date-fns";
import { getAllOrdersAdmin } from "../../../service/API/OrderAPI";
import OrderStatusSelect from "./OrderStatusSelect";
import { ResponseOrder } from "../../../models/OrderModel";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<ResponseOrder[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrdersAdmin();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
        setLoading(false);
        setError(true);
      }
    };
    fetchOrders();
  }, []);

  // Xử lý cập nhật trạng thái
  const handleStatusChange = (orderId: number, newStatus: string) => {
    // callback function to get the latest state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSnackbar({
      open: true,
      message: `Đã update ${orderId} to ${newStatus}`,
    });
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 3 },
        maxWidth: "1200px",
        margin: "0 auto",
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: "bold",

          textAlign: { xs: "center", md: "left" },
        }}
      >
        Quản Lý Đơn Hàng
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow sx={{ bgcolor: "rgb(46, 123, 231)" }}>
              <TableCell
                sx={{ fontWeight: "bold", color: "rgb(240, 243, 242)" }}
              >
                Order ID
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "rgb(240, 243, 242)" }}
              >
                Trạng Thái
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "rgb(240, 243, 242)" }}
              >
                Giá Trị Đơn Hàng
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "rgb(240, 243, 242)" }}
              >
                Ngày Đặt Hàng
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "rgb(240, 243, 242)" }}
              >
                Trạng Thái
              </TableCell>
            </TableRow>
          </TableHead>
          {/* body */}
          <TableBody>
            {loading
              ? // Hiển thị Skeleton khi loading
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={120} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={150} height={40} />
                    </TableCell>
                  </TableRow>
                ))
              : // Hiển thị dữ liệu đơn hàng
                orders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    sx={{
                      "&:hover": { bgcolor: "#f0f7ff" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {order.totalPrice.toLocaleString("vi-VN")} VND
                    </TableCell>
                    <TableCell>
                      {format(new Date(order.createAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      <OrderStatusSelect
                        orderId={order.orderId}
                        currentStatus={order.status}
                        onStatusChange={handleStatusChange}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
