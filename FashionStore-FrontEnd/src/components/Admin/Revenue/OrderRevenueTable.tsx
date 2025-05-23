import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import GenericTable from "../../GenericTable";
import { OrderRevenue } from "./revenueTypes";

interface OrderRevenueTableProps {
  data: OrderRevenue[];
}

const OrderRevenueTable: React.FC<OrderRevenueTableProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const columns = [
    { header: "Mã đơn", accessor: "id" },
    { header: "Khách hàng", accessor: "customerName" },
    { header: "Ngày đặt", accessor: "orderDate" },
    {
      header: "Số tiền",
      accessor: (item: OrderRevenue) => (
        <Typography>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.amount)}
        </Typography>
      ),
    },
    {
      header: "Trạng thái",
      accessor: (item: OrderRevenue) => (
        <Typography
          sx={{
            color:
              item.status === "Đã thanh toán"
                ? "success.main"
                : item.status === "Đang xử lý"
                ? "warning.main"
                : "error.main",
          }}
        >
          {item.status}
        </Typography>
      ),
    },
    { header: "Phương thức thanh toán", accessor: "paymentMethod" },
  ];

  const filteredData = data.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = status === "all" || order.status === status;

    const orderDate = new Date(order.orderDate);
    const matchesDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Lịch sử đơn hàng
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
            <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
            <MenuItem value="Đã hủy">Đã hủy</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Từ ngày"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Đến ngày"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Box sx={{ overflowX: "auto" }}>
        <GenericTable data={filteredData} columns={columns} rowKey="id" />
      </Box>
    </Card>
  );
};

export default OrderRevenueTable;
