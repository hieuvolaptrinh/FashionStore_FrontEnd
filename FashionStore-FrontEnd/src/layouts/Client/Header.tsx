import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}
const Header: React.FC<HeaderProps> = ({ setKeyword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isViOpen, setIsViOpen] = useState(false);
  const [isEnOpen, setIsEnOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  // research product
  const [tmp, setTmp] = useState("");
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTmp(e.target.value); // để ấn search thì mới set keyword
  };

  const handelSearch = () => {
    setKeyword(tmp);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href="">
                About
              </a>
              <a className="text-body mr-3" href="">
                Contact
              </a>
              <a className="text-body mr-3" href="">
                Help
              </a>
              <a className="text-body mr-3" href="">
                FAQs
              </a>
            </div>
          </div>
          {/* đăng kí đăng nhập - đăng xuất */}
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {username ? `Xin chào, ${username}` : "Tài Khoản"}
                </button>
                {isOpen && (
                  <div className="dropdown-menu dropdown-menu-right show">
                    {!username ? (
                      <>
                        <Link to="/login" className="dropdown-item">
                          Đăng nhập
                        </Link>
                        <Link to="/register" className="dropdown-item">
                          Đăng ký
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/profile" className="dropdown-item">
                          👤 Chỉnh sửa thông tin
                        </Link>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
                            localStorage.removeItem("roles");
                            navigate("/login");
                          }}
                        >
                          🚪 Đăng xuất
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  onClick={() => {
                    setIsViOpen(!isViOpen);
                    setIsEnOpen(false); // đóng EN nếu đang mở
                  }}
                >
                  VI
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    isViOpen ? "show" : ""
                  }`}
                >
                  <button className="dropdown-item" type="button">
                    EUR
                  </button>
                  <button className="dropdown-item" type="button">
                    GBP
                  </button>
                  <button className="dropdown-item" type="button">
                    CAD
                  </button>
                </div>
              </div>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  onClick={() => {
                    setIsEnOpen(!isEnOpen);
                    setIsViOpen(false);
                  }}
                >
                  EN
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    isEnOpen ? "show" : ""
                  }`}
                >
                  <button className="dropdown-item" type="button">
                    FR
                  </button>
                  <button className="dropdown-item" type="button">
                    AR
                  </button>
                  <button className="dropdown-item" type="button">
                    RU
                  </button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to={"/"} className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                UTE
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Fashion
              </span>
            </Link>
          </div>
          {/* search */}
          <div className="col-lg-4 col-6 text-left">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm"
                onChange={onSearchInputChange}
                value={tmp}
              />
              <button className="btn " type="submit" onClick={handelSearch}>
                <span className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </span>
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Chăm Sóc Khách Hàng</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
