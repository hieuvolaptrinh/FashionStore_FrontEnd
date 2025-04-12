// components/order/OrderSummary.tsx
import React from "react";
import { CartDetailModel } from "../../models/CartModel";

interface OrderSummaryProps {
  cartDetails: CartDetailModel[];
  loading: boolean;
  error: string | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartDetails,
  loading,
  error,
}) => {
  const totalPrice = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="section-title position-relative text-uppercase mb-4">
          <span
            className="text-white px-3 py-1 rounded"
            style={{
              background:
                "linear-gradient(123deg,rgb(204, 153, 205),rgb(255, 0, 251))",
            }}
          >
            Sản phẩm thanh toán
          </span>
        </h5>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : cartDetails.length === 0 ? (
          <p>Không có sản phẩm nào được chọn.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead
                  className="thead-dark"
                  style={{
                    background:
                      "linear-gradient(123deg,rgb(204, 153, 205),rgb(255, 0, 251))",
                  }}
                >
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cartDetails.map((item) => (
                    <tr key={item.cartDetailId}>
                      <td>
                        {item.product.mainImage && (
                          <img
                            src={item.product.mainImage}
                            alt={item.product.productName}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <h6>{item.product.productName}</h6>
                        <p className="text-muted">{item.product.description}</p>
                      </td>
                      <td>{item.price.toLocaleString("vi-VN")} vnđ</td>
                      <td>{item.quantity}</td>
                      <td>
                        {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                        vnđ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-light p-4 mt-4 rounded">
              <div className="d-flex justify-content-between mb-3">
                <h6>Tổng tiền sản phẩm</h6>
                <h6>{totalPrice.toLocaleString("vi-VN")} vnđ</h6>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h6>Phí vận chuyển</h6>
                <h6>Miễn phí</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h5>Tổng tiền cần thanh toán:</h5>
                <h5>{totalPrice.toLocaleString("vi-VN")} vnđ</h5>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
