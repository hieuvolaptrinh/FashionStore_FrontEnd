import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles: string[];
}

const RequireUser = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/loginrequired");
        return;
      }
      
      try {
        const decodedToken = jwtDecode(token) as JwtPayload;
        const roles = decodedToken.roles;
        if (roles.includes("USER")) {
          setAuthorized(true);
        } else {
          navigate("/forbidden");
        }
      } catch (err) {
        console.error("Token không hợp lệ:", err);
        navigate("/loginrequired");
      } finally {
        setChecking(false);
      }
    }, [navigate]);

    if (checking) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Đang kiểm tra xác thực...
            </span>
          </div>
        </div>
      );
    }

    return authorized ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthCheck;
};

export default RequireUser;