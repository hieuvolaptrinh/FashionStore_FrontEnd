import React from "react";

interface ImageProductProps {
  icon: string;
  productName: string;
}

const ImageProduct: React.FC<ImageProductProps> = ({ icon, productName }) => {
  return (
    <img
      src={icon}
      alt={productName}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "300px",
      }}
    />
  );
};

export default ImageProduct;
