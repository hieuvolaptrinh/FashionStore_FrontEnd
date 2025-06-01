import React, { useState } from "react";
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { BankAccount } from "./revenueTypes";
import { Row, Col } from "react-bootstrap";

interface WithdrawFormProps {
  availableBalance: number;
  bankAccounts: BankAccount[];
  onWithdraw: (amount: number, bankAccountId: string) => void;
  onAddBankAccount: (bankAccount: Omit<BankAccount, "id">) => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({
  availableBalance,
  bankAccounts,
  onWithdraw,
  onAddBankAccount,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });

  const handleWithdraw = () => {
    if (amount && selectedBank) {
      onWithdraw(Number(amount), selectedBank);
      setAmount("");
    }
  };

  const handleAddBankAccount = () => {
    onAddBankAccount({
      ...newBankAccount,
      isDefault: bankAccounts.length === 0,
    });
    setNewBankAccount({
      bankName: "",
      accountNumber: "",
      accountHolder: "",
    });
    setOpenDialog(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <Card
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          color: "#1976d2",
          fontWeight: "600",
          fontSize: "1.25rem",
        }}
      >
        Rút tiền
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          backgroundColor: "rgba(25, 118, 210, 0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(25, 118, 210, 0.1)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "#1976d2", fontWeight: "500" }}
        >
          Số dư khả dụng: {formatCurrency(availableBalance)}
        </Typography>
      </Box>

      <Row className="g-3">
        <Col md={6}>
          <TextField
            fullWidth
            label="Số tiền muốn rút"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={Number(amount) > availableBalance}
            helperText={
              Number(amount) > availableBalance
                ? "Số tiền vượt quá số dư khả dụng"
                : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
        </Col>
        <Col md={6}>
          <TextField
            fullWidth
            select
            label="Chọn tài khoản ngân hàng"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          >
            {bankAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.bankName} - {account.accountNumber} (
                {account.accountHolder})
              </MenuItem>
            ))}
          </TextField>
        </Col>
      </Row>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleWithdraw}
          disabled={
            !amount || !selectedBank || Number(amount) > availableBalance
          }
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
          }}
        >
          Gửi yêu cầu rút tiền
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              borderColor: "#1565c0",
              backgroundColor: "rgba(25, 118, 210, 0.05)",
            },
          }}
        >
          Thêm tài khoản ngân hàng
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Thêm tài khoản ngân hàng mới
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Row className="g-3">
            <Col xs={12}>
              <TextField
                fullWidth
                label="Tên ngân hàng"
                value={newBankAccount.bankName}
                onChange={(e) =>
                  setNewBankAccount({
                    ...newBankAccount,
                    bankName: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </Col>
            <Col xs={12}>
              <TextField
                fullWidth
                label="Số tài khoản"
                value={newBankAccount.accountNumber}
                onChange={(e) =>
                  setNewBankAccount({
                    ...newBankAccount,
                    accountNumber: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </Col>
            <Col xs={12}>
              <TextField
                fullWidth
                label="Tên chủ tài khoản"
                value={newBankAccount.accountHolder}
                onChange={(e) =>
                  setNewBankAccount({
                    ...newBankAccount,
                    accountHolder: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: "#666",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddBankAccount}
            variant="contained"
            color="primary"
            disabled={
              !newBankAccount.bankName ||
              !newBankAccount.accountNumber ||
              !newBankAccount.accountHolder
            }
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default WithdrawForm;
