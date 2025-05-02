/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { ProductRequest } from "../../models/ProductModel";
import { UserModel } from "../../models/UserModel";

export async function createProduct(
  product: ProductRequest,
  files: File[]
): Promise<string> {
  const token = localStorage.getItem("token");
  if (!token) {
    return "Bạn chưa đăng nhập!";
  }

  try {
    const formData = new FormData();
    //  JSON với Content-Type ko là lỗi backend ko nhận
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    // Thêm các file hình ảnh (nếu có)
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/v1/products`,
      formData,
      {
        headers: {
          // Axios sẽ tự động đặt multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response:", response.data);
    return "Thêm sản phẩm thành công!";
  } catch (error: any) {
    console.error("API error:", error);
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message; // Điều chỉnh theo cấu trúc lỗi của backend
    }
    return "Có lỗi xảy ra khi thêm sản phẩm!";
  }
}
export async function updateProduct(
  product: ProductRequest,
  files: File[]
): Promise<string> {
  const token = localStorage.getItem("token");
  if (!token) {
    return "Bạn chưa đăng nhập!";
  }

  try {
    const formData = new FormData();
    //  JSON với Content-Type ko là lỗi backend ko nhận
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    // Thêm các file hình ảnh (nếu có)
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/v1/products`,
      formData,
      {
        headers: {
          // Axios sẽ tự động đặt multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response:", response.data);
    return "Thêm sản phẩm thành công!";
  } catch (error: any) {
    console.error("API error:", error);
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message; // Điều chỉnh theo cấu trúc lỗi của backend
    }
    return "Có lỗi xảy ra khi thêm sản phẩm!";
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
