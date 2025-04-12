// OrderPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartDetailModel } from "../../models/CartModel";

interface OrderFormData {
  name: string;
  streetName: string;
  cityName: string;
  districtName: string;
  wardName: string;
  phone: string;
  paymentMethod: string;
}

const OrderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || []; // Lấy selectedIds từ state

  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    streetName: "",
    cityName: "",
    districtName: "",
    wardName: "",
    phone: "",
    paymentMethod: "cash",
  });
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API để lấy danh sách sản phẩm đã chọn
  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Không tìm thấy token xác thực");
        }

        const queryParams = new URLSearchParams();
        selectedIds.forEach((id: number) =>
          queryParams.append("ids", id.toString())
        );

        const response = await fetch(
          `http://localhost:8080/api/v1/cart/selected?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Không thể lấy danh sách sản phẩm");
        }

        const result = await response.json();
        setCartDetails(result.data || []);
      } catch (err) {
        setError(err + "Có lỗi xảy ra khi tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (selectedIds.length > 0) {
      fetchSelectedItems();
    } else {
      setLoading(false);
      setError("Không có sản phẩm nào được chọn");
    }
  }, [selectedIds]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return;
    }

    const payload = {
      ...formData,
      selectedIds,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể tạo đơn hàng");
      }

      alert("Đơn hàng đã được xác nhận!");
      navigate("/cart");
    } catch (error) {
      alert(error + "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  // Tính tổng tiền
  const totalPrice = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        {/* Cột trái: Form thông tin thanh toán */}
        <div className="col-lg-6 mb-5">
          <div className="card border-0">
            <div className="card-body">
              <h5 className="section-title position-relative text-uppercase mb-4">
                <span className="bg-secondary pr-3">Thông tin thanh toán</span>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formStreetName" className="form-label">
                    Tên Đường
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formStreetName"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đường"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formCityName" className="form-label">
                    Thành Phố
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formCityName"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên thành phố"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formDistrictName" className="form-label">
                    Quận/Huyện
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formDistrictName"
                    name="districtName"
                    value={formData.districtName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên quận/huyện"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formWardName" className="form-label">
                    Phường/Xã
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formWardName"
                    name="wardName"
                    value={formData.wardName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên phường/xã"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formPhone" className="form-label">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formPaymentMethod" className="form-label">
                    Phương Thức Thanh Toán
                  </label>
                  <select
                    className="form-select"
                    id="formPaymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="cash">Tiền mặt</option>
                    <option value="card">Thẻ ngân hàng</option>
                    <option value="momo">Momo</option>
                    <option value="zalo">Zalo Pay</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Xác Nhận Đơn Hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Cột phải: Danh sách sản phẩm và tổng tiền */}
        <div className="col-lg-6 mb-5">
          <div className="card border-0">
            <div className="card-body">
              <h5 className="section-title position-relative text-uppercase mb-4">
                <span className="bg-secondary pr-3">Sản phẩm thanh toán</span>
              </h5>
              {loading ? (
                <p>Đang tải...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : cartDetails.length === 0 ? (
                <p>Không có sản phẩm nào được chọn.</p>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-light table-borderless table-hover text-center mb-0">
                      <thead className="thead-dark">
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
                                  style={{ width: "80px", height: "80px" }}
                                />
                              )}
                            </td>
                            <td>
                              <h6>{item.product.productName}</h6>
                              <p>{item.product.description}</p>
                            </td>
                            <td>{item.price.toLocaleString("vi-VN")} vnđ</td>
                            <td>{item.quantity}</td>
                            <td>
                              {(item.price * item.quantity).toLocaleString(
                                "vi-VN"
                              )}{" "}
                              vnđ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-light p-4 mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
