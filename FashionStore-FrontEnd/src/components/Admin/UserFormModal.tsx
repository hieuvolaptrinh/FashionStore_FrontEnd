// src/components/Admin/UserFormModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { checkEmail, checkUserName } from "../../service/API/UserAPI";
import { validatePassword, validateRePassword } from "../../utils/Validation";
import getBase64 from "../../utils/getBase64";
import { UserModel } from "../../models/UserModel";

type User = UserModel;

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
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [phone, setPhone] = useState(userToEdit?.phoneNumber || "");
  const [firstName, setFirstName] = useState(userToEdit?.firstName || "");
  const [lastName, setLastName] = useState(userToEdit?.lastName || "");
  const [roles, setRoles] = useState<string[]>(userToEdit?.roles || []);
  const [active, setActive] = useState(userToEdit?.active ?? true);

  // State cho lỗi validate
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");

  // Reset form và lỗi khi userToEdit thay đổi hoặc modal đóng/mở
  useEffect(() => {
    if (userToEdit) {
      setUserName(userToEdit.userName);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phoneNumber);
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setRoles(userToEdit.roles || []);
      setActive(userToEdit.active ?? true);
      setAvatar(null);
    } else {
      // Reset form khi tạo mới
      setUserName("");
      setEmail("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setRoles([]);
      setActive(true);
      setPassword("");
      setRePassword("");
      setAvatar(null);
    }
    // Reset lỗi
    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorRePassword("");
  }, [userToEdit, show]);

  // Kiểm tra username và email tồn tại khi thay đổi
  useEffect(() => {
    const checkUserNameExists = async () => {
      if (
        userName &&
        (!userToEdit || userToEdit.userName !== userName) // Chỉ kiểm tra nếu userName thay đổi
      ) {
        const exists = await checkUserName(userName);
        setErrorUserName(exists ? "Tên đăng nhập đã tồn tại" : "");
      } else {
        setErrorUserName(""); // Reset lỗi nếu không cần kiểm tra
      }
    };

    const checkEmailExists = async () => {
      if (
        email &&
        (!userToEdit || userToEdit.email !== email) // Chỉ kiểm tra nếu email thay đổi
      ) {
        const exists = await checkEmail(email);
        setErrorEmail(exists ? "Email đã tồn tại" : "");
      } else {
        setErrorEmail(""); // Reset lỗi nếu không cần kiểm tra
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

  // Xử lý chọn quyền
  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      setRoles([...roles, role]);
    } else {
      setRoles(roles.filter((r) => r !== role));
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
      userId: userToEdit?.userId,
      email,
      phoneNumber: phone,
      firstName,
      lastName,
      password,
      userName,
      avatarBase64: base64Avatar,
      roles,
      active,
    };

    onSave(user);
    onHide();
  };

  // Danh sách quyền khả dụng
  const availableRoles = ["ADMIN", "USER", "STAFF"];

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
                disabled={!!userToEdit} // Vô hiệu hóa khi sửa
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
                        : `data:image/png;base64,${userToEdit?.avatarBase64}`
                    }
                    alt="Avatar Preview"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", border: "1px solid #ddd" }}
                  />
                </div>
              )}
            </div>

            {/* Quyền (checkbox) */}
            <div className="col-12 mb-3">
              <Form.Label>
                Quyền <span className="text-danger">*</span>
              </Form.Label>
              <div>
                {availableRoles.map((role) => (
                  <Form.Check
                    key={role}
                    type="checkbox"
                    label={role}
                    value={role}
                    checked={roles.includes(role)}
                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Trạng thái active */}
            <div className="col-12 mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Check
                type="switch"
                label={active ? "Đang hoạt động" : "Đã khóa"}
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
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
