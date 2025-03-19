import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";
import { Link } from "react-router-dom";
import { validatePassword, validateRePassword } from "../utils/Validation";
import { checkEmail, checkUserName } from "../service/API/UserAPI";

export const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");

  // error
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");

  const [notification, setNotification] = useState("");
  useEffect(() => {
    checkEmail(email)
      .then((res) => {
        if (res) {
          setErrorEmail("Email đã tồn tại");
        } else {
          setErrorEmail("");
        }
      })
      .catch((error) => {
        console.error("Lỗi: ", error);
      });
    checkUserName(userName)
      .then((res) => {
        if (res) {
          setErrorUserName("Tên đăng nhập đã tồn tại");
        } else {
          setErrorUserName("");
        }
      })
      .catch((error) => {
        console.error("Lỗi: ", error);
      });
  }, [email, userName]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorPassword(validatePassword(e.target.value));

    if (rePassword) {
      setErrorRePassword(validateRePassword(e.target.value, rePassword));
    }
  };
  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
    setErrorRePassword(validateRePassword(password, e.target.value));
  };

  // xử lý nút đăng ký
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!userName.trim()) {
      setErrorUserName("Tên đăng nhập không được để trống");
      hasError = true;
    } else {
      const userNameExists = await checkUserName(userName);
      if (userNameExists) hasError = true;
    }
    if (!email.trim()) {
      setErrorEmail("Email không được để trống");
      hasError = true;
    } else {
      const emailExists = await checkEmail(email);
      if (emailExists) hasError = true;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorPassword(passwordError);
      hasError = true;
    }

    const rePasswordError = validateRePassword(password, rePassword);
    if (rePasswordError) {
      setErrorRePassword(rePasswordError);
      hasError = true;
    }

    if (hasError) {
      console.log("Form có lỗi, không submit!");
      return;
    }

    // Nếu không có lỗi, thực hiện submit dữ liệu

    try {
      const url = `${API_BASE_URL}/api/v1/users/register`;
      console.log("url: ", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          lastName: lastName,
          firstName: firstName,
          email: email,
          userName: userName,
          password: password,
          phoneNumber: phone,
        }),
      });
      console.log("response: ", response.json());
      if (response.ok) {
        setNotification("Đã đăng kí thành công");
      } else {
        setNotification("Đã xảy ra lỗi trong quá trình đăng kí");
      }
    } catch (error) {
      console.error(`Bị lỗi trong quá trình đăng kí ${error}`);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow">
              <div className="card-header bg-primary text-white text-center py-3">
                <h2 className="mb-0">Đăng Ký Tài Khoản</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Thông tin cá nhân */}
                    <div className="col-12 mb-4">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            Họ <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Nhập họ của bạn"
                            required
                          />
                        </div>
                        <div className="col-md-6 ">
                          <label htmlFor="lastName" className="form-label">
                            Tên <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Nhập tên của bạn"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Thông tin tài khoản */}
                    <div className="col-12 ">
                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="userName" className="form-label">
                            Tên đăng nhập <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                          />
                          <p className="text-danger">{errorUserName}</p>
                        </div>

                        <div className="col-6">
                          <label htmlFor="phone" className="form-label">
                            Số điện thoại
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-telephone"></i>
                            </span>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Nhập số điện thoại"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="example@email.com"
                            />
                          </div>
                          <p className="text-danger">{errorEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Thông tin mật khẩu */}
                    <div className="col-12 ">
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="password" className="form-label">
                            Mật khẩu <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-lock"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              value={password}
                              onChange={handlePasswordChange}
                              placeholder="Nhập mật khẩu"
                            />
                          </div>
                          <p className="text-danger">{errorPassword}</p>
                        </div>
                        <div className="col-6">
                          <label htmlFor="rePassword" className="form-label">
                            Xác nhận mật khẩu{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-lock-fill"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control"
                              id="rePassword"
                              value={rePassword}
                              onChange={handleRePasswordChange}
                              placeholder="Xác nhận mật khẩu"
                            />
                          </div>
                          <p className="text-danger">{errorRePassword}</p>
                        </div>
                      </div>
                    </div>

                    {/* Điều khoản và điều kiện */}
                    <div className="col-12 mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="acceptTerms"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="acceptTerms"
                        >
                          Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
                          <a href="#">Chính sách bảo mật</a>
                        </label>
                      </div>
                    </div>

                    {/* Nút đăng ký */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 rounded-5"
                      >
                        Đăng Kí
                      </button>
                      <p className="text-success">{notification}</p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3 bg-light">
                <p className="mb-0">
                  Đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
