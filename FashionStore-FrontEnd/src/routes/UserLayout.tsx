
import Footer from "../layouts/Client/Footer";
import Header from "../layouts/Client/Header";

import Navbar from "../layouts/Client/Navbar";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet /> {/* Nội dung chính của trang */}
      <Footer />
    </>
  );
}

export default UserLayout;
