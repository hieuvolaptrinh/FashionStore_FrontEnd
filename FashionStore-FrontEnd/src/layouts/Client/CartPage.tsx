import { useEffect, useState } from "react";
import RequireUser from "./RequireUser";
import { getCart, getCartDetails } from "../../service/API/CartAPI";
import { CartDetailModel, CartModel } from "../../models/CartModel";
import CartItem from "../../components/Cart/CartItem";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState<CartModel>();
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

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
        console.log("Cart details:", response);
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

  // Hàm để xử lý khi checkbox thay đổi
  const handleSelectItem = (id: number, isSelected: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    if (isSelected) {
      newSelectedItems.add(id);
    } else {
      newSelectedItems.delete(id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleCheckout = () => {
    const selectedIds = Array.from(selectedItems);
    console.log("Selected IDs:", selectedIds);
    navigate("/order", { state: { selectedIds } });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Chọn thanh toán</th>
                  <th>Mã </th>
                  <th>Hình ảnh </th>
                  <th>Sản phẩm </th>
                  <th>Giá </th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartDetails?.map((cartDetail) => (
                  <CartItem
                    key={cartDetail.cartDetailId}
                    item={cartDetail}
                    onUpdate={handleCartUpdate}
                    onSelect={handleSelectItem}
                    selectedItems={selectedItems}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Đặt hàng */}
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
                  <h6>{cart ? cart.totalPrices.toLocaleString("vi-VN") : 0}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Phí vận chuyển </h6>
                  <h6 className="font-weight-medium">Free</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Tổng tiền cần thanh toán: </h5>
                  <h5>
                    {cart ? cart.totalPrices.toLocaleString("vi-VN") : 0} vnd
                  </h5>
                </div>
                <button
                  className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  onClick={handleCheckout}
                >
                  Đặt hàng ngay
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
