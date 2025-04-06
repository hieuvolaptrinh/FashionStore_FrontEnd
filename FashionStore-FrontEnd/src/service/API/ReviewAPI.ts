import { API_BASE_URL } from "../../apiConfig";
import { ReviewModel } from "../../models/ReviewModel";

import { UserModel } from "../../models/UserModel";
import RestResponse from "../../models/RestResponse";

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

    // Gọi API và lấy dữ liệu
    const response = await fetch(url);
    const json: RestResponse<
      {
        reviewId: number;
        content: string;
        stars: number;
        user: {
          firstName: string;
          lastName: string;
          email: string;
        };
      }[]
    > = await response.json();

    if (response.ok && json.status === 200) {
      return json.data.map((review) => ({
        reviewId: review.reviewId,
        content: review.content,
        stars: review.stars,
        user: {
          firstName: review.user.firstName,
          lastName: review.user.lastName,
          email: review.user.email,
        },
      }));
    } else {
      throw new Error(json.message || `Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
}
