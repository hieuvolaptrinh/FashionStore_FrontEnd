import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { AddressModel } from "../../models/AddressModel";
import {
  OrderModel,
  PaymentType,
  ResponseOrder,
  ShippingMethod,
} from "../../models/OrderModel";

import RestResponse from "../../models/RestResponse";

// begin admin
export async function getAllOrdersAdmin(): Promise<ResponseOrder[]> {
  const token = localStorage.getItem("token") || "";

  const response = await axios.get<RestResponse<ResponseOrder[]>>(
    `${API_BASE_URL}/api/v1/orders/admin`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(" response" + response);

  console.log(" response.data" + response.data);
  const data = response.data.data;

  return data;
}

export const updateOrderStatus = async (orderId: number, status: string) => {
  const token = localStorage.getItem("token") || "";
  await axios.post(
    `${API_BASE_URL}/api/v1/orders/admin/update?orderId=${orderId}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
// end admin

export const getOrderUser = async (): Promise<ResponseOrder[]> => {
  const token = localStorage.getItem("token") || "";
  const response = await axios.get<RestResponse<ResponseOrder[]>>(
    `${API_BASE_URL}/api/v1/orders/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(" response" + response);
  const data = response.data.data;
  return data;
};

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
  console.log("OrderAPI - createAddress called with:", address);

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("OrderAPI - No authentication token found");
    throw new Error("Không tìm thấy token xác thực");
  }

  const payload = {
    streetName: address.streetName,
    cityName: address.cityName,
    districtName: address.districtName,
    wardName: address.wardName,
  };

  console.log("OrderAPI - Sending payload:", payload);

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("OrderAPI - Response status:", response.status);

    if (!response.ok) {
      let errorMessage = "Không thể tạo địa chỉ mới";
      try {
        const errorData = await response.json();
        console.error("OrderAPI - Error response:", errorData);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        console.error("OrderAPI - Could not parse error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    const result: RestResponse<AddressModel> = await response.json();
    console.log("OrderAPI - Successful response data:", result);

    if (!result.data) {
      console.error("OrderAPI - No data in response", result);
      throw new Error("Dữ liệu phản hồi không hợp lệ");
    }

    return result.data;
  } catch (error) {
    console.error("OrderAPI - Error creating address:", error);
    throw error;
  }
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
export const createOrder = async (order: OrderModel) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/orders`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    throw new Error("Không thể tạo đơn hàng: " + err);
  }
};

//
