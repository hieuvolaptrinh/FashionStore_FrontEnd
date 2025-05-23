// src/layouts/AdminLayout.tsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "../layouts/Admin/Sidebar";
import TopNavbar from "../layouts/Admin/TopNavbar";
import Footer from "../layouts/Admin/Footer";
import ForbiddenPage from "../pages/ForbiddenPage";
import Forms from "../components/Admin/Forms";
import Charts from "../components/Admin/Charts/Charts";
import UserAdminManager from "../components/Admin/User/UserAdminManager";
import RequireAdmin from "./RequireAdmin";
import OrdersTable from "../components/Admin/Order/OrderTable";
import AdminOrderPage from "../pages/Admin/AdminOrderPage";
import VoucherPage from "../pages/Admin/VoucherManagerPage";
import StudentManagerPage from "../pages/Admin/StudentManagerPage";
import AdminRevenuePage from "../pages/Admin/AdminRevenuePage";
import RevenueSummary from "../components/Admin/Revenue/RevenueSummary";
import { mockRevenueSummary } from "../components/Admin/Revenue/revenueTypes";
import AdminChat from "../components/Admin/AdminChat/AdminChat";
import { IconButton } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const FloatingButton = styled(IconButton)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
  color: "#fff",
  width: "48px",
  height: "48px",
  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
    boxShadow: "0 6px 16px rgba(33, 150, 243, 0.4)",
  },
  zIndex: 1002,
  transition: "all 0.3s ease",
  "@media (max-width: 600px)": {
    bottom: "16px",
    right: "16px",
  },
});

// interface StatItem {
//   icon: string;
//   title: string;
//   value: string;
// }
const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);
  const toggleChat = (): void => setIsChatOpen(!isChatOpen);

  // const stats: StatItem[] = [
  //   { icon: "chart-line", title: "Lược Truy Cập ", value: "824" },
  //   { icon: "chart-bar", title: "Doanh Thu Hôm Nay", value: "13.000 vnđ" },
  //   { icon: "chart-area", title: "Tổng Lợi Nhuận", value: "123.000 vnđ" },
  //   { icon: "chart-pie", title: "Tỷ Lệ Trả Hàng", value: "2%" },
  // ];

  return (
    <div className="d-flex position-relative min-vh-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="content flex-grow-1 d-flex flex-column">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <Container fluid className="pt-4 px-4 flex-grow-1">
          <div className="bg-white rounded shadow-sm">
            <RevenueSummary data={mockRevenueSummary} />
          </div>
          {/* <Row className="g-4">
            {stats.map((item, index) => (
              <Col sm={6} xl={3} key={index}>
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                  <i className={`fa fa-${item.icon} fa-3x text-primary`}></i>
                  <div className="ms-3">
                    <p className="mb-2 ">{item.title}</p>
                    <h6 className="mb-0">{item.value}</h6>
                  </div>
                </div>
              </Col>
            ))}
          </Row> */}
          <Routes>
            <Route path="/" element={<AdminRevenuePage />} />
            <Route path="/products" element={<AdminOrderPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/user" element={<UserAdminManager />} />
            {/* Placeholder */}
            <Route path="/vouchers" element={<VoucherPage />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/payment-student" element={<StudentManagerPage />} />
          </Routes>
        </Container>
        <FloatingButton onClick={toggleChat}>
          <ChatIcon />
        </FloatingButton>
        {isChatOpen && <AdminChat />}
        <Footer />
      </div>
    </div>
  );
};

const AdminLayout_Checked = RequireAdmin(AdminLayout);

export default AdminLayout_Checked;
