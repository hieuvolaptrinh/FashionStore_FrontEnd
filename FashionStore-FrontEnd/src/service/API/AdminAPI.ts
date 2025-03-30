import { API_BASE_URL } from "../../apiConfig";

interface ProductProps {
  productName: string;
  description: string;
  originalPrice: number;
  productionInfor: string;
  salePrice: number;
  quantity: number;
  manufactureDate: string;
  listTypes: number[];
  listImages: string[];
}
export async function createProduct(product: ProductProps): Promise<string> {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    return "Bạn chưa đăng nhập!";
  }
  const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    return "Thêm sản phẩm thành công!";
  } else {
    const errorText = await response.text();
    return errorText;
  }
}
