import React from "react";
import { Box, Button, Typography } from "@mui/material";
import GenericTable from "../../../components/GenericTable";
import { StudentProduct } from "./studentFakeData";

interface StudentProductTableProps {
  data: StudentProduct[];
  onPayment: (item: StudentProduct) => void;
}

const StudentProductTable: React.FC<StudentProductTableProps> = ({
  data,
  onPayment,
}) => {
  const columns = [
    { header: "Tên sinh viên", accessor: "name" },
    { header: "Mã số sinh viên", accessor: "msv" },
    { header: "Tên sản phẩm", accessor: "productName" },
    {
      header: "Hình ảnh sản phẩm",
      accessor: (item: StudentProduct) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={item.image}
            alt={item.productName}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "./images/p11.jpg";
            }}
          />
        </Box>
      ),
    },
    {
      header: "Số lượng",
      accessor: (item: StudentProduct) => (
        <Typography>{item.quantity}</Typography>
      ),
    },
    {
      header: "Tổng tiền",
      accessor: (item: StudentProduct) => (
        <Typography>{item.money.toLocaleString("vi-VN")} VNĐ</Typography>
      ),
    },
    {
      header: "Hoa hồng (10%",
      accessor: (item: StudentProduct) => (
        <Typography>{item.commission.toLocaleString("vi-VN")} VNĐ</Typography>
      ),
    },
    { header: "Trạng thái", accessor: "status" },
  ];

  const renderActions = (item: StudentProduct) => {
    if (item.status === "Đã nộp") {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onPayment(item)}
          >
            Thanh toán
          </Button>
        </Box>
      );
    }
    return null;
  };

  return (
    <GenericTable
      data={data}
      columns={columns}
      rowKey="id"
      actions={renderActions}
    />
  );
};

export default StudentProductTable;
