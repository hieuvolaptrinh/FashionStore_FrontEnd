import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/RestResponse";
import Type from "../../models/TypeModel";

export async function getTypes(): Promise<Type[]> {
  const url = `${API_BASE_URL}/api/v1/products/types`;
  try {
    const response = await axios.get<RestResponse<Type[]>>(url);
    if (response.data.status !== 200) {
      throw new Error(response.data.error || "Lỗi không xác định từ server.");
    }
    return response.data.data; // .data ở lần đầu vì cái json của axios nó cũng có data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Lỗi từ API:", error.response?.data);
    } else {
      console.error("Lỗi không xác định:", error);
    }
    throw error;
  }
}
