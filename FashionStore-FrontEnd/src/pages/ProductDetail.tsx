import React, { useEffect, useState } from "react";
import ProductModel from "../models/ProductModel";
import ImageModel from "../models/ImageModel";
import { fetchProductImages } from "../service/API/ImageAPI";
import { useParams } from "react-router-dom";
import { getProductById } from "../service/API/ProductAPI";

const ProductDetail: React.FC = () => {
  // lấy productId từ URL
  const { productId } = useParams();
  let productIdNumber = 0;
  try {
    productIdNumber = parseInt(productId + "");
  } catch (error) {
    console.error("Lỗi lấy productId từ URL: ", error);
  }
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [images, setImages] = useState<ImageModel[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchProductImages(productIdNumber)
      .then((res) => {
        setImages(res);
      })
      .catch((error) => {
        setError(error);
      });
    getProductById(productIdNumber)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
          <h2>Gặp lỗi: </h2>
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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        {/* <img src="/images/product-4.jpg" alt="Kids Fashion" /> */}

        {/* hình */}
        <div className="col-lg-5 mb-30">
          <div
            id="product-carousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner bg-light">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                  style={{ width: "100%", height: "500px" }}
                >
                  <img
                    style={{
                      objectFit: "contain", // Giữ hình ảnh không bị méo, hiển thị trọn vẹn
                      width: "100%", // Đảm bảo ảnh full khung
                      maxHeight: "100%", // Chiều cao không vượt quá khung
                    }}
                    className="w-100 h-100"
                    src={`/images/${image.link}`}
                    alt="Product"
                  />
                </div>
              ))}
            </div>
            <button className=" carousel-control-prev" onClick={handlePrev}>
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={{
                  filter:
                    "invert(70%) sepia(100%) saturate(300%) hue-rotate(10deg)",
                }}
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" onClick={handleNext}>
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={{
                  filter:
                    "invert(70%) sepia(100%) saturate(300%) hue-rotate(10deg)",
                }}
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
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
            <h3 className="font-weight-semi-bold mb-4">
              {product.salePrice} vnđ
            </h3>
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
            <div className="d-flex align-items-center mb-4 pt-2">
              <div
                className="input-group quantity mr-3"
                style={{ width: "130px" }}
              >
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-minus">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary border-0 text-center"
                  value="1"
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-plus">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3">
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
            </div>
            <div className="d-flex pt-2">
              <strong className="text-dark mr-2">Share on:</strong>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="text-dark px-2" href="">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <div className="nav nav-tabs mb-4">
              <button
                className={`nav-item nav-link text-dark ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`nav-item nav-link text-dark ${
                  activeTab === "information" ? "active" : ""
                }`}
                onClick={() => setActiveTab("information")}
              >
                Information
              </button>
              <button
                className={`nav-item nav-link text-dark ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (0)
              </button>
            </div>
            <div className="tab-content">
              {activeTab === "description" && (
                <div className="tab-pane fade show active">
                  <h4 className="mb-3">Product Description</h4>
                  <p>Some product description goes here...</p>
                </div>
              )}
              {activeTab === "information" && (
                <div className="tab-pane fade show active">
                  <h4 className="mb-3">Additional Information</h4>
                  <p>Additional product information...</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="tab-pane fade show active">
                  <h4 className="mb-3">Customer Reviews</h4>
                  <p>No reviews yet. Be the first to write one!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
