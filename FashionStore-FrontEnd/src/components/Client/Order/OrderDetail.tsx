import React from "react";

interface OrderDetail {
  detailId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

const OrderDetail: React.FC<{ details: OrderDetail[] }> = ({ details }) => (
  <div className="p-3 bg-light">
    <h6>Chi tiết đơn hàng</h6>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Mã CT</th>
            <th>Hình ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.detailId}>
              <td>{detail.detailId}</td>
              <td>
                <img
                  src={detail.image}
                  alt={detail.productName}
                  className="product-img rounded"
                />
              </td>
              <td>{detail.productName}</td>
              <td>{detail.price.toLocaleString("vi-VN")} đ</td>
              <td>{detail.quantity}</td>
              <td>
                {(detail.price * detail.quantity).toLocaleString("vi-VN")} đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderDetail;
