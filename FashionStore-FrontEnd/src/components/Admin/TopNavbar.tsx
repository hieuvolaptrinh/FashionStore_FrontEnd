import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <Navbar
      expand="lg"
      bg="secondary"
      variant="dark"
      sticky="top"
      className="px-4 py-0"
    >
      <Navbar.Brand as={Link} to="/" className="d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-user-edit"></i>
        </h2>
      </Navbar.Brand>
      <Button
        variant="link"
        className="sidebar-toggler flex-shrink-0"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </Button>
      <Form className="d-none d-md-flex ms-4">
        <FormControl
          type="search"
          placeholder="Search"
          className="bg-dark border-0"
        />
      </Form>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="align-items-center">
          <NavDropdown
            title={
              <>
                <i className="fa fa-envelope me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Message</span>
              </>
            }
            id="message-dropdown"
          >
            {[...Array(3)].map((_, i: number) => (
              <NavDropdown.Item key={i}>
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="/img/user.jpg"
                    alt="User"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0">Jhon sent you a message</h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-center">
              See all messages
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <i className="fa fa-bell me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Notification</span>
              </>
            }
            id="notification-dropdown"
          >
            <NavDropdown.Item>
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-center">
              See all notifications
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <img
                  className="rounded-circle me-lg-2"
                  src="/img/user.jpg"
                  alt="User"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="d-none d-lg-inline-flex">John Doe</span>
              </>
            }
            id="user-dropdown"
          >
            <NavDropdown.Item>My Profile</NavDropdown.Item>
            <NavDropdown.Item>Settings</NavDropdown.Item>
            <NavDropdown.Item>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
