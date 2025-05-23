import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import GenericTable from "../../GenericTable";
import { WithdrawRequest } from "./revenueTypes";

interface WithdrawHistoryProps {
  data: WithdrawRequest[];
}

const WithdrawHistory: React.FC<WithdrawHistoryProps> = ({ data }) => {
  const [status, setStatus] = useState<string>("all");

  const columns = [
    { header: "Ngày yêu cầu", accessor: "requestDate" },
    {
      header: "Số tiền",
      accessor: (item: WithdrawRequest) => (
        <Typography>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.amount)}
        </Typography>
      ),
    },
    { header: "Ngân hàng", accessor: "bankName" },
    { header: "Số tài khoản", accessor: "accountNumber" },
    { header: "Tên chủ tài khoản", accessor: "accountHolder" },
    {
      header: "Trạng thái",
      accessor: (item: WithdrawRequest) => (
        <Typography
          sx={{
            color:
              item.status === "Đã xử lý"
                ? "success.main"
                : item.status === "Đang chờ"
                ? "warning.main"
                : "error.main",
          }}
        >
          {item.status}
        </Typography>
      ),
    },
    { header: "Ngày xử lý", accessor: "processDate" },
  ];

  const filteredData = data.filter(
    (item) => status === "all" || item.status === status
  );

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Lịch sử rút tiền
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="Đã xử lý">Đã xử lý</MenuItem>
            <MenuItem value="Đang chờ">Đang chờ</MenuItem>
            <MenuItem value="Từ chối">Từ chối</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ overflowX: "auto" }}>
        <GenericTable data={filteredData} columns={columns} rowKey="id" />
      </Box>
    </Card>
  );
};

export default WithdrawHistory;
