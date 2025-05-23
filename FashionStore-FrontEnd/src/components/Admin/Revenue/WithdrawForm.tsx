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
  Grid,
  MenuItem,
} from "@mui/material";
import { BankAccount } from "./revenueTypes";

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
    <Card sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Rút tiền
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Số dư khả dụng: {formatCurrency(availableBalance)}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Chọn tài khoản ngân hàng"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            {bankAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.bankName} - {account.accountNumber} (
                {account.accountHolder})
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleWithdraw}
          disabled={
            !amount || !selectedBank || Number(amount) > availableBalance
          }
        >
          Gửi yêu cầu rút tiền
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Thêm tài khoản ngân hàng
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thêm tài khoản ngân hàng mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button
            onClick={handleAddBankAccount}
            variant="contained"
            color="primary"
            disabled={
              !newBankAccount.bankName ||
              !newBankAccount.accountNumber ||
              !newBankAccount.accountHolder
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default WithdrawForm;
