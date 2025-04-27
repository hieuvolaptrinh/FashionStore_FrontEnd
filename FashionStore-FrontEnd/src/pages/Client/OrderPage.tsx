import React, { useEffect, useState } from "react";
import OrderItem from "../../components/Client/Order/OrderItem";
import { ResponseOrder } from "../../models/OrderModel";
import { getOrderUser } from "../../service/API/OrderAPI";
import {
  Typography,
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import RequireUser from "../../routes/RequireUser";

const StyledContainer = styled(Container)({
  paddingTop: "20px",
  paddingBottom: "40px",
  background:
    "linear-gradient(135deg,rgb(251, 252, 210) 0%,rgb(201, 229, 217) 100%)",
  minHeight: "100vh",
  "@media (max-width: 600px)": {
    paddingTop: "70px",
  },
});

const FilterBox = styled(Box)({
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
  flexWrap: "wrap",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  "@media (max-width: 600px)": {
    flexDirection: "column",
  },
});

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<ResponseOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<ResponseOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrderUser()
      .then((response) => {
        setOrders(response);
        setFilteredOrders(response);
        console.log("Order data:", response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.orderId.toString().includes(searchTerm.trim())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  return (
    <>
      <StyledContainer>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#fff",
            background: "linear-gradient(to right, #1976d2, #42a5f5)",
            padding: "15px 20px",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          DANH SÁCH ĐƠN HÀNG
        </Typography>
        <FilterBox>
          <TextField
            label="Tìm kiếm mã đơn hàng"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1, minWidth: "200px", backgroundColor: "#fff" }}
          />
          <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Trạng thái"
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="Chưa xử lý">Chưa xử lý</MenuItem>
              <MenuItem value="Đang giao">Đang giao</MenuItem>
              <MenuItem value="Đã giao">Đã giao</MenuItem>
              <MenuItem value="Đã hủy">Đã hủy</MenuItem>
              <MenuItem value="Đã hủy"> Đang vận chuyển</MenuItem>
            </Select>
          </FormControl>
        </FilterBox>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredOrders.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", color: "#666" }}>
            Không tìm thấy đơn hàng
          </Typography>
        ) : (
          <div className="accordion" id="ordersAccordion">
            {filteredOrders.map((order) => (
              <OrderItem key={order.orderId} order={order} />
            ))}
          </div>
        )}
      </StyledContainer>
    </>
  );
};

const OrderPage_Checked = RequireUser(OrderPage);
export default OrderPage_Checked;
