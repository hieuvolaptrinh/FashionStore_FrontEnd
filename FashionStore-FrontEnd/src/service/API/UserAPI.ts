import { API_BASE_URL } from "../../apiConfig";
import { UserModel } from "../../models/UserModel";
import { request } from "../Request";

export const checkUserName = async (userName: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/users/search/existsByUserName?userName=${userName}`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log("data: ", data, typeof data);
    return data === "true";
  } catch (error) {
    console.error("Lỗi kiểm tra username:", error);
    return false;
  }
};

export const checkEmail = async (email: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/users/search/existsByEmail?email=${email}`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log("data: ", data, typeof data);
    return data === "true";
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

// login
export const login = async (
  userName: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  const loginRequest = {
    userName: userName,
    password: password,
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
      const { token, username, roles } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("roles", JSON.stringify(roles));

      return { success: true, message: "Đăng nhập thành công" };
    } else {
      const errorText = await response.text();
      return { success: false, message: errorText };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Có lỗi xảy ra, vui lòng thử lại." };
  }
};
