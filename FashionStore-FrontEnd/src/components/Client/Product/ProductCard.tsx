import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageProduct from "./ImageProduct";
import { fetchProductImages } from "../../../service/API/ImageAPI";
import { ProductResponse } from "../../../models/ProductModel";
import ImageModel from "../../../models/ImageModel";
import { addToCart } from "../../../service/API/CartAPI";

const ProductCard: React.FC<{ product: ProductResponse }> = ({ product }) => {
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
    images.find((img) => img.icon === true)?.link || images[0]?.link || null;
  if (error) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <h2>Gặp lỗi: </h2>
        </div>
      </div>
    );
  }
  const productId = product.productId !== undefined ? product.productId : 0;
  const handleAddToCart = async () => {
    try {
      const response = await addToCart(productId, 1);
      alert("Đã thêm sản phâm thành công vào giỏ hàng ");
      console.log(response);
    } catch (error) {
      alert("Không thể thêm sản phẩm vào giỏ hàng" + error);
    }
  };
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
    <div className="col-lg-3 col-md-6 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          {/* ảo giác vl phải tạo component */}
          <ImageProduct
            icon={icon || ""}
            productName={product.productName || ""}
          />
          {/* <img
            className="img-fluid w-100"
            src={icon ? `${icon}` : "/images/product-4.jpg"}
            alt={product.productName || "Product"}
            style={{
              objectFit: "cover", // Giữ hình ảnh không bị méo
              width: "100%", // Đảm bảo ảnh full khung
              height: "300px", // Chiều cao cố định
            }}
          /> */}
          <div className="product-action">
            <button
              className="btn btn-outline-dark btn-square"
              onClick={handleAddToCart}
            >
              <i className="fa fa-shopping-cart"></i>
            </button>
            <a className="btn btn-outline-dark btn-square" href="">
              <i className="far fa-heart"></i>
            </a>
            <a className="btn btn-outline-dark btn-square" href="">
              <i className="fa fa-sync-alt"></i>
            </a>
            <Link
              className="btn btn-outline-dark btn-square"
              // to={`product/${product.productId}`}
              to={`/products/${product.productId}`} // Sử dụng dấu "/" để chỉ định đường dẫn tuyệt đối
            >
              <i className="fa-solid fa-circle-info"></i>
            </Link>
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
