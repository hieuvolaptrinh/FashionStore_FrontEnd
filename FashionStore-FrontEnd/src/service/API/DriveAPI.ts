import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/Response";

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
  const json: RestResponse<{ url: string }> = await res.json();

  if (json.data && json.data.url) {
    console.log("URL ảnh:", json.data.url);
    return json.data.url;
  } else {
    throw new Error("Không tìm thấy URL ảnh trong phản hồi.");
  }
};

export default uploadToGoogleDrive;
