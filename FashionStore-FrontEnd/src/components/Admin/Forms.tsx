import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Forms: React.FC = () => {
  return (
    <Container fluid>
      <Row className="g-4">
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Basic Form</h6>
            <Form>
              <Form.Group className="mb-3" controlId="exampleInputEmail1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" aria-describedby="emailHelp" />
                <Form.Text id="emailHelp">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleInputPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleCheck1">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Form>
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Horizontal Form</h6>
            <Form>
              <Row className="mb-3">
                <Form.Label column sm={2} className="col-form-label">
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label column sm={2} className="col-form-label">
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Forms;