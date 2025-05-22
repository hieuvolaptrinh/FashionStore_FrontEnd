import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface ReasonSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ReasonSelect: React.FC<ReasonSelectProps> = ({ value, onChange }) => {
  const reasons = [
    "Sản phẩm bị lỗi",
    "Sai màu sắc",
    "Giao nhầm sản phẩm",
    "Không đúng kích thước",
    "Sản phẩm bị hỏng",
    "Khác",
  ];

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="return-reason-label">Lý do đổi/trả</InputLabel>
      <Select
        labelId="return-reason-label"
        value={value}
        label="Lý do đổi/trả"
        onChange={handleChange}
      >
        {reasons.map((reason) => (
          <MenuItem key={reason} value={reason}>
            {reason}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReasonSelect;
