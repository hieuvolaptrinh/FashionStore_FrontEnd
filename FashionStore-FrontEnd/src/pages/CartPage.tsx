import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartModel, CartDetailModel } from "../models/CartModel";
import { getCart, getCartDetails } from "../service/API/CartAPI";
import CartItem from "../components/CartItem";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const [cartData, detailsData] = await Promise.all([
        getCart(),
        getCartDetails()
      ]);
      setCart(cartData);
      setCartDetails(detailsData);
      setError(null);
    } catch (err) {
      setError("Không thể lấy thông tin giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleCartUpdate = () => {
    fetchCartData();
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cart || cartDetails.length === 0) {
    return (
      <div>
        <h2>Giỏ hàng trống</h2>
        <Link to="/products">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Giỏ hàng của bạn</h2>
      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.map((item) => (
            <CartItem
              key={item.cartDetailId}
              item={item}
              onUpdate={handleCartUpdate}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Tổng cộng:</td>
            <td>{cart.totalPrices.toLocaleString("vi-VN")} vnđ</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div>
        <Link to="/products">Tiếp tục mua sắm</Link>
        <button>Thanh toán</button>
      </div>
    </div>
  );
};

export default CartPage; 