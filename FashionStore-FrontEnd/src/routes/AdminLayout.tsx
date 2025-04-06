// layouts/AdminLayout.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProductForm_Admin from "../layouts/Admin/AddProductForm";
import ForbiddenPage from "../pages/ForbiddenPage";

const AdminLayout: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/create" element={<AddProductForm_Admin />}></Route>
        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Routes>
    </>
  );
};

export default AdminLayout;
