import React, { useEffect, useState } from "react";
import ProductModel from "../models/ProductModel";

import { useParams } from "react-router-dom";
import { getProductById } from "../service/API/ProductAPI";
import ProductImage from "../components/Client/Product/ProductImage";
import QuantityInput from "../components/Client/Product/QuantityInput";
import { ReviewModel } from "../models/ReviewModel";

import { getReviewsWithUser } from "../service/API/ReviewAPI";
import InforProduct from "../components/Client/Product/InforProduct";
import Carousel from "./Carousel";
import { addToCart } from "../service/API/CartAPI";

const ProductDetail: React.FC = () => {
  // lấy productId từ URL
  const { productId } = useParams();
  let productIdNumber = 0;
  try {
    productIdNumber = parseInt(productId + "");
  } catch (error) {
    console.error("Lỗi lấy productId từ URL: ", error);
  }

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const increaseQuantity = () => {
    if (quantity < (product?.quantity ?? 0)) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    getProductById(productIdNumber)
      .then((res) => {
        console.log("product llaf :", res);
        setProduct(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    getReviewsWithUser(productIdNumber)
      .then((result) => {
        setReviews(result);
        setLoading(false);
        console.log("ktra:", result);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  //  add to cart
  const handleAddToCart = async () => {
    try {
      const response = await addToCart(productIdNumber, quantity);
      alert("Đã thêm sản phâm thành công ");
      console.log(response);
    } catch (error) {
      alert("Không thể thêm sản phẩm vào giỏ hàng" + error);
    }
  };
  if (!product) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <h2>Không tìm thấy sản phẩm</h2>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <h2>Gặp lỗi: {error}</h2>
        </div>
      </div>
    );
  }
  if (loading) {
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
      <Carousel />

      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <ProductImage productId={productIdNumber} />
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product?.productName}</h3>
              <div className="d-flex mb-3">
                {[...Array(5)].map((_, index) => (
                  <small
                    key={index}
                    className={`fa fa-star ${
                      index < (product.avgStars || 0)
                        ? "text-primary"
                        : "text-muted"
                    } mr-1`}
                  ></small>
                ))}
                <small>
                  ({product.avgStars ? Math.round(product.avgStars * 20) : "0"})
                </small>
              </div>
              {/* giá */}
              <div className="d-flex flex-column justify-content-center mt-2 ">
                {product.originalPrice &&
                  product.originalPrice > product.salePrice! && (
                    <h6 className="text-muted ml-2">
                      <del>{product.originalPrice.toFixed(2)} vnđ</del>
                    </h6>
                  )}
                <h3>{product.salePrice?.toFixed(2) || "0.00"} vnđ</h3>
              </div>
              <p className="mb-4">{product.description}</p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Sizes:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-1"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-1">
                      XS
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-2"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-2">
                      S
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-3"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-3">
                      M
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-4"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-4">
                      L
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-5"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-5">
                      XL
                    </label>
                  </div>
                </form>
              </div>
              {/* Số lượng trong csdl */}
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Colors:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-1"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-1">
                      Black
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-2"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-2">
                      White
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-3"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-3">
                      Red
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-4"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-4">
                      Blue
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-5"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-5">
                      Green
                    </label>
                  </div>
                </form>
              </div>
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">
                  Số lượng còn lại: {product.quantity}
                </strong>
              </div>
              <div className="d-flex align-items-center mb-4 pt-2">
                {/* tăng giảm */}
                <QuantityInput
                  quantity={quantity}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
                <button
                  className="btn btn-primary px-3"
                  onClick={handleAddToCart}
                >
                  <i className="fa fa-shopping-cart mr-1"></i> Thêm vào giỏ hàng
                </button>
              </div>

              <div className="d-flex justify-content-center p-4 bg-light text-center">
                <h4
                  className="text-success px-3 py-2"
                  style={{
                    display: "inline-block",
                    border: "2px solid #28a745",
                    borderRadius: "8px",
                    backgroundColor: "rgba(40, 167, 69, 0.1)",
                    boxShadow: "0px 0px 10px rgba(40, 167, 69, 0.5)",
                  }}
                >
                  Tổng tiền tạm tính:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format((product.salePrice ?? 1) * quantity)}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <InforProduct reviews={reviews} product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
