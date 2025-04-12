// pages/OrderPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressList from "../../components/Order/AddressList";
import AddressForm from "../../components/Order/AddressForm";
import OrderSummary from "../../components/Order/OrderSummary";

import { createAddress, getUserAddresses } from "../../service/API/OrderAPI";
import { getSelectedCartDetails } from "../../service/API/CartAPI";
import { CartDetailModel } from "../../models/CartModel";
import { AddressModel } from "../../models/AddressModel";
import { OrderModel } from "../../models/OrderModel";

const OrderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || [];

  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    paymentMethod: string;
  }>({
    name: "",
    phone: "",
    paymentMethod: "cash",
  });
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách địa chỉ và sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Vui lòng đăng nhập để tiếp tục");
        }

        const [addressData, cartData] = await Promise.all([
          getUserAddresses(),
          getSelectedCartDetails(selectedIds),
        ]);

        setAddresses(addressData);
        setCartDetails(cartData);
        if (addressData.length > 0) {
          setSelectedAddressId(addressData[0].addressId ?? null);
        }
      } catch (err) {
        setError(err + "Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (selectedIds.length > 0) {
      fetchData();
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

  const handleAddAddress = async (newAddress: AddressModel) => {
    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses((prev) => [...prev, createdAddress]);
      setSelectedAddressId(createdAddress.addressId ?? null);
    } catch (err) {
      alert(err + "Không thể thêm địa chỉ mới");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền đầy đủ họ tên và số điện thoại");
      return;
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      alert("Số điện thoại phải có 10 chữ số");
      return;
    }
    if (!selectedAddressId) {
      alert("Vui lòng chọn hoặc thêm một địa chỉ giao hàng");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return;
    }

    const payload: OrderModel = {
      name: formData.name,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
      addressId: selectedAddressId,
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
    } catch (err) {
      alert(err + "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        {/* Cột trái: Địa chỉ và thông tin thanh toán */}
        <div className="col-lg-6 mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="section-title position-relative text-uppercase mb-4">
                <span
                  className="px-3 py-1 rounded text-white"
                  style={{
                    background: "linear-gradient(90deg, #007bff, #00d4ff)",
                  }}
                >
                  Thông tin giao hàng
                </span>
              </h5>
              <AddressList
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
              />
              <AddressForm onAddAddress={handleAddAddress} />
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label fw-bold">
                    Phương Thức Thanh Toán
                  </label>
                  <select
                    className="form-select"
                    id="paymentMethod"
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
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => navigate(-1)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn text-white rounded-pill"
                    style={{
                      background: "linear-gradient(90deg, #007bff, #00d4ff)",
                    }}
                  >
                    Xác Nhận Đơn Hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Cột phải: Sản phẩm thanh toán */}
        <div className="col-lg-6 mb-5">
          <OrderSummary
            cartDetails={cartDetails}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
