import React, { useState } from "react";
import { Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import { createReview } from "../../../service/API/ReviewAPI";

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError("Vui lòng chọn số sao đánh giá");
      return;
    }
    if (!content.trim()) {
      setError("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const reviewData = {
        productId: productId,
        stars: rating,
        content: content.trim(),
      };

      await createReview(reviewData);

      // Reset form
      setRating(0);
      setContent("");

      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      // Show success message
      alert("Đánh giá của bạn đã được gửi thành công!");
    } catch (err) {
      setError("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau." + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form bg-white p-4 rounded shadow-sm mb-4">
      <h4 className="mb-4">Đánh giá sản phẩm</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label d-block">Đánh giá của bạn</label>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
              setError("");
            }}
            precision={1}
            size="large"
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="review-content" className="form-label">
            Nội dung đánh giá
          </label>
          <textarea
            id="review-content"
            className="form-control"
            rows={4}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
            }}
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Đang gửi...
            </>
          ) : (
            "Gửi đánh giá"
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
