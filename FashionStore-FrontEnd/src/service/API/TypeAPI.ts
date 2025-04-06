import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/RestResponse";

import Type from "../../models/Type";

export async function getTypes(): Promise<Type[]> {
  const url = `${API_BASE_URL}/api/v1/products/types`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        errorBody?.message ||
          `HTTP LÔIXXXXXXXXXXXXs! Status: ${response.status}`
      );
    }

    // Parse JSON và gán kiểu
    const json: RestResponse<Type[]> = await response.json();

    if (json.status !== 200) {
      throw new Error(json.error || "Lỗi không xác định từ server.");
    }

    return json.data;
  } catch (error) {
    console.error("Lỗi khi lấy types:", error);
    throw error;
  }
}
