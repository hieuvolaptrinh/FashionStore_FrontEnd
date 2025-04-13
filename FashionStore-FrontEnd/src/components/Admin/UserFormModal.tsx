// src/components/Admin/UserFormModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { checkEmail, checkUserName } from "../../service/API/UserAPI";
import { validatePassword, validateRePassword } from "../../utils/Validation";
import getBase64 from "../../utils/getBase64";
import { UserModel } from "../../models/UserModel";

// Định nghĩa interface User dựa trên UserModel
type User = UserModel;

// Props cho modal
interface UserFormModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (user: User) => void;
  userToEdit?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  show,
  onHide,
  onSave,
  userToEdit,
}) => {
  // State cho các trường nhập liệu
  const [avatar, setAvatar] = useState<File | null>(null);
  const [userName, setUserName] = useState(userToEdit?.userName || "");
  const [password, setPassword] = useState(userToEdit?.password || "");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [phone, setPhone] = useState(userToEdit?.phoneNumber || "");
  const [firstName, setFirstName] = useState(userToEdit?.firstName || "");
  const [lastName, setLastName] = useState(userToEdit?.lastName || "");
  const [role, setRole] = useState<string>(userToEdit?.role);

  // State cho lỗi validate
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");

  // Kiểm tra username và email tồn tại khi thay đổi
  useEffect(() => {
    const checkUserNameExists = async () => {
      if (userName && (!userToEdit || userToEdit.userName !== userName)) {
        const exists = await checkUserName(userName);
        setErrorUserName(exists ? "Tên đăng nhập đã tồn tại" : "");
      }
    };

    const checkEmailExists = async () => {
      if (email && (!userToEdit || userToEdit.email !== email)) {
        const exists = await checkEmail(email);
        setErrorEmail(exists ? "Email đã tồn tại" : "");
      }
    };

    checkUserNameExists();
    checkEmailExists();
  }, [userName, email, userToEdit]);

  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrorPassword(validatePassword(newPassword));
    if (rePassword) {
      setErrorRePassword(validateRePassword(newPassword, rePassword));
    }
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRePassword = e.target.value;
    setRePassword(newRePassword);
    setErrorRePassword(validateRePassword(password, newRePassword));
  };

  // Xử lý chọn ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    // Validate các trường
    if (!userName.trim()) {
      setErrorUserName("Tên đăng nhập không được để trống");
      hasError = true;
    }
    if (!email.trim()) {
      setErrorEmail("Email không được để trống");
      hasError = true;
    }
    if (!userToEdit) {
      // Chỉ validate mật khẩu khi thêm mới
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
    }

    if (errorUserName || errorEmail || hasError) {
      return;
    }

    // Chuyển ảnh thành base64
    const base64Avatar = avatar
      ? await getBase64(avatar)
      : userToEdit?.avatarBase64 || null;

    // Tạo đối tượng user để lưu
    const user: User = {
      userId: userToEdit?.userId, // Giữ userId nếu đang sửa, bỏ qua nếu thêm mới
      email,
      phoneNumber: phone,
      firstName,
      lastName,
      password,
      userName,
      avatarBase64: base64Avatar,
      role,
    };

    onSave(user);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {userToEdit ? "Sửa người dùng" : "Thêm người dùng"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            {/* Họ và Tên */}
            <div className="col-md-6 mb-3">
              <Form.Label>
                Họ <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nhập họ"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <Form.Label>
                Tên <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nhập tên"
                required
              />
            </div>

            {/* Tên đăng nhập và Số điện thoại */}
            <div className="col-md-6 mb-3">
              <Form.Label>
                Tên đăng nhập <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nhập tên đăng nhập"
              />
              <Form.Text className="text-danger">{errorUserName}</Form.Text>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Email */}
            <div className="col-12 mb-3">
              <Form.Label>
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
              <Form.Text className="text-danger">{errorEmail}</Form.Text>
            </div>

            {/* Mật khẩu (chỉ hiển thị khi thêm mới) */}
            {!userToEdit && (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    Mật khẩu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu"
                  />
                  <Form.Text className="text-danger">{errorPassword}</Form.Text>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    Xác nhận mật khẩu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={rePassword}
                    onChange={handleRePasswordChange}
                    placeholder="Xác nhận mật khẩu"
                  />
                  <Form.Text className="text-danger">
                    {errorRePassword}
                  </Form.Text>
                </div>
              </div>
            )}

            {/* Ảnh đại diện */}
            <div className="col-12 mb-3">
              <Form.Label>Ảnh đại diện</Form.Label>
              <Form.Control
                type="file"
                onChange={handleAvatarChange}
                accept="image/*"
              />
              {(avatar || userToEdit?.avatarBase64) && (
                <div className="mt-3">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : userToEdit?.avatarBase64 || ""
                    }
                    alt="Avatar Preview"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", border: "1px solid #ddd" }}
                  />
                </div>
              )}
            </div>

            {/* Quyền */}
            <div className="col-12 mb-3">
              <Form.Label>
                Quyền <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value as "Admin" | "User")}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Select>
            </div>

            {/* Nút lưu */}
            <div className="col-12">
              <Button type="submit" variant="primary" className="w-100">
                Lưu
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;
