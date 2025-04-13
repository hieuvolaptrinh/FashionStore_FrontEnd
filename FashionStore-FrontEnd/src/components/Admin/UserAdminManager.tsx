// src/components/Admin/UserAdminManager.tsx
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import UserFormModal from "./UserFormModal";
import { getAllUsers, registerUser } from "../../service/API/UserAPI"; // API đã cung cấp
import { UserModel } from "../../models/UserModel";

type User = UserModel;

const deleteUser = async (userId: number): Promise<void> => {
  console.log(`Gửi yêu cầu xóa user với ID: ${userId}`);
};

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

  // Xóa người dùng
  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        alert("Có lỗi xảy ra khi xóa người dùng!");
      }
    }
  };

  const handleSaveUser = async (userData: User) => {};

  return (
    <>
      <div className="container mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="container mt-4">
            <h2 className="mb-4">Quản lý người dùng</h2>

            {/* Nút thêm người dùng */}
            <Button variant="primary" className="mb-3" onClick={handleAddUser}>
              Thêm người dùng
            </Button>

            {/* Bảng hiển thị danh sách người dùng */}
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Quyền</th>
                  <th>Avatar</th>
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
                    <td>{user.role}</td>
                    <td>
                      {user.avatarBase64 ? (
                        <img
                          src={user.avatarBase64}
                          alt="Avatar"
                          width={50}
                          height={50}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        "Không có ảnh"
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
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Modal để thêm/sửa người dùng */}
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
