/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UserFormModal from "./UserFormModal";
import { getAllUsers, lockAccount } from "../../../service/API/AdminAPI";
import { registerUser, updateUser } from "../../../service/API/UserAPI";
import { UserModel } from "../../../models/UserModel";
import GenericTable from "../../GenericTable";

type User = UserModel;

const UserAdminManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        alert("Lỗi lấy danh sách người dùng!");
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setUserToEdit(null);
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Khóa người dùng này?")) {
      try {
        await lockAccount(userId);
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === userId ? { ...user, active: false } : user
          )
        );
        alert("Khóa thành công!");
      } catch (error) {
        alert("Lỗi khi khóa!");
      }
    }
  };

  const handleSaveUser = async (userData: User) => {
    try {
      if (userToEdit) {
        await updateUser(userData);
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === userData.userId ? userData : user
          )
        );
      } else {
        await registerUser(userData);
        setUsers((prev) => [...prev, { ...userData, userId: Date.now() }]);
      }
      alert("Lưu thành công!");
    } catch (error) {
      alert("Lỗi khi lưu!");
    }
    setShowModal(false);
  };

  // Định nghĩa các cột cho bảng
  const columns = [
    { header: "ID", accessor: "userId" },
    {
      header: "Họ Tên",
      accessor: (user: User) => `${user.firstName} ${user.lastName}`,
    },
    { header: "Email", accessor: "email" },
    { header: "Số Điện Thoại", accessor: "phoneNumber" },
    {
      header: "Quyền",
      accessor: (user: User) => user.roles?.join(", ") || "Không có quyền",
    },
    {
      header: "Avatar",
      accessor: (user: User) =>
        user.avatarBase64 ? (
          <img
            src={`data:image/png;base64,${user.avatarBase64}`}
            alt="Avatar"
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          "Không có ảnh"
        ),
    },
    {
      header: "Trạng Thái",
      accessor: (user: User) => (user.active ? "Hoạt động" : "Đã khóa"),
    },
  ];

  // Định nghĩa hành động (nút Sửa và Khóa)
  const actions = (user: User) => (
    <>
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
    </>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản Lý Người Dùng</h2>
      <Button variant="primary" className="mb-3" onClick={handleAddUser}>
        Thêm Người Dùng
      </Button>
      <GenericTable
        data={users}
        columns={columns}
        rowKey="userId"
        actions={actions}
      />
      <UserFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />
    </div>
  );
};

export default UserAdminManager;