import { API_BASE_URL } from "../../apiConfig";
import { ReviewModel } from "../../models/ReviewModel";
import { request } from "../Request";
import { UserModel } from "../../models/UserModel";

// pick: chỉ lấy ra vài thuộc tính của 1 object
// http://localhost:8080/api/review-list/product/{productId}
// api này tự viết ko phải của spring

export async function getReviewsWithUser(productId: number): Promise<
  (Pick<ReviewModel, "reviewId" | "content" | "stars"> & {
    user: Pick<UserModel, "firstName" | "lastName" | "email">;
  })[]
> {
  try {
    const url = `${API_BASE_URL}/api/v1/review-list/product/${productId}`;

    return await request<
      {
        reviewId: number;
        content: string;
        stars: number;
        user: { firstName: string; lastName: string; email: string };
      }[]
    >(url);
  } catch (error) {
    console.error("lỗi quần què:", error);

    throw error;
  }
}
