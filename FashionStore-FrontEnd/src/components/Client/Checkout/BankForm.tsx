import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface BankFormProps {
  onAddBank?: (bank: BankAccount) => void;
}

const BankForm: React.FC<BankFormProps> = ({ onAddBank }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<BankAccount>({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.bankName ||
      !formData.accountNumber ||
      !formData.accountName
    ) {
      alert("Vui lòng điền đầy đủ thông tin tài khoản ngân hàng");
      return;
    }

    if (onAddBank) {
      onAddBank(formData);
    }

    setFormData({
      bankName: "",
      accountNumber: "",
      accountName: "",
    });
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          borderRadius: "50px",
          mb: 2,
        }}
      >
        {isOpen ? "Ẩn biểu mẫu" : "Thêm tài khoản ngân hàng mới"}
      </Button>

      {isOpen && (
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              Thêm tài khoản ngân hàng mới
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tên ngân hàng"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                placeholder="VD: Vietcombank, TPBank, ..."
                required
              />

              <TextField
                fullWidth
                label="Số tài khoản"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                placeholder="Nhập số tài khoản"
                required
              />

              <TextField
                fullWidth
                label="Tên chủ tài khoản"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                placeholder="VD: NGUYEN VAN A"
                required
              />

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => setIsOpen(false)}
                  sx={{ mr: 1 }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffc107",
                    color: "#212121",
                    "&:hover": { backgroundColor: "#ffb300" },
                  }}
                >
                  Lưu tài khoản
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BankForm;
