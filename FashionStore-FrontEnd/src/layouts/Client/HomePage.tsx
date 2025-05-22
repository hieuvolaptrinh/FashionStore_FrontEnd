import { useParams } from "react-router-dom";

import ListProduct from "../../components/Client/Product/ListProduct";
import Carousel from "./Carousel";
import { useKeyword } from "../../contexts/KeywordContext";
import Trademark from "./Trademark";
import { Col, Container, Row } from "react-bootstrap";
import FilterProduct from "../../components/Client/FilterProduct";

function HomePage() {
  const { keyword } = useKeyword();
  // lấy typeId từ url
  const { typeId } = useParams();
  let typeIdNumber = 0;

  try {
    typeIdNumber = parseInt(typeId + ""); // NaN
  } catch (error) {
    typeIdNumber = 0;
    console.log("error", error);
  }
  if (isNaN(typeIdNumber)) {
    typeIdNumber = 0;
  }

  return (
    <>
      <Carousel />
      {/* <ListProduct keyword={keyword} typeId={typeIdNumber} /> */}
      <Container fluid className="m-3">
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}>
            <FilterProduct />
          </Col>
          <Col lg={9} md={9} sm={12} xs={12}>
            <ListProduct keyword={keyword} typeId={typeIdNumber} />
          </Col>
        </Row>
      </Container>
      <Trademark />
    </>
  );
}
export default HomePage;
