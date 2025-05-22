import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductNeedCard from "./ProductNeedCard";
import FilterProduct from "../FilterProduct";
import { dataFake } from "./productneed";
import ProductNeedInfor from "./ProductNeedInfor";
import RegisterProduction from "./RegisterProduction";
import { ProductNeed } from "./productneed";
import { Pagination, Box } from "@mui/material";

const ListProductNeed: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductNeed | null>(
    null
  );
  const [openDetail, setOpenDetail] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  const handleViewDetail = (product: ProductNeed) => {
    setSelectedProduct(product);
    setOpenDetail(true);
  };

  const handleRegister = (product: ProductNeed) => {
    setSelectedProduct(product);
    setOpenRegister(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedProduct(null);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Calculate pagination
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dataFake.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(dataFake.length / productsPerPage);

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} md={3} className="mb-4 mb-md-0">
          <FilterProduct />
        </Col>
        <Col xs={12} md={9}>
          <Row>
            {currentProducts.map((product) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
                key={product.id}
              >
                <ProductNeedCard
                  product={product}
                  onViewDetail={() => handleViewDetail(product)}
                  onRegister={() => handleRegister(product)}
                />
              </Col>
            ))}
          </Row>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </Col>
      </Row>

      <ProductNeedInfor
        open={openDetail}
        onClose={handleCloseDetail}
        product={selectedProduct}
      />

      <RegisterProduction
        open={openRegister}
        onClose={handleCloseRegister}
        product={selectedProduct}
      />
    </Container>
  );
};

export default ListProductNeed;
