import React from "react";
import Product from "../models/Product";
import ProductCard from "./components/ProductCard";

const ListProduct: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Áo thun nam",
      description: "Áo thun nam hàng hiệu",
      originalPrice: 200000,
      price: 150000,
      imageUrl: "./images/product-1.jpg",
    },
    {
      id: 2,
      title: "Áo sơ mi nam",
      description: "Áo sơ mi nam hàng hiệu",
      originalPrice: 300000,
      price: 250000,
      imageUrl: "./images/product-1.jpg",
    },
  ];
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
export default ListProduct;
