import React from "react";
import { Typography, Paper } from "@mui/material";

interface BankAccount {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface ListBankProps {
  bankAccounts: BankAccount[];
}

const ListBank: React.FC<ListBankProps> = ({ bankAccounts }) => {
  return (
    <div className="mb-4">
      {bankAccounts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Bạn chưa có tài khoản ngân hàng nào. Vui lòng thêm tài khoản mới.
        </Typography>
      ) : (
        <>
          {bankAccounts.map((account) => (
            <Paper
              key={account.id}
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                borderLeft: "4px solid #1976d2",
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {account.bankName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số tài khoản: {account.accountNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chủ tài khoản: {account.accountName}
              </Typography>
            </Paper>
          ))}
        </>
      )}
    </div>
  );
};

export default ListBank;
