import { API_BASE_URL } from "../../apiConfig";

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
