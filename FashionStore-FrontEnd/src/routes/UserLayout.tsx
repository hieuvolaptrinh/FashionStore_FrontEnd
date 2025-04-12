import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../layouts/Client/HomePage";
import { About } from "../pages/About";
import ProductDetail from "../pages/ProductDetail";
import { Register } from "../layouts/Register";
import Login from "../layouts/Login";
import ActivateAccount from "../pages/ActivateAccount";

import Trademark from "../pages/Trademark";
import Footer from "../layouts/Client/Footer";
import Header from "../layouts/Client/Header";

import CartPage from "../layouts/Client/CartPage";
import Navbar from "../layouts/Client/Navbar";
import LoginRequiredPage from "../pages/LoginRequiredPage";
import OrderPage from "../layouts/Client/OrderPage";

function UserLayout() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Header keyword={keyword} setKeyword={setKeyword} />
      <Navbar />
      {/* Lưu ý: ở đây KHÔNG có BrowserRouter nữa */}
      <Routes>
        <Route index element={<HomePage keyword={keyword} />} />
        <Route path="/:typeId" element={<HomePage keyword={keyword} />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/activateAccount/:email/:activationCode"
          element={<ActivateAccount />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/loginrequired" element={<LoginRequiredPage />} />

        <Route path="/order" element={<OrderPage />} />
      </Routes>
      <Trademark />
      <Footer />
    </>
  );
}

export default UserLayout;
