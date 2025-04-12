import { API_BASE_URL } from "../../apiConfig";
import { AddressModel } from "../../models/AddressModel";
import {
  OrderModel,
  PaymentType,
  ShippingMethod,
} from "../../models/OrderModel";

import RestResponse from "../../models/RestResponse";

export const getUserAddresses = async (): Promise<AddressModel[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/orders/address`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách địa chỉ");
  }

  const result: RestResponse<AddressModel[]> = await response.json();
  return result.data || [];
};

export const createAddress = async (
  address: AddressModel
): Promise<AddressModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  // Không gửi addressId khi tạo mới
  const payload = {
    streetName: address.streetName,
    cityName: address.cityName,
    districtName: address.districtName,
    wardName: address.wardName,
  };

  const response = await fetch(`${API_BASE_URL}/api/v1/orders/address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Không thể tạo địa chỉ mới");
  }

  const result: RestResponse<AddressModel> = await response.json();
  return result.data;
};

export const getAllPaymentTypes = async (): Promise<PaymentType[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/v1/orders/payment-types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách phương thức thanh toán");
  }

  const result: RestResponse<PaymentType[]> = await response.json();
  return result.data || [];
};
export const getAllShippingMethods = async (): Promise<ShippingMethod[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/orders/shipping-methods`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách phương thức thanh toán");
  }

  const result: RestResponse<ShippingMethod[]> = await response.json();
  return result.data || [];
};
// tạo mới hóa đơn
export const createOrder = async (order: OrderModel): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Không thể tạo đơn hàng");
  }
};
