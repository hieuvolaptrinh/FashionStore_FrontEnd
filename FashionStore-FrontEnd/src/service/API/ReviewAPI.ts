
import { API_BASE_URL } from "../../apiConfig";
import { ReviewModel } from "../../models/ReviewModel";
import { request1 } from "../Request";
import { UserModel } from "./UserModel";

// pick: chỉ lấy ra vài thuộc tính của 1 object
// http://localhost:8080/api/review-list/product/{productId}
// api này tự viết ko phải của spring

export async function getReviewsWithUser(productId: number): Promise<
  (Pick<ReviewModel, "reviewId" | "content" | "stars"> & {
    user: Pick<UserModel, "firstName" | "lastName" | "email">;
  })[]
> {
  try {
    console.log(`${API_BASE_URL}/api/review-list/product/${productId}`);

    return await request1<
      {
        reviewId: number;
        content: string;
        stars: number;
        user: { firstName: string; lastName: string; email: string };
      }[]
    >(`${API_BASE_URL}/api/review-list/product/${productId}`);
  } catch (error) {
    console.error("lỗi quần què:", error);

    throw error;
  }
}
