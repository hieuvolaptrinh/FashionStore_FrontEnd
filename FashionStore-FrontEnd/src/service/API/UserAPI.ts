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
    return "Đã đăng ký thành công";
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return `Bị lỗi trong quá trình đăng ký tài khoản: ${error}`;
  }
};
