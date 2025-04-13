import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`sidebar pe-4 pb-3 ${isOpen ? 'd-block' : 'd-none'}`}>
      <Navbar bg="secondary" variant="dark" className="flex-column">
        <Navbar.Brand as={Link} to="/" className="mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-user-edit me-2"></i>DarkPan
          </h3>
        </Navbar.Brand>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="/img/user.jpg"
              alt="User"
              style={{ width: '40px', height: '40px' }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Jhon Doe</h6>
            <span>Admin</span>
          </div>
        </div>
        <Nav className="flex-column w-100">
          <Nav.Link as={Link} to="/" className="nav-item nav-link">
            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
          </Nav.Link>
          <NavDropdown
            title={
              <>
                <i className="fa fa-laptop me-2"></i>Elements
              </>
            }
            id="elements-dropdown"
          >
            <NavDropdown.Item as={Link} to="/elements/buttons">Buttons</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/typography">Typography</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/elements/other">Other Elements</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/widgets">
            <i className="fa fa-th me-2"></i>Widgets
          </Nav.Link>
          <Nav.Link as={Link} to="/forms">
            <i className="fa fa-keyboard me-2"></i>Forms
          </Nav.Link>
          <Nav.Link as={Link} to="/tables">
            <i className="fa fa-table me-2"></i>Tables
          </Nav.Link>
          <Nav.Link as={Link} to="/charts">
            <i className="fa fa-chart-bar me-2"></i>Charts
          </Nav.Link>
          <NavDropdown
            title={
              <>
                <i className="far fa-file-alt me-2"></i>Pages
              </>
            }
            id="pages-dropdown"
          >
            <NavDropdown.Item as={Link} to="/signin">Sign In</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/signup">Sign Up</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/404">404 Error</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/blank">Blank Page</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Sidebar;