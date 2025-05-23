import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { RevenueSummary as RevenueSummaryType } from "./revenueTypes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Col, Row } from "react-bootstrap";

interface RevenueSummaryProps {
  data: RevenueSummaryType;
}

const RevenueSummary: React.FC<RevenueSummaryProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const summaryItems = [
    {
      title: "Tổng doanh thu",
      value: formatCurrency(data.totalRevenue),
      color: "#2196f3",
      bgColor: "rgba(33, 150, 243, 0.1)",
      icon: <AttachMoneyIcon sx={{ fontSize: 24, color: "#2196f3" }} />,
    },
    {
      title: "Tổng số đơn hàng",
      value: data.totalOrders.toString(),
      color: "#4caf50",
      bgColor: "rgba(76, 175, 80, 0.1)",
      icon: <ShoppingCartIcon sx={{ fontSize: 24, color: "#4caf50" }} />,
    },
    {
      title: "Tổng sản phẩm bán ra",
      value: data.totalProducts.toString(),
      color: "#ff9800",
      bgColor: "rgba(255, 152, 0, 0.1)",
      icon: <InventoryIcon sx={{ fontSize: 24, color: "#ff9800" }} />,
    },
    {
      title: "Doanh thu hôm nay",
      value: formatCurrency(data.todayRevenue),
      color: "#f44336",
      bgColor: "rgba(244, 67, 54, 0.1)",
      icon: <TodayIcon sx={{ fontSize: 24, color: "#f44336" }} />,
    },
    {
      title: "Doanh thu tuần",
      value: formatCurrency(data.weekRevenue),
      color: "#9c27b0",
      bgColor: "rgba(156, 39, 176, 0.1)",
      icon: <DateRangeIcon sx={{ fontSize: 24, color: "#9c27b0" }} />,
    },
    {
      title: "Doanh thu tháng",
      value: formatCurrency(data.monthRevenue),
      color: "#795548",
      bgColor: "rgba(121, 85, 72, 0.1)",
      icon: <CalendarMonthIcon sx={{ fontSize: 24, color: "#795548" }} />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Row className="g-2">
        <Col xl={9} lg={9} md={6} sm={12}>
          <Row>
            {summaryItems.map((item, index) => (
              <Col className="col-12 col-sm-6 col-md-4 mb-2" key={index}>
                <Card
                  sx={{
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: item.bgColor,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    transition: "all 0.2s",
                    border: `1px solid ${item.color}20`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 2px 5px ${item.color}30`,
                      backgroundColor: `${item.bgColor}dd`,
                    },
                  }}
                >
                  <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ color: "#666", fontSize: "0.875rem" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: item.color,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          xl={3}
          lg={3}
          md={6}
          sm={12}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="w-100">
            <Card
              sx={{
                p: 2,
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                color: "#1976d2",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid #1976d220",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 2px 5px rgba(25, 118, 210, 0.3)",
                  backgroundColor: "rgba(25, 118, 210, 0.15)",
                },
              }}
            >
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 24, color: "#1976d2" }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ fontSize: "0.875rem", color: "#666" }}
                >
                  Số dư có thể rút
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#1976d2",
                  }}
                >
                  {formatCurrency(data.availableBalance)}
                </Typography>
              </Box>
            </Card>
          </div>
        </Col>
      </Row>
    </Box>
  );
};

export default RevenueSummary;
