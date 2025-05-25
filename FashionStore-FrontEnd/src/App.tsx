import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./routes/AdminLayout";
import UserLayout from "./routes/UserLayout";
import HomePage from "./layouts/Client/HomePage";
import Checkout from "./pages/Client/Checkout";
import OrderPage_Checked from "./pages/Client/OrderPage";
import LoginRequiredPage from "./pages/LoginRequiredPage";
import CartPage_User from "./pages/Client/CartPage";
import ProductDetail from "./pages/Client/ProductDetailPage";
import ActivateAccount from "./pages/Client/ActivateAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { KeywordProvider } from "./contexts/KeywordContext";
import PaymentResult from "./pages/Client/PaymentResult";
import RestPassword from "./pages/Client/RestPassword";
import ForgotPassword from "./pages/Client/ForgotPassword";
import Contact from "./pages/Client/Contact";
import Profile from "./pages/Client/Profile";
import ListProductNeed from "./components/Client/ProductNeed/ListProductNeed";
import ReturnProductPage from "./pages/Client/ReturnProductPage";
import ListOrder from "./pages/Shipper/ListOrder";
import OrderDetail from "./pages/Shipper/OrderDetail";

function App() {
  return (
    <>
      <KeywordProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/:typeId" element={<HomePage />} />

              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/activateAccount/:email/:activationCode"
                element={<ActivateAccount />}
              />
              <Route
                path="/rest-password/:email/:activationCode"
                element={<RestPassword />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/carts" element={<CartPage_User />} />
              <Route path="/loginRequired" element={<LoginRequiredPage />} />
              <Route path="/orders" element={<OrderPage_Checked />} />

              <Route path="/checkouts" element={<Checkout />} />
              <Route path="/payment-result" element={<PaymentResult />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/need-products" element={<ListProductNeed />} />
              <Route path="/return-product" element={<ReturnProductPage />} />
              <Route path="/shipper" element={<ListOrder />} />
              <Route
                path="/shipper/orders/:orderId"
                element={<OrderDetail />}
              />
            </Route>

            {/* admin */}
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </BrowserRouter>
      </KeywordProvider>
    </>
  );
}
export default App;
