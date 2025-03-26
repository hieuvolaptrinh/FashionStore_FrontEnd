import Footer from "./layouts/Footer";
import HomePage from "./layouts/HomePage";
import Header from "./layouts/Header";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";

import ProductDetail from "./pages/ProductDetail";
import Trademark from "./pages/Trademark";
import { Register } from "./layouts/Register";
import Login from "./layouts/Login";
import ActivateAccount from "./pages/ActivateAccount";

function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header keyword={keyword} setKeyword={setKeyword} />
        {/* routes */}
        <Routes>
          <Route path="/" element={<HomePage keyword={keyword} />} />
          <Route path="/:typeId" element={<HomePage keyword={keyword} />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/activateAccount/:email/:activationCode"
            element={<ActivateAccount />}
          ></Route>
        </Routes>
        <Trademark />
        <Footer />
      </BrowserRouter>
  </>
  );
}

export default App;
