// src/layouts/AdminLayout.tsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../layouts/Admin/Sidebar";
import TopNavbar from "../layouts/Admin/TopNavbar";

import Footer from "../layouts/Admin/Footer";

import ForbiddenPage from "../pages/ForbiddenPage";
import Dashboard from "../components/Admin/Dashboard";

import Forms from "../components/Admin/Forms";
import Charts from "../components/Admin/Charts";
import UserAdminManager from "../components/Admin/User/UserAdminManager";
import RequireAdmin from "./RequireAdmin";
import OrdersTable from "../components/Admin/Order/OrderTable";
import AdminOrderPage from "../pages/Admin/AdminOrderPage";
import VoucherPage from "../pages/Admin/VoucherManagerPage";
interface StatItem {
  icon: string;
  title: string;
  value: string;
}
const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  const stats: StatItem[] = [
    { icon: "chart-line", title: "Lược Truy Cập ", value: "10000" },
    { icon: "chart-bar", title: "Doanh Thu Hôm Nay", value: "$1234" },
    { icon: "chart-area", title: "Tổng Lợi Nhuận", value: "$25245" },
    { icon: "chart-pie", title: "Tỷ Lệ Trả Hàng", value: "0%" },
  ];

  return (
    <div className="d-flex position-relative min-vh-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="content flex-grow-1 d-flex flex-column">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <Container fluid className="pt-4 px-4 flex-grow-1">
          <Row className="g-4">
            {stats.map((item, index) => (
              <Col sm={6} xl={3} key={index}>
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                  <i className={`fa fa-${item.icon} fa-5x text-primary`}></i>
                  <div className="ms-3">
                    <p className="mb-2 ">{item.title}</p>
                    <h6 className="mb-0">{item.value}</h6>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<AdminOrderPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/user" element={<UserAdminManager />} />
            {/* Placeholder */}
            <Route path="/vouchers" element={<VoucherPage />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/orders" element={<OrdersTable />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

const AdminLayout_Checked = RequireAdmin(AdminLayout);

export default AdminLayout_Checked;
