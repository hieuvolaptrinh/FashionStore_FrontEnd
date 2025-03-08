import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductModel from "../models/ProductModel";
import { getAllProducts } from "../API/ProductAPI";
import { Pagination } from "./../components/Pagination";

const ListProduct: React.FC = () => {
  const [listProduct, setListProduct] = useState<ProductModel[]>([]);
  const [loanding, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();

  // pagination
  const onPageChange = (page: number) => setCurrentPage(page);

  // lấy dữ liệu
  useEffect(
    () => {
      getAllProducts(currentPage)
        .then((result) => {
          setListProduct(result.products);
          setTotalPages(result.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    },
    [currentPage] // chạy 1 lần duy nhất khi component được render
  );

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

  if (error) {
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <h2>Gặp lỗi :{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          {listProduct.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages ?? 0}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};
export default ListProduct;
