/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import GenericTable from "../../GenericTable";
import AddProductForm from "./AddProductForm";
import { getAllProducts } from "../../../service/API/ProductAPI";
import ProductModel from "../../../models/ProductModel";
import { Pagination, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ProductManagement: React.FC = () => {
  // State quản lý danh sách sản phẩm và modal
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductModel | null>(null);
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
  }, [currentPage]);

  // Xử lý thêm sản phẩm mới
  const handleAddProduct = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  // Xử lý sửa sản phẩm
  const handleEditProduct = (product: ProductModel) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        // TODO: Gọi API xóa sản phẩm
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
        alert("Xóa sản phẩm thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Lỗi khi xóa sản phẩm!");
      }
    }
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
      accessor: (product: ProductModel) =>
        `${product.originalPrice?.toLocaleString() || 0}đ`,
    },
    {
      header: "Giá sale",
      accessor: (product: ProductModel) =>
        `${product.salePrice?.toLocaleString() || 0}đ`,
    },
    { header: "Số lượng", accessor: "quantity" },
    {
      header: "Loại sản phẩm",
      accessor: (product: ProductModel) =>
        product.listTypes?.map((typeId: number) => typeId).join(", ") ||
        "Chưa có loại",
    },
    {
      header: "Hình ảnh",
      accessor: (product: ProductModel) => {
        const currentIndex = imageIndexes[product.productId!] || 0;
        const images = product.listImages || [];

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
            <img
              src={images[currentIndex]}
              alt={`product-${currentIndex}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "4px",
              }}
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
  const actions = (product: ProductModel) => (
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
        onSave={(product) => {
          if (productToEdit) {
            // Cập nhật sản phẩm
            setProducts(
              products.map((p) =>
                p.productId === product.productId ? product : p
              )
            );
          } else {
            // Thêm sản phẩm mới
            setProducts([...products, product]);
          }
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default ProductManagement;
