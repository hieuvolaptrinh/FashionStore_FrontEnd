import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activateAccount } from "../../service/API/UserAPI";

const ActivateAccount: React.FC = () => {
  const { email, activationCode } = useParams();
  const [notification, setNotification] = useState("");
  const [status, setStatus] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  useEffect(() => {
    if (email && activationCode) {
      activateAccount(email, activationCode)
        .then((result) => {
          setNotification(result);
          if (
            result.includes("thành công") ||
            result.includes("được kích hoạt")
          ) {
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch((error) => {
          console.error("Lỗi kích hoạt tài khoản:", error);
          setNotification("Không thể kết nối đến server.");
          setStatus("error");
        });
    } else {
      setNotification("Email hoặc mã kích hoạt không hợp lệ.");
      setStatus("error");
    }
  }, [email, activationCode]);

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">
        {status === "success" ? (
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "4rem" }}
          ></i>
        ) : (
          <i
            className="bi bi-x-circle-fill text-danger"
            style={{ fontSize: "4rem" }}
          ></i>
        )}
        <h1 className="mt-3">Kích hoạt tài khoản</h1>
        <div
          className={`alert mt-4 ${
            status === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {notification}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Quay về trang đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ActivateAccount;
