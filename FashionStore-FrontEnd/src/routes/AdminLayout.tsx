// src/layouts/AdminLayout.tsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Admin/Sidebar";
import TopNavbar from "../components/Admin/TopNavbar";

import Footer from "../components/Admin/Footer";
import AddProductForm_Admin from "../layouts/Admin/AddProductForm";
import ForbiddenPage from "../pages/ForbiddenPage";
import Dashboard from "../components/Admin/Dashboard";

import Widgets from "../components/Admin/Widgets";
import Forms from "../components/Admin/Forms";
import Charts from "../components/Admin/Charts";
import "../App.css"; // Ensure styles are imported
import UserAdminManager from "../components/Admin/UserAdminManager";

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
            <Route path="/create" element={<AddProductForm_Admin />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/user" element={<UserAdminManager />} />
            {/* Placeholder */}
            <Route path="/widgets" element={<Widgets />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
