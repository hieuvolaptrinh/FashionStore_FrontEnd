// src/components/Admin/TopNavbar.tsx
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAvatar } from "../../service/API/UserAPI";

interface NavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const userName = localStorage.getItem("username") || "Hiếu Võ ";
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAvatar()
      .then((avatar) => {
        setAvatar(avatar);
      })
      .catch((error) => {
        console.error("Không có AVATAR", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/login");
  };
  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="px-4 py-0 custom-navbar"
      sticky="top"
    >
      <Navbar.Brand as={Link} to="/" className="d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-user-edit"></i>
        </h2>
      </Navbar.Brand>
      <Button
        variant="link"
        className="sidebar-toggler flex-shrink-0 text-light"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </Button>
      <Form className="d-none d-md-flex ms-4">
        <FormControl
          type="search"
          placeholder="Search"
          className="bg-dark border-0 text-light"
        />
      </Form>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="align-items-center">
          <NavDropdown
            title={
              <>
                <i className="fa fa-bell me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Thông báo</span>
              </>
            }
            id="notification-dropdown"
            className="custom-nav-dropdown"
          >
            <NavDropdown.Item className="custom-dropdown-item">
              <h6>Profile updated</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <NavDropdown.Divider className="bg-light" />
            <NavDropdown.Item className="custom-dropdown-item">
              <h6>New user added</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <NavDropdown.Divider className="bg-light" />
            <NavDropdown.Item className="custom-dropdown-item">
              <h6>Password changed</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <NavDropdown.Divider className="bg-light" />
            <NavDropdown.Item className="text-center custom-dropdown-item">
              See all notifications
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <>
                <img
                  className="rounded-circle me-lg-2"
                  src={
                    avatar
                      ? `data:image/png;base64,${avatar}`
                      : "/images/user.jpg"
                  }
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="d-none d-lg-inline-flex">{userName}</span>
              </>
            }
            id="user-dropdown"
            className="custom-nav-dropdown"
          >
            <NavDropdown.Item className="custom-dropdown-item">
              Cài đặt
            </NavDropdown.Item>
            <NavDropdown.Item
              className="custom-dropdown-item"
              onClick={() => {
                handleLogout();
              }}
            >
              Đăng xuất
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
