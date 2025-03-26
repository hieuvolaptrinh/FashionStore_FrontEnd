import { API_BASE_URL } from "../../apiConfig";
import Type from "../../models/Type";
import { request } from "../Request";

export async function getTypes(): Promise<Type[]> {
  try {
    const response = await request<Type[]>(`${API_BASE_URL}/api/v1/products/types`);

    const data = response.map(
      (item: Type) => new Type(item.typeId, item.typeName)
    );

    return data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching types:", error);
    throw error; // Rethrow lỗi để caller có thể xử lý nếu cần
  }
}
