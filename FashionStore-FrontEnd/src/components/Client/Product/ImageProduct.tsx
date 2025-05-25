import React from "react";

interface ImageProductProps {
  icon: string;
  productName: string;
}

export const ImageProduct: React.FC<ImageProductProps> = ({
  icon,
  productName,
}) => {
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
export const AdminImageProduct: React.FC<ImageProductProps> = ({
  icon,
  productName,
}) => {
  return (
    <img
      src={icon}
      alt={productName}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "4px",
      }}
    />
  );
};
