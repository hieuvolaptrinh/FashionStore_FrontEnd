// src/layouts/AdminLayout.tsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "../layouts/Admin/Sidebar";
import TopNavbar from "../layouts/Admin/TopNavbar";

import Footer from "../layouts/Admin/Footer";
import AddProductForm from "../components/Admin/Product/AddProductForm";
import ForbiddenPage from "../pages/ForbiddenPage";
import Dashboard from "../components/Admin/Dashboard";

import Widgets from "../components/Admin/Widgets";
import Forms from "../components/Admin/Forms";
import Charts from "../components/Admin/Charts";
import "../App.css"; // Ensure styles are imported
import UserAdminManager from "../components/Admin/User/UserAdminManager";
import Orders from "../components/Admin/Order/Order";
import RequireAdmin from "./RequireAdmin";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex position-relative min-vh-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="content flex-grow-1 d-flex flex-column">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <Container fluid className="pt-4 px-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<AddProductForm />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/user" element={<UserAdminManager />} />
            {/* Placeholder */}
            <Route path="/widgets" element={<Widgets />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

const AdminLayout_Checked = RequireAdmin(AdminLayout);

export default AdminLayout_Checked;
