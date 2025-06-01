import React from "react";
import { useNavigate } from "react-router-dom";

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">403</h1>
        <p className="fs-3">
          <span className="text-danger">Oops!</span> Bạn không có quyền truy
          cập.
        </p>
        <p className="lead">
          Vui lòng đăng nhập bằng tài khoản có quyền <strong>Admin</strong>.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Quay lại trang đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
