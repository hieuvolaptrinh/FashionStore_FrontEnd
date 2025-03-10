import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import HomePage from "./layouts/homepage/HomePage";
import Header from "./layouts/Header";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import Carousel from "./layouts/homepage/components/Carousel";
import ProductDetail from "./pages/ProductDetail";
import Trademark from "./pages/Trademark";

function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header keyword={keyword} setKeyword={setKeyword} />
        <Navbar />
        <Carousel />
        {/* routes */}
        <Routes>
          <Route path="/" element={<HomePage keyword={keyword} />} />
          <Route path="/:typeId" element={<HomePage keyword={keyword} />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
        <Trademark />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
