// layouts/AdminLayout.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProductForm from "../layouts/Admin/AddProductForm";

const AdminLayout: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/create" element={<AddProductForm />}></Route>
      </Routes>
    </>
  );
};

export default AdminLayout;
