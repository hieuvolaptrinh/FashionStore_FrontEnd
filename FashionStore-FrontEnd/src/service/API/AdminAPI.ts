import { API_BASE_URL } from "../../apiConfig";
import { UserModel } from "../../models/UserModel";

interface ProductProps {
  productName: string;
  description: string;
  originalPrice: number;
  productionInfor: string;
  salePrice: number;
  quantity: number;
  manufactureDate: string;
  listTypes: number[];
  listImages: string[];
}

export async function createProduct(product: ProductProps): Promise<string> {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return "Bạn chưa đăng nhập!";
  }
  const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    return "Thêm sản phẩm thành công!";
  } else {
    const errorJson = await response.json();
    return errorJson.message || "Có lỗi xảy ra!";
  }
}
export const getAllUsers = async (): Promise<UserModel[]> => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error("Lỗi khi lấy danh sách người dùng:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return [];
  }
};

export const lockAccount = async (userId: number): Promise<void> => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/user/lock/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Lỗi khi xóa người dùng!");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
