import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Voucher } from "./voucherDataFake";

interface VoucherFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (voucher: Partial<Voucher>) => void;
  initialData?: Voucher;
}

const VoucherFormDialog: React.FC<VoucherFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<Voucher>>({
    code: "",
    expiryDate: "",
    discountAmount: 0,
    conditions: "",
    ...initialData,
  });

  const handleChange =
    (field: keyof Voucher) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      expiryDate: date ? date.toISOString().split("T")[0] : "",
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Sửa Voucher" : "Thêm Voucher Mới"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Mã voucher"
            value={formData.code}
            onChange={handleChange("code")}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Thời hạn"
              value={formData.expiryDate ? new Date(formData.expiryDate) : null}
              onChange={handleDateChange}
            />
          </LocalizationProvider>

          <TextField
            label="Số tiền giảm"
            type="number"
            value={formData.discountAmount}
            onChange={handleChange("discountAmount")}
            fullWidth
          />

          <TextField
            label="Điều kiện áp dụng"
            multiline
            rows={4}
            value={formData.conditions}
            onChange={handleChange("conditions")}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? "Cập nhật" : "Thêm mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoucherFormDialog;
