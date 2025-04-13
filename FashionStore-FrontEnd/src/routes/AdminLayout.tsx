// layouts/AdminLayout.tsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AddProductForm_Admin from "../layouts/Admin/AddProductForm";
import ForbiddenPage from "../pages/ForbiddenPage";
import Dashboard from "../components/Admin/Dashboard";
import Tables from "../components/Admin/Tables";
import { Typography } from "@mui/material";
import Widgets from "../components/Admin/Widgets";
import Forms from "../components/Admin/Forms";
import Charts from "../components/Admin/Charts";
import Sidebar from "../components/Admin/Sidebar";

import Footer from "../components/Admin/Footer";
import Spinner from "../components/Admin/Spinner";
import TopNavbar from "../components/Admin/TopNavbar";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);
  return (
    <>
      <Spinner />
      <Sidebar isOpen={sidebarOpen} />

      <TopNavbar toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/create" element={<AddProductForm_Admin />}></Route>
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/typography" element={<Typography />} />
        <Route path="/widgets" element={<Widgets />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AdminLayout;
