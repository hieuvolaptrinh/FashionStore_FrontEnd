import { API_BASE_URL } from "../../apiConfig";
import { CartModel, CartDetailModel } from "../../models/CartModel";
import RestResponse from "../../models/RestResponse";

export const getCart = async (): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/cart`, {
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

  const response = await fetch(`${API_BASE_URL}/api/v1/cart/cart-detail`, {
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

// get selected cart details by ids
export const getSelectedCartDetails = async (
  ids: number[]
): Promise<CartDetailModel[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  const queryParams = new URLSearchParams();
  ids.forEach((id) => queryParams.append("ids", id.toString()));

  const response = await fetch(
    `${API_BASE_URL}/api/v1/cart/selected?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm đã chọn");
  }

  const result: RestResponse<CartDetailModel[]> = await response.json();
  return result.data || [];
};

export const addToCart = async (
  productId: number,
  quantity: number
): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }
  const url = `${API_BASE_URL}/api/v1/cart/add?productId=${productId}&quantity=${quantity}`;
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
  const url = `${API_BASE_URL}/api/v1/cart/update?cartDetailId=${cartDetailId}&quantity=${quantity}`;
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

  const response = await fetch(
    `${API_BASE_URL}/api/v1/cart/remove/${cartDetailId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng");
  }

  const result: RestResponse<CartModel> = await response.json();
  return result.data;
};
