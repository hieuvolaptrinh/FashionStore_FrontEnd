import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProductItem from "../../components/Client/ReturnProduct/ProductItem";
import ListBank from "../../components/Client/Checkout/ListBank";
import BankForm from "../../components/Client/Checkout/BankForm";
import SubmitReturnButton from "../../components/Client/ReturnProduct/SubmitReturnButton";

interface BankAccount {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const ReturnProductPage = () => {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: "Vòng tay nhiều màu",
      image: "./images/p11.jpg",
      description:
        "Vòng tay thủ công sử dụng đá tự nhiên, mang lại vẻ đẹp tinh tế và ý nghĩa phong thủy.",
    },
  ]);

  const [returnReasons, setReturnReasons] = useState<{ [key: number]: string }>(
    {}
  );
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      bankName: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "NGUYEN VAN A",
    },
    {
      id: 2,
      bankName: "TPBank",
      accountNumber: "0987654321",
      accountName: "NGUYEN VAN A",
    },
  ]);

  const handleReasonChange = (productId: number, reason: string) => {
    setReturnReasons((prev) => ({
      ...prev,
      [productId]: reason,
    }));
  };

  const handleAddBank = (newBank: BankAccount) => {
    setBankAccounts((prev) => [...prev, { ...newBank, id: prev.length + 1 }]);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Return reasons:", returnReasons);
    console.log("Selected bank:", selectedBankId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Đổi/Trả sản phẩm
      </Typography>

      <div className="row">
        <div className="col-md-8">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              returnReason={returnReasons[product.id] || ""}
              onReasonChange={(reason) =>
                handleReasonChange(product.id, reason)
              }
            />
          ))}
          {/* tải lên hình ảnh minh chứng và hiển thị preview*/}
          {/* mô tả chi tiết vấn đề  */}
        </div>

        <div className="col-md-4">
          <Typography variant="h6" gutterBottom>
            Tài khoản nhận hoàn tiền
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="bank-select-label">Chọn tài khoản</InputLabel>
            <Select
              labelId="bank-select-label"
              value={selectedBankId}
              label="Chọn tài khoản"
              onChange={(e) => setSelectedBankId(e.target.value)}
            >
              {bankAccounts.map((bank) => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.bankName} - {bank.accountNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ListBank bankAccounts={bankAccounts} />
          <BankForm onAddBank={handleAddBank} />
        </div>
      </div>

      <SubmitReturnButton onSubmit={handleSubmit} />
    </Container>
  );
};

export default ReturnProductPage;
