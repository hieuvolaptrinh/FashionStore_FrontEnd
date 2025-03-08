import React, { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import ImageModel from "../../models/ImageModel";
import { fetchProductImages } from "../../service/API/ImageAPI";

const ProductCard: React.FC<{ product: ProductModel }> = ({ product }) => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loanding, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product || !product.productId) {
      console.warn("Product chưa có ID:", product);
      return;
    }
    fetchProductImages(product.productId)
      .then((result) => {
        setImages(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  console.log("hình ảnh: ", images);
  // lấy hình ảnh đại diện của sản phẩm
  const icon =
    images.find((img) => img.icon === true)?.data || images[0]?.data || null;

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
    <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img
            className="img-fluid w-100"
            src={icon ? `${icon}` : "images/product-4.jpg"}
            alt={product.productName || "Product"}
            style={{
              objectFit: "cover", // Giữ hình ảnh không bị méo
              width: "100%", // Đảm bảo ảnh full khung
              height: "300px", // Chiều cao cố định
            }}
          />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href="">
              <i className="fa fa-shopping-cart"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="">
              <i className="far fa-heart"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="">
              <i className="fa fa-sync-alt"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href="#">
            {product.productName || "Sản phẩm chưa có tên"}
          </a>
          <div className="d-flex flex-column align-items-center justify-content-center mt-2 ">
            {product.originalPrice &&
              product.originalPrice > product.salePrice! && (
                <h6 className="text-muted ml-2">
                  <del>{product.originalPrice.toFixed(2)} vnđ</del>
                </h6>
              )}

            <h5>{product.salePrice?.toFixed(2) || "0.00"} vnđ</h5>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
