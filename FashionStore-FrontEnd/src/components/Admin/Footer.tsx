import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <Container fluid className="pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <Row>
          <Col xs={12} sm={6} className="text-center text-sm-start">
            © <a href="#">Võ Nguyễn Đại Hiếu</a>, All Rights Reserved.
          </Col>
          <Col xs={12} sm={6} className="text-center text-sm-end">
            Designed By Hiếu Võ
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Footer;