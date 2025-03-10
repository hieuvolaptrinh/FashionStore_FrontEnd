import React, { useEffect, useState } from "react";

import { ReviewModel } from "../models/ReviewModel";
import { UserModel } from "../service/API/UserModel";
import { getReviewsWithUser } from "../service/API/ReviewAPI";

interface ReviewProps {
  productId: number;
}

const Review: React.FC<ReviewProps> = ({ productId }) => {
  type ReviewWithUser = Pick<ReviewModel, "content" | "stars"> & {
    user: Pick<UserModel, "firstName" | "lastName" | "email">;
  };
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);

  const [loanding, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviewsWithUser(productId)
      .then((result) => {
        setReviews(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <h2>Gặp lỗi: </h2>
        </div>
      </div>
    );
  }
  if (loanding) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {reviews.map((review, index) => (
          <div key={index} className="media mb-4">
            <img
              src="/images/user.jpg"
              alt="Image"
              className="img-fluid mr-3 mt-1"
              style={{ width: "70px" }}
            />
            <div className="media-body">
              <h6>
                {review.user.firstName} {review.user.lastName}
                <small> </small>
              </h6>
              <div className="text-primary mb-2">
                {[...Array(5)].map((_, index) => (
                  <small
                    key={index}
                    className={`fa fa-star ${
                      index < (review.stars || 0)
                        ? "text-primary"
                        : "text-muted"
                    } mr-1`}
                  ></small>
                ))}
                <small>({review.stars ? review.stars : "0"})</small>
              </div>
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Review;
