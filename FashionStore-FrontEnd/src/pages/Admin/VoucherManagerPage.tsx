import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import GenericTable from "../../components/GenericTable";
import VoucherFormDialog from "../../components/Admin/Voucher/VoucherFormDialog";
import {
  Voucher,
  voucherData,
} from "../../components/Admin/Voucher/voucherDataFake";

const VoucherManagerPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>(voucherData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | undefined>();

  const columns = [
    { header: "Mã voucher", accessor: "code" },
    { header: "Thời hạn", accessor: "expiryDate" },
    { header: "Số tiền giảm", accessor: "discountAmount" },
    { header: "Điều kiện áp dụng", accessor: "conditions" },
  ];

  const handleEdit = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsDialogOpen(true);
  };

  const handleDelete = (voucher: Voucher) => {
    setVouchers(vouchers.filter((v) => v.id !== voucher.id));
  };

  const handleAdd = () => {
    setSelectedVoucher(undefined);
    setIsDialogOpen(true);
  };

  const handleSubmit = (voucherData: Partial<Voucher>) => {
    if (selectedVoucher) {
      // Edit existing voucher
      setVouchers(
        vouchers.map((v) =>
          v.id === selectedVoucher.id ? { ...v, ...voucherData } : v
        )
      );
    } else {
      // Add new voucher
      const newVoucher: Voucher = {
        id: Date.now().toString(),
        code: voucherData.code || "",
        expiryDate: voucherData.expiryDate || "",
        discountAmount: voucherData.discountAmount || 0,
        conditions: voucherData.conditions || "",
      };
      setVouchers([...vouchers, newVoucher]);
    }
  };

  const renderActions = (voucher: Voucher) => {
    return (
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit(voucher)}
        >
          Sửa
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(voucher)}
        >
          Xóa
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Quản lý Voucher</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Thêm Voucher
        </Button>
      </Box>

      <GenericTable
        data={vouchers}
        columns={columns}
        rowKey="id"
        actions={renderActions}
      />

      <VoucherFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedVoucher}
      />
    </Box>
  );
};

export default VoucherManagerPage;
