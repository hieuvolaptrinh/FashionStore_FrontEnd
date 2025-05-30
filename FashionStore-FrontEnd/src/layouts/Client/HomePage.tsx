import ListProduct from "../../components/Client/Product/ListProduct";
import Carousel from "./Carousel";
import { useKeyword } from "../../contexts/KeywordContext";

import { Col, Container, Row } from "react-bootstrap";
import FilterProduct from "../../components/Client/FilterProduct";
import { useState } from "react";

function HomePage() {
  const { keyword } = useKeyword(); //context nên bỏ luôn vào thằng filter rồi
  // lấy typeId từ url
  // const { typeId } = useParams();
  // let typeIdNumber = 0;
  const [typeIds, setTypeIds] = useState<number[]>([]);

  return (
    <>
      <Carousel />
      {/* <ListProduct keyword={keyword} typeId={typeIdNumber} /> */}
      <Container fluid className="m-3">
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}>
            <FilterProduct selectedTypeIds={typeIds} onChange={setTypeIds} />
          </Col>
          <Col lg={9} md={9} sm={12} xs={12}>
            <ListProduct keyword={keyword} typeIds={typeIds} />
          </Col>
        </Row>
      </Container>
      {/* <Trademark /> */}
    </>
  );
}
export default HomePage;
