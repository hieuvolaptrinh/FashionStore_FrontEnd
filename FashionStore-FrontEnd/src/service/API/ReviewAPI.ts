import { API_BASE_URL } from "../../apiConfig";
import { ReviewModel } from "../../models/ReviewModel";

import RestResponse from "../../models/RestResponse";
import axios from "axios";

// pick: chỉ lấy ra vài thuộc tính của 1 object
// http://localhost:8080/api/review-list/product/{productId}
// api này tự viết ko phải của spring
export async function getReviewsWithUser(
  productId: number
): Promise<ReviewModel[]> {
  try {
    const response = await axios.get<RestResponse<ReviewModel[]>>(
      `${API_BASE_URL}/api/v1/review-list/product/${productId}`
    );
    console.log("Lấy review thành công: ", response.data.data);
    return response.data.data; // Đã xóa từ khóa "await" không cần thiết
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
}

interface ReviewDTO {
  productId: number;
  stars: number;
  content: string;
}

export const getProductReviews = async (productId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/review-list/product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const createReview = async (reviewData: ReviewDTO) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/review-list`,
      reviewData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Important for sending authentication cookies
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
