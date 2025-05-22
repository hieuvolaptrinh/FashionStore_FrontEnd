import { useState } from "react";
import { ReviewModel } from "../../../models/ReviewModel";

import ReviewForm from "./ReviewForm";
import { ProductResponse } from "../../../models/ProductModel";
interface InfoProductProps {
  reviews: ReviewModel[];
  product: ProductResponse;
  onReviewAdded: () => void;
}

const InfoProduct: React.FC<InfoProductProps> = ({
  reviews,
  product,
  onReviewAdded,
}) => {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <>
      <div className="bg-light p-30">
        <div className="nav nav-tabs mb-4">
          <button
            className={`nav-item nav-link text-dark ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá
          </button>
          <button
            className={`nav-item nav-link text-dark ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Mô Tả Sản Phẩm
          </button>
          <button
            className={`nav-item nav-link text-dark ${
              activeTab === "information" ? "active" : ""
            }`}
            onClick={() => setActiveTab("productionInfor")}
          >
            Thông Tin Sản Xuất
          </button>
        </div>
        {/* content */}
        <div className="tab-content">
          {activeTab === "reviews" && (
            <>
              <ReviewForm
                productId={product.productId!}
                onReviewSubmitted={onReviewAdded}
              />
              {reviews.length > 0 ? (
                <>
                  {reviews.map((review, index) => (
                    <div key={index} className="media mb-4">
                      <img
                        src={
                          review.avatar
                            ? `data:image/png;base64,${review.avatar}`
                            : "/images/user.jpg"
                        }
                        alt="User Avatar"
                        className="img-fluid mr-3 mt-1"
                        style={{ width: "70px" }}
                        onError={(e) =>
                          (e.currentTarget.src = "/images/user.jpg")
                        }
                      />
                      <div className="media-body">
                        <h6>
                          {review.name}
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
                </>
              ) : (
                <div className="text-center">
                  <h4>Chưa có đánh giá nào cho sản phẩm này</h4>
                </div>
              )}
            </>
          )}

          {activeTab === "description" && (
            <div className="tab-pane fade show active">
              <h4>{product.description}</h4>
            </div>
          )}
          {activeTab === "productionInfor" && (
            <div className="tab-pane fade show active">
              <h4>{product.productionInfor}</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoProduct;
