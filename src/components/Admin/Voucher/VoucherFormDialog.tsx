import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormHelperText,
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

interface FormErrors {
  code?: string;
  startDate?: string;
  endDate?: string;
  discountAmount?: string;
  quantity?: string;
}

const VoucherFormDialog: React.FC<VoucherFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<Voucher>>({
    code: "",
    startDate: "",
    endDate: "",
    discountAmount: 0,
    conditions: "",
    quantity: 0,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  // Cập nhật formData khi initialData thay đổi
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
    } else {
      // Reset form khi thêm mới
      setFormData({
        code: "",
        startDate: "",
        endDate: "",
        discountAmount: 0,
        conditions: "",
        quantity: 0,
      });
    }
    // Reset errors
    setErrors({});
  }, [initialData, open]);

  const handleChange =
    (field: keyof Voucher) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData({
        ...formData,
        [field]: value,
      });

      // Clear error when field is edited
      if (field in errors && errors[field as keyof FormErrors]) {
        setErrors({
          ...errors,
          [field]: undefined,
        });
      }
    };

  const handleStartDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      startDate: date ? date.toISOString().split("T")[0] : "",
    });

    // Clear error
    if (errors.startDate) {
      setErrors({
        ...errors,
        startDate: undefined,
      });
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      endDate: date ? date.toISOString().split("T")[0] : "",
    });

    // Clear error
    if (errors.endDate) {
      setErrors({
        ...errors,
        endDate: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.code?.trim()) {
      newErrors.code = "Mã voucher không được để trống";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Ngày bắt đầu không được để trống";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Ngày kết thúc không được để trống";
    } else if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    if (formData.discountAmount === undefined || formData.discountAmount <= 0) {
      newErrors.discountAmount = "Số tiền giảm phải lớn hơn 0";
    }

    if (formData.quantity === undefined || formData.quantity < 0) {
      newErrors.quantity = "Số lượng voucher không được âm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        {initialData ? "Sửa Voucher" : "Thêm Voucher Mới"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Mã voucher"
            value={formData.code}
            onChange={handleChange("code")}
            fullWidth
            error={!!errors.code}
            helperText={errors.code}
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày bắt đầu"
              value={formData.startDate ? new Date(formData.startDate) : null}
              onChange={handleStartDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: !!errors.startDate,
                },
              }}
            />
            {errors.startDate && (
              <FormHelperText error>{errors.startDate}</FormHelperText>
            )}
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày kết thúc"
              value={formData.endDate ? new Date(formData.endDate) : null}
              onChange={handleEndDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: !!errors.endDate,
                },
              }}
            />
            {errors.endDate && (
              <FormHelperText error>{errors.endDate}</FormHelperText>
            )}
          </LocalizationProvider>

          <TextField
            label="Số tiền giảm"
            type="number"
            value={formData.discountAmount}
            onChange={handleChange("discountAmount")}
            fullWidth
            error={!!errors.discountAmount}
            helperText={errors.discountAmount}
            required
            InputProps={{
              endAdornment: <span>VNĐ</span>,
            }}
          />

          <TextField
            label="Số lượng voucher"
            type="number"
            value={formData.quantity}
            onChange={handleChange("quantity")}
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
            required
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
      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? "Cập nhật" : "Thêm mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoucherFormDialog;
