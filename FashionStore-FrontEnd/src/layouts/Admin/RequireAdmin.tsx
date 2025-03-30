import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles: string[];
}

const RequireAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      
      try {
        const decodedToken = jwtDecode(token) as JwtPayload;
        const roles = decodedToken.roles;
        //   const roles = JSON.parse(localStorage.getItem("roles") || "[]"); // làm vậy cho nhanh
        if (roles.includes("ADMIN")) {
          setAuthorized(true);
        } else {
          navigate("/forbidden");
        }
      } catch (err) {
        console.error("Token không hợp lệ:", err);
        navigate("/forbidden");
      } finally {
        setChecking(false);
      }
    }, [navigate]);

    if (checking) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Đang kiểm tra quyền truy cập...
            </span>
          </div>
        </div>
      );
    }

    return authorized ? <WrappedComponent {...props} /> : null;
  };

  return WithAdminCheck;
};

export default RequireAdmin;
