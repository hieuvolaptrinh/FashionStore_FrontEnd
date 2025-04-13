import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/RestResponse";
import { UserModel } from "../../models/UserModel";
import { request } from "../Request";

export const getAvatar = async (): Promise<string | null> => {
  const storedUsername = localStorage.getItem("username");
  if (!storedUsername) {
    console.error("Chưa đăng nhập, không thể lấy avatar.");
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/user/${storedUsername}/avatar`
    );

    if (!response.ok) {
      throw new Error("Không thể lấy avatar từ server.");
    }
    const base64 = await response.text();
    return base64;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
};
export const checkUserName = async (userName: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/users/search/existsByUserName?userName=${userName}`;
  try {
    const response = await fetch(url);
    const json: RestResponse<boolean> = await response.json();
    const data = json.data;
    console.log("data: ", data, typeof data);
    return data;
  } catch (error) {
    console.error("Lỗi kiểm tra username:", error);
    return false;
  }
};

export const checkEmail = async (email: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/users/search/existsByEmail?email=${email}`;
  try {
    const response = await fetch(url);
    const json: RestResponse<boolean> = await response.json();
    const data = json.data;
    console.log("data: ", data, typeof data);
    return data;
  } catch (error) {
    console.error("Lỗi kiểm tra email:", error);
    return false;
  }
};
export const registerUser = async (
  userData: Omit<UserModel, "userId">
): Promise<string> => {
  try {
    await request(`${API_BASE_URL}/api/v1/user/register`, "POST", userData);
    return "Đã đăng ký thành công vui lòng kiểm tra email để kích hoạt tài khoản";
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return `Bị lỗi trong quá trình đăng ký tài khoản: ${error}`;
  }
};
export const activateAccount = async (
  email: string,
  activationCode: string
): Promise<string> => {
  const params = new URLSearchParams({ email, activationCode });
  const url = `${API_BASE_URL}/api/v1/user/activateAccount?${params}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const responseText = await response.json();

    if (response.ok) {
      return responseText.message;
    }
    return "Kích hoạt tài khoản thất bại!";
  } catch (error) {
    console.error("Fetch error:", error);
    return "Không thể kết nối đến server";
  }
};

export const login = async (
  userName: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
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

      return { success: true, message: "Đăng nhập thành công" };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || "Tên đăng nhập hoặc mật khẩu sai",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra, vui lòng thử lại." + error,
    };
  }
};

export const getAllUsers = async (): Promise<UserModel[]> => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error("Lỗi khi lấy danh sách người dùng:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return [];
  }
};
