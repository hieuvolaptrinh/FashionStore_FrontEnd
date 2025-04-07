import { CartModel, CartDetailModel } from "../../models/CartModel";
import RestResponse from "../../models/RestResponse";

const API_URL = "http://localhost:8080/api/v1";

export const getCart = async (): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const response = await fetch(`${API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy thông tin giỏ hàng");
  }

  const result: RestResponse<CartModel> = await response.json();
  return result.data;
};

export const getCartDetails = async (): Promise<CartDetailModel[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const response = await fetch(`${API_URL}/cart/cart-detail`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy chi tiết giỏ hàng");
  }

  const result: RestResponse<CartDetailModel[]> = await response.json();
  return result.data;
};

export const addToCart = async (
  productId: number,
  quantity: number
): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }
  const url = `${API_URL}/cart/add?productId=${productId}&quantity=${quantity}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
  }

  const result: RestResponse<CartModel> = await response.json();
  return result.data;
};

export const updateCartItem = async (
  cartDetailId: number,
  quantity: number
): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }
  const url = `${API_URL}/cart/update?cartDetailId=${cartDetailId}&quantity=${quantity}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật giỏ hàng");
  }

  const result: RestResponse<CartModel> = await response.json();
  return result.data;
};

export const removeFromCart = async (
  cartDetailId: number
): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const response = await fetch(`${API_URL}/cart/remove/${cartDetailId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng");
  }

  const result: RestResponse<CartModel> = await response.json();
  return result.data;
};
