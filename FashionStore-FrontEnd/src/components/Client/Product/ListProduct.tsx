import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductResponse } from "../../../models/ProductModel";
import { getAllProducts, searchProduct } from "../../../service/API/ProductAPI";
import { Pagination } from "@mui/material";

interface ListProductProps {
  keyword: string;
  typeId: number;
}
function ListProduct({ keyword, typeId }: ListProductProps) {
  const [listProduct, setListProduct] = useState<ProductResponse[]>([]);
  const [loanding, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();

  // lấy dữ liệu
  useEffect(() => {
    if (keyword === "" && typeId === 0) {
      console.log("không có tìm kiếm và không có typeId");
      getAllProducts(currentPage)
        .then((result) => {
          setListProduct(result.content);
          setTotalPages(result.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      console.log("có tìm kiếm");
      console.log(keyword);
      searchProduct(keyword, typeId)
        .then((result) => {
          setListProduct(result.content);
          setTotalPages(result.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          console.log("lỗi chỗ này " + error.message);
          setLoading(false);
        });
    }
  }, [currentPage, keyword, typeId]);

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
          <h2>Gặp lỗi {error} </h2>
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
            count={totalPages} //Số lượng tổng các trang
            page={currentPage} //  Trang hiện tại (controlled component)
            onChange={(_, page) => setCurrentPage(page)}
            color="primary" //  Màu sắc của nút (theo theme: primary, secondary...)
            showFirstButton //  Hiện nút "về trang đầu"
            showLastButton //  Hiện nút "tới trang cuối"
            size="large"
          />
        </div>
      </div>
    </>
  );
}
export default ListProduct;
