// layouts/AdminLayout.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProductForm_Admin from "../layouts/Admin/AddProductForm";

const AdminLayout: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/create" element={<AddProductForm_Admin />}></Route>
      </Routes>
    </>
  );
};

export default AdminLayout;
