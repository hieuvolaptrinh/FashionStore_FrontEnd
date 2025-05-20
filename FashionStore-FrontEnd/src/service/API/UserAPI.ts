/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/RestResponse";
import { UserModel } from "../../models/UserModel";
import axios from "axios";

export const getAvatar = async (): Promise<string | null> => {
  const storedUsername = localStorage.getItem("username");
  if (!storedUsername) {
    console.error("Chưa đăng nhập, không thể lấy avatar.");
    return null;
  }

  try {
    const response = await axios.get<string>(
      `${API_BASE_URL}/api/v1/user/${storedUsername}/avatar`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return response.data; // Dữ liệu ảnh dưới dạng base64
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
};

export const checkUserName = async (userName: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/users/search/existsByUserName?userName=${userName}`;

  try {
    const response = await axios.get<RestResponse<boolean>>(url);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi kiểm tra username:", error);
    return false;
  }
};

export const checkEmail = async (email: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/users/search/existsByEmail?email=${email}`;

  try {
    const response = await axios.get<RestResponse<boolean>>(url);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi kiểm tra email:", error);
    return false;
  }
};

export const registerUser = async (
  userData: Omit<UserModel, "userId">
): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/register`,
      userData
    );

    const result = response.data;
    if (response.status === 200) {
      return result.message;
    } else {
      return result.error || "Có lỗi khi đăng ký người dùng";
    }
  } catch (error: any) {
    console.error("Lỗi đăng ký:", error);
    if (error.response && error.response.data) {
      // error.response : lầ cấu trúc của axios/ data.error là cấu trúc mình code bên backend
      return "Lỗi:" + error.response.data.error;
    }
    return "Đã xảy ra lỗi trong quá trình đăng ký tài khoản. Vui lòng thử lại sau.";
  }
};
export const activateAccount = async (
  email: string,
  activationCode: string
): Promise<string> => {
  const params = new URLSearchParams({ email, activationCode });
  const url = `${API_BASE_URL}/api/v1/auth/activateAccount?${params}`;
  try {
    const response = await axios.get(url);

    return response.data.data.message;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const login = async (userName: string, password: string) => {
  const loginRequest = {
    userName,
    password,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    });

    if (response.ok) {
      const data = await response.json();
      const { token, username, roles } = data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("roles", JSON.stringify(roles)); // ["ADMIN", "STAFF"]

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

// src/service/API/UserAPI.ts
export const updateUser = async (user: UserModel): Promise<string> => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return "Bạn chưa đăng nhập!";
  }

  const payload = {
    email: user.email,
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarBase64: user.avatarBase64,
    roles: user.roles || [], // Đảm bảo roles là mảng
    active: user.active,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/user/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok) {
      return result.message || "Cập nhật thành công";
    } else {
      return result.message || "Có lỗi khi cập nhật người dùng";
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    return "Có lỗi xảy ra khi cập nhật người dùng!";
  }
};

export const changePassword = async (
  email: string,
  password: string,
  activationCode: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/new-password?email=${email}&password=${password}&activationCode=${activationCode}`
    );
    console.log("response", response);
    return response.data.message;
  } catch (error: any) {
    console.error("Error:", error);
    return error.response.data.error;
  }
};

export const forgotPassword = async (email: string, userName: string) => {
  const payload = {
    email,
    userName,
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/reset-password`,
      payload
    );
    return response.data.message;
  } catch (error: any) {
    console.error("Error:", error);
    return error.response.data.error;
  }
};

export const getUser = async (): Promise<UserModel> => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return "Bạn chưa đăng nhập!";
  }
  const response = await axios.get(`${API_BASE_URL}/api/v1/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
