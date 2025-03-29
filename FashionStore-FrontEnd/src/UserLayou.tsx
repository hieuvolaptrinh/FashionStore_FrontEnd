import Footer from "./layouts/Client/Footer";

import Header from "./layouts/Client/Header";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Trademark from "./pages/Trademark";
import { Register } from "./layouts/Register";
import Login from "./layouts/Login";
import ActivateAccount from "./pages/ActivateAccount";
import Test from "./Test/Test";
import HomePage from "./layouts/Client/HomePage";


function UserLayout() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Header keyword={keyword} setKeyword={setKeyword} />

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
        <Route path="/test" element={<Test />} />
      </Routes>
      <Trademark />
      <Footer />
    </>
  );
}

export default UserLayout;
