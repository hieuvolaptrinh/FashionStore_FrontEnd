/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../../apiConfig";
import { ReviewModel } from "../../models/ReviewModel";
import RestResponse from "../../models/RestResponse";
import axios from "axios";

// Lấy danh sách đánh giá của sản phẩm
export async function getReviewsWithUser(
  productId: number
): Promise<ReviewModel[]> {
  try {
    const response = await axios.get<RestResponse<ReviewModel[]>>(
      `${API_BASE_URL}/api/v1/review-list/product/${productId}`
    );
    console.log("Lấy review thành công: ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
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

export const createReview = async (reviewData: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bạn chưa đăng nhập!");
    throw new Error("No token found");
  }
  console.log("reviewData", reviewData);
  console.log("url", `${API_BASE_URL}/api/v1/review-list`);
  try {
    await axios.post(`${API_BASE_URL}/api/v1/review-list`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
