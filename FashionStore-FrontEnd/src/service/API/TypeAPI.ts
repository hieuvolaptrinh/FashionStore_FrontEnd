import { API_BASE_URL } from "../../apiConfig";
import { request } from "../Request";
import Type from "../../models/Type";

export async function getTypes(): Promise<Type[]> {
  try {
    const response = await request<Type[]>(
      `${API_BASE_URL}/api/v1/products/types`
    );

    // Trả về trực tiếp dữ liệu nhận được từ API mà không cần tạo mới đối tượng
    return response;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching types:", error);
    throw error; // Rethrow lỗi để caller có thể xử lý nếu cần
  }
}
