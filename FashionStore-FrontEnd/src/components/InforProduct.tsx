import React, { useState } from "react";
import ProductModel from "../models/ProductModel";
import { ReviewModel } from "../models/ReviewModel";
import { UserModel } from "../models/UserModel";

type ReviewWithUser = Pick<ReviewModel, "content" | "stars"> & {
  user: Pick<UserModel, "firstName" | "lastName" | "email">;
};
interface InforProductProps {
  product: ProductModel;
  reviews: ReviewWithUser[];
}

const InforProduct: React.FC<InforProductProps> = ({ reviews, product }) => {
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

export default InforProduct;
