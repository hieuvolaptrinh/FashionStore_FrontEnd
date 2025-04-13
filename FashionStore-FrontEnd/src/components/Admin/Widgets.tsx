import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

interface Task {
  text: string;
  checked: boolean;
}

const Widgets: React.FC = () => {
  const tasks: Task[] = [
    { text: "Short task goes here...", checked: false },
    { text: "Short task goes here...", checked: false },
    { text: "Short task goes here...", checked: true },
    { text: "Short task goes here...", checked: false },
    { text: "Short task goes here...", checked: false },
  ];

  return (
    <Container fluid>
      <Row className="g-4">
        <Col sm={12} md={6} xl={4}>
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">Messages</h6>
              <a href="#">Show All</a>
            </div>
            {[...Array(4)].map((_, i: number) => (
              <div
                key={i}
                className={`d-flex align-items-center ${
                  i < 3 ? "border-bottom" : ""
                } py-3`}
              >
                <img
                  className="rounded-circle flex-shrink-0"
                  src="/img/user.jpg"
                  alt="User"
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">Jhon Doe</h6>
                    <small>15 minutes ago</small>
                  </div>
                  <span>Short message goes here...</span>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col sm={12} md={6} xl={4}>
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Calendar</h6>
              <a href="#">Show All</a>
            </div>
            <div id="calender">Calendar Placeholder</div>
          </div>
        </Col>
        <Col sm={12} md={6} xl={4}>
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">To Do List</h6>
              <a href="#">Show All</a>
            </div>
            <div className="d-flex mb-2">
              <input
                className="form-control bg-transparent"
                type="text"
                placeholder="Enter task"
              />
              <button type="button" className="btn btn-primary ms-2">
                Add
              </button>
            </div>
            {tasks.map((task, i) => (
              <div
                key={i}
                className={`d-flex align-items-center ${
                  i < 4 ? "border-bottom" : ""
                } py-2`}
              >
                <input
                  className="form-check-input m-0"
                  type="checkbox"
                  defaultChecked={task.checked}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>
                      {task.checked ? <del>{task.text}</del> : task.text}
                    </span>
                    <button className="btn btn-sm">
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Testimonial</h6>
            <Carousel>
              {[...Array(2)].map((_, i: number) => (
                <Carousel.Item key={i}>
                  <div className="testimonial-item text-center">
                    <img
                      className="img-fluid rounded-circle mx-auto mb-4"
                      src={`/img/testimonial-${i + 1}.jpg`}
                      style={{ width: "100px", height: "100px" }}
                      alt="Testimonial"
                    />
                    <h5 className="mb-1">Client Name</h5>
                    <p>Profession</p>
                    <p className="mb-0">
                      Dolor et eos labore, stet justo sed est sed. Diam sed sed
                      dolor stet amet eirmod eos labore diam
                    </p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <iframe
              className="position-relative rounded w-100 h-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              style={{
                filter: "grayscale(100%) invert(92%) contrast(83%)",
                border: "0",
              }}
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Widgets;
