import React from "react";
import { Box, Typography } from "@mui/material";
import StudentProductTable from "../../components/Admin/Student/StudentProductTable";
import {
  studentProductData,
  StudentProduct,
} from "../../components/Admin/Student/studentFakeData";

const StudentManagerPage: React.FC = () => {
  const handleThanhToan = (item: StudentProduct) => {
    alert("Thanh toán cho sinh viên:" + item.name + "Số tiền:" + item.money);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Quản lý Sản phẩm Sinh viên
      </Typography>

      <StudentProductTable
        data={studentProductData}
        onPayment={handleThanhToan}
      />
    </Box>
  );
};

export default StudentManagerPage;
