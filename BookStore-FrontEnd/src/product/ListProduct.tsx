import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductModel from "../models/ProductModel";
import { getAllProducts, searchProduct } from "../service/API/ProductAPI";
import { Pagination } from "./../components/Pagination";

// interface ListProductProps {
//   keyword: string;
// }
function ListProduct(props: { keyword: string }) {
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
      if (props.keyword === "") {
        console.log("không có tìm kiếm");
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
      } else {
        console.log("có tìm kiếm");
        console.log(props.keyword);
        searchProduct(props.keyword)
          .then((result) => {
            setListProduct(result.products);
            setTotalPages(result.totalPages);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }
    },
    [currentPage, props.keyword] // chạy 1 lần duy nhất khi component được render, khi currentPage hoặc keyword thay đổi thì chạy lại
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
          <h2>Gặp lỗi </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          {listProduct.length != 0 ? (
            listProduct.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <div className="d-flex justify-content-center mt-5">
              <h2>Không tìm thấy sản phẩm</h2>
            </div>
          )}
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
}
export default ListProduct;
