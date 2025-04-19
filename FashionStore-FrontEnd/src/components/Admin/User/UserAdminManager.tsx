// src/components/Admin/UserAdminManager.tsx
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import UserFormModal from "./UserFormModal";
import { getAllUsers, lockAccount } from "../../../service/API/AdminAPI";
import { registerUser, updateUser } from "../../../service/API/UserAPI";
import { UserModel } from "../../../models/UserModel";

type User = UserModel;

const UserAdminManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        alert("Có lỗi xảy ra khi lấy danh sách người dùng!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Mở modal để thêm người dùng mới
  const handleAddUser = () => {
    setUserToEdit(null);
    setShowModal(true);
  };

  // Mở modal để sửa người dùng
  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setShowModal(true);
  };

  // Khóa người dùng
  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Bạn có chắc muốn khóa người dùng này?")) {
      try {
        await lockAccount(userId);
        alert("Khóa người dùng thành công!");
        // Cập nhật state trực tiếp thay vì gọi lại API
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userId ? { ...user, active: false } : user
          )
        );
      } catch (error) {
        console.error("Lỗi khi khóa người dùng:", error);
        alert("Có lỗi xảy ra khi khóa người dùng!");
      }
    }
  };

  // Lưu người dùng (thêm mới hoặc cập nhật)
  const handleSaveUser = async (userData: User) => {
    if (userToEdit) {
      // Cập nhật người dùng
      try {
        const message = await updateUser(userData);
        alert(message);
        // Cập nhật state trực tiếp
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userData.userId ? { ...userData } : user
          )
        );
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        alert("Có lỗi xảy ra khi cập nhật người dùng!");
      }
    } else {
      // Thêm người dùng mới
      try {
        const message = await registerUser(userData);
        alert(message);
        // Thêm người dùng mới vào state
        setUsers((prevUsers) => [
          ...prevUsers,
          { ...userData, userId: Date.now() },
        ]);
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        alert("Có lỗi xảy ra khi thêm người dùng!");
      }
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="container mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="container mt-4">
            <h2 className="mb-4">Quản lý người dùng</h2>

            <Button variant="primary" className="mb-3" onClick={handleAddUser}>
              Thêm người dùng
            </Button>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Quyền</th>
                  <th>Avatar</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.roles?.join(", ") || "Không có quyền"}</td>
                    <td>
                      {user.avatarBase64 ? (
                        <img
                          src={`data:image/png;base64,${user.avatarBase64}`}
                          alt="Avatar"
                          width={100}
                          height={100}
                          style={{ objectFit: "cover", borderRadius: "0%" }}
                        />
                      ) : (
                        "Không có ảnh"
                      )}
                    </td>
                    <td>
                      {user.active ? (
                        <span className="text-success">Đang hoạt động</span>
                      ) : (
                        <span className="text-danger">Đã khóa</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditUser(user)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.userId!)}
                      >
                        Khóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <UserFormModal
              show={showModal}
              onHide={() => setShowModal(false)}
              onSave={handleSaveUser}
              userToEdit={userToEdit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserAdminManager;
