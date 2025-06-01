import { API_BASE_URL } from "../../apiConfig";

const uploadToGoogleDrive = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const token = localStorage.getItem("token") || "";
  const res = await fetch(`${API_BASE_URL}/uploadToGoogleDrive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`Lỗi API ${res.status}`);
  }

  return res.text();
};

export default uploadToGoogleDrive;
