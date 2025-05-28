import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box,
  Chip,
} from "@mui/material";

interface BankAccount {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface ListBankProps {
  bankAccounts: BankAccount[];
  onSelectBank?: (bankId: number | undefined) => void;
  selectedBankId?: number;
}

const ListBank: React.FC<ListBankProps> = ({
  bankAccounts,
  onSelectBank,
  selectedBankId: externalSelectedBankId,
}) => {
  const [internalSelectedBankId, setInternalSelectedBankId] = useState<
    number | undefined
  >(
    externalSelectedBankId ||
      (bankAccounts.length > 0 && bankAccounts[0].id
        ? bankAccounts[0].id
        : undefined)
  );

  useEffect(() => {
    if (bankAccounts.length > 0 && bankAccounts[0].id) {
      const defaultId = bankAccounts[0].id;

      const idToUse = externalSelectedBankId || defaultId;

      setInternalSelectedBankId(idToUse);

      if (onSelectBank) {
        onSelectBank(idToUse);
      }
    }
  }, [bankAccounts, externalSelectedBankId, onSelectBank]);

  const selectedBankId =
    externalSelectedBankId !== undefined
      ? externalSelectedBankId
      : internalSelectedBankId;

  const handleBankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bankId = Number(event.target.value);
    setInternalSelectedBankId(bankId);
    if (onSelectBank) {
      onSelectBank(bankId);
    }
  };

  return (
    <Box className="mb-4">
      {bankAccounts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Bạn chưa có tài khoản ngân hàng nào. Vui lòng thêm tài khoản mới.
        </Typography>
      ) : (
        <RadioGroup
          value={selectedBankId}
          onChange={handleBankChange}
          name="bank-account-group"
        >
          {bankAccounts.map((account, index) => (
            <Paper
              key={account.id}
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                borderLeft: "4px solid #1976d2",
                border:
                  account.id === selectedBankId
                    ? "1px solid #1976d2"
                    : "1px solid #e0e0e0",
                "&:hover": { boxShadow: 3 },
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
                backgroundColor:
                  account.id === selectedBankId
                    ? "rgba(25, 118, 210, 0.05)"
                    : "white",
              }}
            >
              <FormControlLabel
                value={account.id}
                control={<Radio />}
                label=""
                sx={{ mr: 1 }}
              />
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {account.bankName}
                  </Typography>
                  {index === 0 && (
                    <Chip
                      label="Mặc định"
                      color="success"
                      size="small"
                      sx={{ borderRadius: 10 }}
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Số tài khoản: {account.accountNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chủ tài khoản: {account.accountName}
                </Typography>
              </Box>
            </Paper>
          ))}
        </RadioGroup>
      )}
    </Box>
  );
};

export default ListBank;
