import { API_CONFIG } from "../../apiConfig";
import { ReviewModel } from "../../models/ReviewModel";
import { request1 } from "../Request";
import { UserModel } from "./UserModel";

// pick: chỉ lấy ra vài thuộc tính của 1 object
export async function getReviewsWithUser(productId: number): Promise<
  (Pick<ReviewModel, "reviewId" | "content" | "stars"> & {
    user: Pick<UserModel, "firstName" | "lastName" | "email">;
  })[]
> {
  const response = await request1<{ _embedded: { reviews: ReviewModel[] } }>(
    `${API_CONFIG.products}/${productId}/listReviews`,
    "GET"
  );

  const reviews = response._embedded?.reviews || [];

  // Duyệt từng review để lấy user
  const reviewsWithUser = await Promise.all(
    reviews.map(async (review) => {
      const userResponse = await request1<UserModel>(
        review._links.user.href,
        "GET"
      );

      return {
        reviewId: review.reviewId,
        content: review.content,
        stars: review.stars,
        user: {
          firstName: userResponse.firstName,
          lastName: userResponse.lastName,
          email: userResponse.email,
        },
      };
    })
  );

  return reviewsWithUser;
}
