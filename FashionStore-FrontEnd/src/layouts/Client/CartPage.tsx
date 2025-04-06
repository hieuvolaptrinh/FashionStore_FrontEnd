import { useEffect, useState } from "react";
import RequireUser from "./RequireUser";
import { getCart, getCartDetails } from "../../service/API/CartAPI";
import { CartDetailModel, CartModel } from "../../models/CartModel";
import CartItem from "../../components/CartItem";

function CartPage() {
  const [cart, setCart] = useState<CartModel>();
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>();

  useEffect(() => {
    getCart()
      .then((response) => {
        setCart(response);
        console.log("Cart data:", response);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });

    getCartDetails()
      .then((response) => {
        setCartDetails(response);
        console.log("Cart data:", response);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleCartUpdate = () => {
    // Gọi lại API để cập nhật dữ liệu giỏ hàng
    getCart()
      .then((response) => {
        setCart(response);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });

    getCartDetails()
      .then((response) => {
        setCartDetails(response);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Hình ảnh </th>
                  <th>Sản phẩm </th>
                  <th>Giá </th>
                  <th>Số lượng</th>
                  <th>Tổng tièn</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartDetails?.map((cartDetail) => (
                  <CartItem
                    key={cartDetail.cartDetailId}
                    item={cartDetail} // Sửa từ 'cartDetail' thành 'item'
                    onUpdate={handleCartUpdate} // Thêm prop onUpdate
                  />
                ))}
                {/* <CartItem></CartItem> */}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form className="mb-30" action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Nhập mã giảm giá "
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">
                    Apply Mã giảm giá{" "}
                  </button>
                </div>
              </div>
            </form>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Giỏ Hàng</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Tổng tiền sản phẩm</h6>
                  <h6>{cart ? cart.totalPrices : 0}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Phí vận chuyển </h6>
                  <h6 className="font-weight-medium">Free</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Tổng tiền cần thanh toán </h5>
                  <h5>{cart ? cart.totalPrices : 0}</h5>
                </div>
                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CartPage_User = RequireUser(CartPage);

export default CartPage_User;
