import React, { useState } from "react";
import { login } from "../service/API/UserAPI";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.name: e.target là phần tử DOM mà sự kiện này xảy ra trên đó,
    // trong trường hợp này là một ô input. e.target.name lấy tên của trường (attribute name của input field) trong form.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { userName, password } = formData;
    const response = await login(userName, password);

    if (response.success) {
      setSuccess(response.message); // hiển thị thông báo thành công
      setError("");
    } else {
      setError(response.message); // hiển thị thông báo lỗi
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Đăng nhập ngay</h2>
            <div onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                  <Link to={"/"}>Mua sắm ngay</Link>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
