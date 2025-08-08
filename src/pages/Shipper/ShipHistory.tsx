import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Row, Col } from "react-bootstrap";
import GenericTable from "../../components/GenericTable";
import { Order } from "../../models/OrderModel";
import OrderStatusBadge from "../../components/Shipper/OrderStatusBadge";
import { mockOrders } from "../../components/Shipper/OrderFake";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import { Button, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ShipHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const navigate = useNavigate();
  const location = useLocation();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTimeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeFilter(event.target.value);
  };

  const handleNavChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const filterOrders = () => {
    let filtered = mockOrders.filter((order) => order.status === "delivered");

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toString().includes(searchTerm) ||
          order.recipientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.recipientPhone.includes(searchTerm)
      );
    }

    const now = Date.now();
    // Variables declared outside switch cases to avoid lexical declaration errors
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

    switch (timeFilter) {
      case "today":
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.createAt);
          const today = new Date();
          return orderDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
        });
        break;
      case "week":
        filtered = filtered.filter((order) => order.createAt >= oneWeekAgo);
        break;
      case "month":
        filtered = filtered.filter((order) => order.createAt >= oneMonthAgo);
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleViewDetails = (orderId: number) => {
    navigate(`/shipper/orders/${orderId}`);
  };

  const columns = [
    { header: "Mã đơn hàng", accessor: "orderId" },
    { header: "Tên người nhận", accessor: "recipientName" },
    { header: "Số điện thoại", accessor: "recipientPhone" },
    { header: "Địa chỉ", accessor: "recipientAddress" },
    {
      header: "Số sản phẩm",
      accessor: (order: Order) =>
        order.orderDetails.reduce((total, item) => total + item.quantity, 0),
    },
    {
      header: "Ngày giao",
      accessor: (order: Order) => formatDate(order.createAt),
    },
    {
      header: "Trạng thái",
      accessor: (order: Order) => <OrderStatusBadge status={order.status} />,
    },
  ];

  const renderActions = (order: Order) => (
    <Tooltip title="Xem chi tiết">
      <Button
        variant="outlined"
        color="info"
        size="small"
        onClick={() => handleViewDetails(order.orderId)}
        startIcon={<VisibilityIcon />}
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Chi tiết
      </Button>
    </Tooltip>
  );

  const filteredOrders = filterOrders();

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Typography variant="h4" component="h1" color="primary">
            Lịch sử giao hàng
          </Typography>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Tabs
              value={
                location.pathname === "/shipper/history"
                  ? "/shipper/history"
                  : "/shipper"
              }
              onChange={handleNavChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="shipper navigation tabs"
            >
              <Tab
                icon={<LocalShippingIcon />}
                iconPosition="start"
                label="Đơn hàng đang xử lý"
                value="/shipper"
                sx={{ textTransform: "none", fontWeight: "medium" }}
              />
              <Tab
                icon={<HistoryIcon />}
                iconPosition="start"
                label="Lịch sử giao hàng"
                value="/shipper/history"
                sx={{ textTransform: "none", fontWeight: "medium" }}
              />
            </Tabs>
          </Box>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm theo mã đơn, tên khách hàng, hoặc số điện thoại"
            value={searchTerm}
            onChange={handleSearch}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Col>
        <Col md={6}>
          <TextField
            select
            fullWidth
            label="Thời gian"
            value={timeFilter}
            onChange={handleTimeFilterChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon color="action" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">Tất cả thời gian</MenuItem>
            <MenuItem value="today">Hôm nay</MenuItem>
            <MenuItem value="week">7 ngày qua</MenuItem>
            <MenuItem value="month">30 ngày qua</MenuItem>
          </TextField>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Tổng số đơn hàng đã giao: {filteredOrders.length}
                </Typography>
              </Box>
              <GenericTable<Order>
                data={filteredOrders}
                columns={columns}
                rowKey="orderId"
                actions={renderActions}
              />
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShipHistory;
