import axios from "axios";
import ImageModel from "../../models/ImageModel";
import RestResponse from "../../models/RestResponse";
import { API_BASE_URL } from "../../apiConfig";

async function fetchProductImage(url: string): Promise<ImageModel[]> {
  const result: ImageModel[] = [];

  // Sử dụng axios thay vì fetch
  const response = await axios.get<RestResponse<ImageModel[]>>(url);
  const data: ImageModel[] = response.data.data;

  for (const image of data) {
    result.push({
      imageId: image.imageId,
      imageName: image.imageName,
      link: image.link,
      icon: image.icon,
      data: image.data,
      productId: image.productId,
    });
  }
  return result;
}

// Sử dụng Axios để fetch danh sách hình ảnh cho sản phẩm
export async function fetchProductImages(
  productId: number
): Promise<ImageModel[]> {
  const url: string = `${API_BASE_URL}/api/v1/products/${productId}/listImages`;

  return await fetchProductImage(url);
}
