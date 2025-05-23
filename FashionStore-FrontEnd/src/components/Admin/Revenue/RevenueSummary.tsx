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
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
    },
    {
      title: "Tổng số đơn hàng",
      value: data.totalOrders.toString(),
      color: "#4caf50",
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
    },
    {
      title: "Tổng sản phẩm bán ra",
      value: data.totalProducts.toString(),
      color: "#ff9800",
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
    },
    {
      title: "Doanh thu hôm nay",
      value: formatCurrency(data.todayRevenue),
      color: "#f44336",
      icon: <TodayIcon sx={{ fontSize: 40, color: "#f44336" }} />,
    },
    {
      title: "Doanh thu tuần",
      value: formatCurrency(data.weekRevenue),
      color: "#9c27b0",
      icon: <DateRangeIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
    },
    {
      title: "Doanh thu tháng",
      value: formatCurrency(data.monthRevenue),
      color: "#795548",
      icon: <CalendarMonthIcon sx={{ fontSize: 40, color: "#795548" }} />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <div className="row g-3">
        {summaryItems.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
            <Card
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              {item.icon}
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#666", mb: 1, mt: 2 }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ color: item.color, fontWeight: "bold" }}
              >
                {item.value}
              </Typography>
            </Card>
          </div>
        ))}
        <div className="col-12">
          <Card
            sx={{
              p: 3,
              backgroundColor: "#1976d2",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <AccountBalanceWalletIcon
              sx={{ fontSize: 40, color: "#fff", mb: 1 }}
            />
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              Số dư có thể rút
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {formatCurrency(data.availableBalance)}
            </Typography>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export default RevenueSummary;
