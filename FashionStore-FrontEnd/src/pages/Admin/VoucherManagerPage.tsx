import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    voucherId: "",
  });

  const columns = [
    { header: "Mã voucher", accessor: "code" },
    { header: "Ngày bắt đầu", accessor: "startDate" },
    { header: "Ngày kết thúc", accessor: "endDate" },
    {
      header: "Số tiền giảm",
      accessor: (voucher: Voucher) =>
        `${voucher.discountAmount.toLocaleString()} VNĐ`,
    },
    { header: "Số lượng", accessor: "quantity" },
    { header: "Điều kiện áp dụng", accessor: "conditions" },
  ];

  const handleEdit = (voucher: Voucher) => {
    // Tạo một bản sao của voucher để tránh ảnh hưởng trực tiếp đến dữ liệu
    const voucherToEdit = { ...voucher };
    setSelectedVoucher(voucherToEdit);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (voucher: Voucher) => {
    setConfirmDialog({
      open: true,
      title: "Xác nhận xóa voucher",
      message: `Bạn có chắc chắn muốn xóa voucher "${voucher.code}" không?`,
      voucherId: voucher.id,
    });
  };

  const handleDelete = () => {
    setVouchers(vouchers.filter((v) => v.id !== confirmDialog.voucherId));
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const handleAdd = () => {
    setSelectedVoucher(undefined);
    setIsDialogOpen(true);
  };

  const handleSubmit = (voucherData: Partial<Voucher>) => {
    if (selectedVoucher && selectedVoucher.id) {
      // Edit existing voucher
      setVouchers(
        vouchers.map((v) =>
          v.id === selectedVoucher.id ? { ...v, ...voucherData } : v
        )
      );
      console.log("Voucher đã được cập nhật:", {
        ...selectedVoucher,
        ...voucherData,
      });
    } else {
      // Add new voucher
      const newVoucher: Voucher = {
        id: Date.now().toString(),
        code: voucherData.code || "",
        startDate: voucherData.startDate || "",
        endDate: voucherData.endDate || "",
        discountAmount: voucherData.discountAmount || 0,
        conditions: voucherData.conditions || "",
        quantity: voucherData.quantity || 0,
      };
      setVouchers([...vouchers, newVoucher]);
      console.log("Voucher mới đã được thêm:", newVoucher);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset selectedVoucher sau khi đóng dialog
    setTimeout(() => setSelectedVoucher(undefined), 300);
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
          onClick={() => handleDeleteConfirm(voucher)}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          startIcon={<span>+</span>}
        >
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
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={selectedVoucher}
      />

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            color="primary"
          >
            Hủy
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoucherManagerPage;
