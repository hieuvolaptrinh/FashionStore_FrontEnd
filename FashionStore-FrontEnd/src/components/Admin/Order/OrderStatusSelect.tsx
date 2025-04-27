import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import { updateOrderStatus } from "../../../service/API/OrderAPI";

interface OrderStatusSelectProps {
  orderId: number;
  currentStatus: string;
  onStatusChange: (orderId: number, newStatus: string) => void;
}

const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({
  orderId,
  currentStatus,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<string>(currentStatus);
  const [error, setError] = useState<string | null>(null);

  const statuses = [
    "Chưa xử lý",
    "Đang giao",
    "Đã giao",
    "Đã hủy",
    "Đang vận chuyển",
  ];

  // Xử lý thay đổi trạng thái
  const handleChange = async (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as string;
    try {
      await updateOrderStatus(orderId, newStatus); // Gọi API
      setStatus(newStatus); // Cập nhật state local
      onStatusChange(orderId, newStatus); // Thông báo cho parent component
      setError(null); // Xóa lỗi nếu có
    } catch (err) {
      setError("Không thể cập nhật trạng thái. Vui lòng thử lại." + err);
    }
  };

  return (
    <FormControl sx={{ minWidth: 150, maxWidth: 200 }} size="small">
      <InputLabel id={`status-select-label-${orderId}`}>Status</InputLabel>
      <Select
        labelId={`status-select-label-${orderId}`}
        value={status}
        label="Status"
        onChange={handleChange}
        sx={{
          bgcolor: "#fff",
          borderRadius: 1,
          "&:hover": { bgcolor: "#f0f7ff" },
        }}
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Alert severity="error" sx={{ mt: 1, fontSize: "0.8rem" }}>
          {error}
        </Alert>
      )}
    </FormControl>
  );
};

export default OrderStatusSelect;
