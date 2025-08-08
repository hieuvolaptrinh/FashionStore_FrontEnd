/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const LoginOauth2Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOAuth2Login = async () => {
      try {
        const token = searchParams.get("token");
        const username = searchParams.get("username");
        const rolesParam = searchParams.get("roles");

        if (!token || !username) {
          setError("Token hoặc username không hợp lệ");
          setIsLoading(false);
          return;
        }

        // Xử lý roles từ string thành array
        const roles = rolesParam
          ? rolesParam.split(",").map((role) => role.trim())
          : [];

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("roles", JSON.stringify(roles));

        console.log("OAuth2 đăng nhập thành công:", {
          username,
          roles,
        });

        setTimeout(() => {
          setIsLoading(false);
          navigate("/", { replace: true });
        }, 2000);
      } catch (error) {
        console.error("Lỗi xử lý đăng nhập OAuth2:", error);
        setError("Đã xảy ra lỗi khi xử lý đăng nhập");
        setIsLoading(false);
      }
    };

    processOAuth2Login();
  }, [searchParams, navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-6">
          {/* Google Icon */}
          <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.3H24v8.6h11.3c-1.6 4.3-5.8 7.3-11.3 7.3-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6.1-6.1C34.4 6.2 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20c10.1 0 19-7.3 19-20 0-1.3-.2-2.7-.4-4z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.8 16.1 19 13.4 24 13.4c3.1 0 5.9 1.2 8 3.1l6.1-6.1C34.4 6.2 29.5 4 24 4 16.8 4 10.6 8.9 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.3c-2 1.4-4.6 2.2-7.2 2.2-5.4 0-10-3.7-11.6-8.7l-6.5 5C10.6 39.1 16.8 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.3H24v8.6h11.3c-.8 2.2-2.4 4.1-4.4 5.3l6.2 5.3c3.6-3.3 5.9-8.2 5.9-14.2 0-1.3-.2-2.7-.4-4z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Đăng nhập Google thành công!
        </h1>

        {isLoading ? (
          <>
            <p className="text-lg mb-8 text-gray-600">
              Đang xử lý thông tin đăng nhập...
            </p>
            {/* Loading spinner */}
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </>
        ) : (
          <>
            <p className="text-lg mb-8 text-gray-600">
              Chào mừng bạn quay trở lại!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-500 text-white rounded transition-colors"
            >
              Đi tới Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginOauth2Success;
