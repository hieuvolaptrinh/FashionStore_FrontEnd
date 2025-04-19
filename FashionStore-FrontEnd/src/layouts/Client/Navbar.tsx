import { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import Type from "../../models/Type";
import { getTypes } from "../../service/API/TypeAPI";

function Navbar() {
  const [isVerticalOpen, setIsVerticalOpen] = useState(false);

  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    getTypes()
      .then((data) => {
        console.log("lấy data thành công:", data);
        setTypes(data);
      })
      .catch((error) => {
        console.error("ddLỗi khi lấy dữ liệu:", error.message);
      });
  }, []);
  return (
    <>
      {/* navbar */}
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <button
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              style={{ height: "65px", padding: "0 30px" }}
            >
              <h6 className="text-dark m-0">
                <i
                  className="fa fa-bars mr-2"
                  onClick={() => setIsVerticalOpen(!isVerticalOpen)}
                ></i>
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sản phẩm bán chạy
                </Link>
              </h6>
              <i
                className="fa fa-angle-down text-dark"
                onClick={() => setIsVerticalOpen(!isVerticalOpen)}
              ></i>
            </button>
            {isVerticalOpen && (
              <nav
                className="position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                style={{ width: "calc(100% - 30px)", zIndex: 999 }}
              >
                <div className="navbar-nav w-100">
                  {types.map((type) => (
                    // sử dụng link thay cho a để không load lại trang trong react router
                    <Link
                      key={type.typeId}
                      to={"/" + type.typeId?.toString() || ""}
                      className="nav-item nav-link"
                    >
                      {type.typeName}
                    </Link>
                  ))}
                </div>
              </nav>
            )}
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  UTE
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Fashion
                </span>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <NavLink to="/" className="nav-item nav-link ">
                    Trang Chủ
                  </NavLink>

                  <NavLink to="/product/1" className="nav-item nav-link">
                    Chi Tiết Sản Phẩm
                  </NavLink>
                  <NavLink to="/cart" className="nav-item nav-link">
                    Giỏ Hàng
                  </NavLink>
                  <NavLink to="/order" className="nav-item nav-link">
                    Đơn Hàng
                  </NavLink>
                  <NavLink to="/checkout" className="nav-item nav-link">
                    Thanh Toán
                  </NavLink>
                  <NavLink to="/contact" className="nav-item nav-link">
                    Liên Hệ
                  </NavLink>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <a href="" className="btn px-0">
                    <i className="fas fa-heart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      0
                    </span>
                  </a>
                  <Link to={"/cart"}>
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      5
                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
