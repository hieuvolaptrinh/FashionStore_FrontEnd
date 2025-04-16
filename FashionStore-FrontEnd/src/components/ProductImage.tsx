import React, { useEffect, useState } from "react";

import ImageModel from "../models/ImageModel";
import { fetchProductImages } from "../service/API/ImageAPI";

interface ProductImageProps {
  productId: number;
}

const ProductImage: React.FC<ProductImageProps> = ({ productId }) => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProductImages(productId)
      .then((res) => {
        setImages(res);
      })
      .catch((error) => console.error("Lỗi lấy hình ảnh: ", error));
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Tự động chuyển ảnh sau 3 giây

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="row ">
        {/* Ảnh lớn */}

        <div className="border p-3 shadow-sm rounded position-relative">
          {images.length > 0 && (
            <img
              src={`/images/${images[currentIndex].link}`}
              alt=""
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          )}

          {/* Nút chuyển ảnh */}
          <button
            className="btn btn-dark position-absolute"
            style={{
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
            }}
            onClick={prevImage}
          >
            ❮
          </button>
          <button
            className="btn btn-dark position-absolute"
            style={{
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
            onClick={nextImage}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Danh sách ảnh nhỏ */}
      <div className="row justify-content-center mt-3">
        <div className="col-md-8 d-flex justify-content-center">
          {images.map((img, index) => (
            <div
              key={index}
              className="mx-2"
              onClick={() => setCurrentIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`/images/${img.link}`}
                alt=""
                className={`img-thumbnail ${
                  currentIndex === index ? "border-primary" : ""
                }`}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImage;
