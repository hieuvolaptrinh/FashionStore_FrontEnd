/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import GenericTable from "../../GenericTable";
import AddProductForm from "./AddProductForm";
import { getAllProducts } from "../../../service/API/ProductAPI";

import { Pagination, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import Type from "../../../models/TypeModel";
import { ProductResponse } from "../../../models/ProductModel";
import { AdminImageProduct } from "../../Client/Product/ImageProduct";

const ProductManagement: React.FC = () => {
  // State quản lý danh sách sản phẩm và modal
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductResponse | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageIndexes, setImageIndexes] = useState<{ [key: number]: number }>(
    {}
  );

  // Lấy danh sách sản phẩm khi component mount hoặc currentPage thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPage = await getAllProducts(currentPage);
        setProducts(productPage.content);
        setTotalPages(productPage.totalPages);
        // Khởi tạo index cho slider ảnh
        const initialIndexes = productPage.content.reduce((acc, product) => {
          if (product.productId) {
            acc[product.productId] = 0;
          }
          return acc;
        }, {} as { [key: number]: number });
        setImageIndexes(initialIndexes);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        alert("Lỗi khi lấy danh sách sản phẩm!");
      }
    };
    fetchProducts();
  }, [currentPage, showModal]);

  // Xử lý thêm sản phẩm mới
  const handleAddProduct = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  // Xử lý sửa sản phẩm
  const handleEditProduct = (product: ProductResponse) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  // Xử lý chuyển ảnh
  const handleImageChange = (productId: number, direction: "prev" | "next") => {
    setImageIndexes((prev) => {
      const currentIndex = prev[productId] || 0;
      const product = products.find((p) => p.productId === productId);
      const maxIndex = (product?.listImages?.length || 1) - 1;

      let newIndex;
      if (direction === "prev") {
        newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
      } else {
        newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
      }

      return { ...prev, [productId]: newIndex };
    });
  };

  // Định nghĩa các cột cho bảng
  const columns = [
    { header: "ID", accessor: "productId" },
    { header: "Tên sản phẩm", accessor: "productName" },
    { header: "Mô tả", accessor: "description" },
    {
      header: "Giá gốc",
      accessor: (product: ProductResponse) =>
        `${product.originalPrice?.toLocaleString() || 0}đ`,
    },
    {
      header: "Giá sale",
      accessor: (product: ProductResponse) =>
        `${product.salePrice?.toLocaleString() || 0}đ`,
    },
    { header: "Số lượng", accessor: "quantity" },
    {
      header: "Loại sản phẩm",
      accessor: (product: ProductResponse) =>
        product.listTypes?.map((type: Type) => type.typeName).join(", ") ||
        "Chưa có loại",
    },
    {
      header: "Hình ảnh",
      accessor: (product: ProductResponse) => {
        const currentIndex = imageIndexes[product.productId!] || 0;
        const images = product.listImages || [];

        // Kiểm tra nếu không có hình ảnh
        if (!images || images.length === 0) {
          return (
            <div
              style={{
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
              }}
            >
              Không có ảnh
            </div>
          );
        }

        // Đảm bảo currentIndex hợp lệ
        const validIndex = Math.min(currentIndex, images.length - 1);

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              position: "relative",
              width: "100px",
              height: "100px",
            }}
          >
            {images.length > 1 && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageChange(product.productId!, "prev");
                }}
                sx={{
                  position: "absolute",
                  left: 0,
                  zIndex: 1,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>
            )}
            <AdminImageProduct
              icon={images[validIndex].link || ""}
              productName={`product-${validIndex}`}
            />
            {images.length > 1 && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageChange(product.productId!, "next");
                }}
                sx={{
                  position: "absolute",
                  right: 0,
                  zIndex: 1,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            )}
          </div>
        );
      },
    },
  ];

  // Định nghĩa các nút hành động
  const actions = (product: ProductResponse) => (
    <>
      <Button
        variant="warning"
        size="sm"
        className="me-2"
        onClick={() => handleEditProduct(product)}
      >
        Sửa
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleDeleteProduct(product.productId!)}
      >
        Xóa
      </Button>
    </>
  );

  const handleDeleteProduct = (productId: number) => {
    console.log("Xóa sản phẩm:", productId);
    alert(`Đã xóa sản phẩm #${productId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản Lý Sản Phẩm</h2>
      <Button variant="primary" className="mb-3" onClick={handleAddProduct}>
        Thêm Sản Phẩm
      </Button>
      <GenericTable
        data={products}
        columns={columns}
        rowKey="productId"
        actions={actions}
      />
      <div className="d-flex justify-content-center mt-3">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </div>
      <AddProductForm
        show={showModal}
        onHide={() => setShowModal(false)}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default ProductManagement;
