import React from "react";
import { Chip } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case "shipping":
        return {
          label: "Đang giao",
          color: "primary", // xanh dương
          icon: <LocalShippingIcon fontSize="small" />,
          variant: "filled" as const,
        };
      case "delivered":
        return {
          label: "Đã giao",
          color: "success", // xanh lá
          icon: <CheckCircleIcon fontSize="small" />,
          variant: "filled" as const,
        };
      case "return_requested":
        return {
          label: "Yêu cầu đổi/trả",
          color: "warning", // đỏ cam
          icon: <SwapHorizIcon fontSize="small" />,
          variant: "filled" as const,
        };
      default:
        return {
          label: status,
          color: "default",
          icon: undefined,
          variant: "outlined" as const,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Chip
      label={statusInfo.label}
      color={statusInfo.color as "primary" | "success" | "warning" | "default"}
      size="small"
      icon={statusInfo.icon}
      variant={statusInfo.variant}
      sx={{
        fontWeight: "medium",
        fontSize: "0.85rem",
        borderRadius: "16px",
        px: 0.5,
      }}
    />
  );
};

export default OrderStatusBadge;
