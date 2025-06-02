import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRequiredPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center  bg bg-opacity-10 px-3">
      <div className="text-center p-4 bg-white shadow rounded-4">
        <div className="mb-4">
          <i className="bi bi-person-lock text-primary" style={{ fontSize: '4rem' }}></i>
        </div>
        <h1 className="display-5 fw-bold text-primary">Bạn chưa đăng nhập</h1>
        <p className="text-muted mb-4">
          Trang này chỉ dành cho người dùng đã đăng nhập.  
          <br />Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ.
        </p>
        <button className="btn btn-primary px-4" onClick={() => navigate('/login')}>
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredPage;
