import React from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface OrderActionButtonsProps {
  orderId: number;
  status: string;
  onUpdateStatus: (orderId: number, newStatus: string) => void;
}

const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({
  orderId,
  status,
  onUpdateStatus,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/shipper/orders/${orderId}`);
  };

  const handleStatusUpdate = (newStatus: string) => {
    onUpdateStatus(orderId, newStatus);
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Tooltip title="Xem chi tiết">
        <Button
          variant="outlined"
          color="info"
          size="small"
          onClick={handleViewDetails}
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

      {status === "shipping" && (
        <Tooltip title="Xác nhận đã giao hàng">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleStatusUpdate("delivered")}
            startIcon={<CheckCircleIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Đã giao
          </Button>
        </Tooltip>
      )}

      {status === "return_requested" && (
        <Tooltip title="Xác nhận đơn hàng đã được đổi/trả">
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleStatusUpdate("returned")}
            startIcon={<SwapHorizIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Đổi trả
          </Button>
        </Tooltip>
      )}
    </Stack>
  );
};

export default OrderActionButtons;
