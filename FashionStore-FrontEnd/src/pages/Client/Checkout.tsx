import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddressModel } from "../../models/AddressModel";
import {
  OrderModel,
  PaymentType,
  ShippingMethod,
} from "../../models/OrderModel";
import { CartDetailModel } from "../../models/CartModel";
import {
  createAddress,
  createOrder,
  getAllPaymentTypes,
  getAllShippingMethods,
  getUserAddresses,
} from "../../service/API/OrderAPI";
import { getSelectedCartDetails } from "../../service/API/CartAPI";
import AddressList from "../../components/Client/Order/AddressList";
import AddressForm from "../../components/Client/Order/AddressForm";
import OrderSummary from "../../components/Client/Order/OrderSummary";
import { getUrlPayment } from "../../service/API/PaymentAPI";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || [];

  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<PaymentType | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Received selectedIds:", selectedIds);

    if (selectedIds.length === 0) {
      setError("Không có sản phẩm nào được chọn");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Vui lòng đăng nhập để tiếp tục");
        }

        const [addressData, cartData, paymentData, shippingData] =
          await Promise.all([
            getUserAddresses(),
            getSelectedCartDetails(selectedIds),
            getAllPaymentTypes(),
            getAllShippingMethods(),
          ]);

        console.log("Fetched cart details:", cartData);

        if (!cartData || cartData.length === 0) {
          throw new Error("Không tìm thấy sản phẩm được chọn");
        }

        setAddresses(addressData);
        setCartDetails(cartData);
        setPaymentTypes(paymentData);
        setShippingMethods(shippingData);

        if (addressData.length > 0) {
          setSelectedAddressId(addressData[0].addressId ?? null);
        }
        if (paymentData.length > 0) {
          setSelectedPaymentType(paymentData[0]);
        }
        if (shippingData.length > 0) {
          setSelectedShippingMethod(shippingData[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedIds, navigate]);

  const handleAddAddress = async (newAddress: AddressModel) => {
    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses((prev) => [...prev, createdAddress]);
      setSelectedAddressId(createdAddress.addressId ?? null);
    } catch (err) {
      alert("Không thể thêm địa chỉ mới: " + err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) {
      alert("Vui lòng chọn hoặc thêm một địa chỉ giao hàng");
      return;
    }
    if (!selectedPaymentType) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }
    if (!selectedShippingMethod) {
      alert("Vui lòng chọn phương thức vận chuyển");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return;
    }

    const payload: OrderModel = {
      addressId: selectedAddressId,
      paymentTypeId: selectedPaymentType?.paymentTypeId ?? 0,
      shippingMethodId: selectedShippingMethod?.shippingMethodId ?? 0,
      selectedIds,
    };

    try {
      const orderId = await createOrder(payload);

      if (selectedPaymentType.paymentTypeId != 1) {
        alert("Đơn hàng đã được xác nhận!");
        navigate("/order");
      } else {
        const productTotal = cartDetails.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        // chỗ này id =1 nghĩa là tôi đang thanh toán online
        alert("Đơn hàng đã được xác nhận! Chuyển đến trang thanh toán.");
        //  chỗ này chuyển sang trang thanh toán

        const paymentUrl = await getUrlPayment(orderId, productTotal);
        window.location.href = paymentUrl; // Chuyển hướng đến VNPay
        // 
      }
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại: " + err);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
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
                  <label htmlFor="paymentTypeId" className="form-label fw-bold">
                    Phương Thức Thanh Toán
                  </label>
                  <select
                    className="form-select"
                    id="paymentTypeId"
                    name="paymentTypeId"
                    value={selectedPaymentType?.paymentTypeId || ""}
                    onChange={(e) => {
                      const selected = paymentTypes.find(
                        (pt) => pt.paymentTypeId === Number(e.target.value)
                      );
                      setSelectedPaymentType(selected || null);
                    }}
                    required
                  >
                    <option value="" disabled>
                      Chọn phương thức thanh toán
                    </option>
                    {paymentTypes.map((pt) => (
                      <option key={pt.paymentTypeId} value={pt.paymentTypeId}>
                        {pt.paymentTypeName} ({pt.fee.toLocaleString("vi-VN")}{" "}
                        vnđ)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="shippingMethodId"
                    className="form-label fw-bold"
                  >
                    Phương Thức Vận Chuyển
                  </label>
                  <select
                    className="form-select"
                    id="shippingMethodId"
                    name="shippingMethodId"
                    value={selectedShippingMethod?.shippingMethodId || ""}
                    onChange={(e) => {
                      const selected = shippingMethods.find(
                        (sm) => sm.shippingMethodId === Number(e.target.value)
                      );
                      setSelectedShippingMethod(selected || null);
                    }}
                    required
                  >
                    <option value="" disabled>
                      Chọn phương thức vận chuyển
                    </option>
                    {shippingMethods.map((sm) => (
                      <option
                        key={sm.shippingMethodId}
                        value={sm.shippingMethodId}
                      >
                        {sm.shippingMethodName} (
                        {sm.fee.toLocaleString("vi-VN")} vnđ)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-between">
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
        <div className="col-lg-6 mb-5">
          <OrderSummary
            cartDetails={cartDetails}
            selectedPaymentType={selectedPaymentType}
            selectedShippingMethod={selectedShippingMethod}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
