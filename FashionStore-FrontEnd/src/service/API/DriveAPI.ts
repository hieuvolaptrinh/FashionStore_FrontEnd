import { API_BASE_URL } from "../../apiConfig";

const uploadToGoogleDrive = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token") || "";

  const res = await fetch(`${API_BASE_URL}/uploadToGoogleDrive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, //  trình duyệt sẽ tự set multipart/form-data
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Lỗi API ${res.status}`);
  }

  const data = await res.json(); 
  return data.url; 
};
export default uploadToGoogleDrive;
