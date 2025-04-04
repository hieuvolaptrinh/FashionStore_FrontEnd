import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAvatar } from "../../service/API/UserAPI";

interface HeaderProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setKeyword }) => {
  const [isOpen, setIsOpen] = useState(false); // dropdown tài khoản
  const [username, setUsername] = useState<string | null>(null);
  const [tmp, setTmp] = useState("");
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    getAvatar()
      .then((result) => {
        if (result) {
          setAvatarBase64(result);
        } else {
          setAvatarBase64(null);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTmp(e.target.value);
  };

  const handelSearch = () => {
    setKeyword(tmp);
  };

  return (
    <>
      <div className="container-fluid">
        {/* Hàng thứ 2: logo - search - tài khoản */}
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          {/* Logo */}
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

          {/* Thanh tìm kiếm */}
          <div className="col-lg-4 col-6 text-left">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm"
                onChange={onSearchInputChange}
                value={tmp}
              />
              <button className="btn" type="submit" onClick={handelSearch}>
                <span className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </span>
              </button>
            </div>
          </div>

          {/* Tài khoản */}
          <div className="col-lg-4 col-6 text-right">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-light dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {" "}
                {/* Hiển thị avatar nếu có, nếu không hiển thị tên "Tài khoản" */}
                {username ? (
                  <>
                    {avatarBase64 && (
                      <img
                        src={`data:image/png;base64,${avatarBase64}`}
                        alt="Avatar"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                    <div className="text-start">
                      <div
                        style={{ fontSize: "0.9rem", fontWeight: "500" }}
                      ></div>
                      {username && (
                        <div style={{ fontSize: "1.1rem", color: "#666" }}>
                          Xin chào, <strong>{username}</strong>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="h5 text-uppercase text-primary bg-dark px-2">
                    Tài khoản
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="dropdown-menu dropdown-menu-right show">
                  {!username ? (
                    <>
                      <Link to="/login" className="dropdown-item">
                        🔐 Đăng nhập
                      </Link>
                      <Link to="/register" className="dropdown-item">
                        📝 Đăng ký
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
