import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { CartModel, CartDetailModel } from "../../models/CartModel";
import RestResponse from "../../models/RestResponse";

export const getCart = async (): Promise<CartModel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  try {
    const response = await axios.get<RestResponse<CartModel>>(
      `${API_BASE_URL}/api/v1/carts`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Không thể lấy thông tin giỏ hàng" + error);
  }
};

export const getCartDetails = async (): Promise<CartDetailModel[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token xác thực");
  }

  try {
    const response = await axios.get<RestResponse<CartDetailModel[]>>(
      `${API_BASE_URL}/api/v1/carts/cart-detail`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Không thể lấy chi tiết giỏ hàng" + error);
  }
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

  try {
    const response = await axios.get<RestResponse<CartDetailModel[]>>(
      `${API_BASE_URL}/api/v1/carts/selected?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data || [];
  } catch (error) {
    throw new Error("Không thể lấy danh sách sản phẩm đã chọn" + error);
  }
};

export const addToCart = async (productId: number, quantity: number) => {
  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}/api/v1/carts/add?productId=${productId}&quantity=${quantity}`;
  await axios.post(
    url,
    { productId, quantity },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateCartItem = async (
  cartDetailId: number,
  quantity: number
) => {
  const token = localStorage.getItem("token");

  const url = `${API_BASE_URL}/api/v1/carts/update?cartDetailId=${cartDetailId}&quantity=${quantity}`;
  try {
    await axios.put(url, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm vào giỏ hàng:", error);
    throw error; // Có thể ném lại lỗi nếu cần xử lý thêm ở nơi gọi hàm này
  }
};

export const removeFromCart = async (cartDetailId: number) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_BASE_URL}/api/v1/carts/remove/${cartDetailId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
