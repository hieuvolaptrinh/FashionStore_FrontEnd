import React from "react";
import { CartDetailModel } from "../models/CartModel";
import { updateCartItem, removeFromCart } from "../service/API/CartAPI";

interface CartItemProps {
  item: CartDetailModel;
  onUpdate: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate }) => {
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(item.cartDetailId, newQuantity);
      onUpdate();
    } catch (error) {
      alert("Không thể cập nhật số lượng sản phẩm" + error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.cartDetailId);
      onUpdate();
    } catch (error) {
      alert("Không thể xóa sản phẩm khỏi giỏ hàng" + error);
    }
  };

  return (
    <>
      <tr>
        <td>
          <div>
            {item.product.mainImage && (
              <img
                src={item.product.mainImage}
                alt={item.product.productName}
                style={{ width: "80px", height: "80px" }}
              />
            )}
          </div>
        </td>
        <td>
          <h6>{item.product.productName}</h6>
          <p>{item.product.description}</p>
        </td>
        <td>{item.price.toLocaleString("vi-VN")} vnđ</td>
        <td className="">
          <div
            className="input-group quantity mx-auto my-auto"
            style={{ width: "100px" }}
          >
            <div className="input-group-btn">
              <button
                className="btn btn-sm btn-primary btn-minus"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control form-control-sm bg-secondary border-0 text-center"
              value={item.quantity}
              min="1"
            />
            <div className="input-group-btn">
              <button
                className="btn btn-sm btn-primary btn-plus"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>

        <td>{(item.price * item.quantity).toLocaleString("vi-VN")} vnđ</td>
        <td>
          <button onClick={handleRemove}>Xóa</button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
