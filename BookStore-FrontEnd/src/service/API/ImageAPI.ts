import ImageModel from "../../models/ImageModel";
import { request } from "../Request";

async function fetchProductImage(url: string): Promise<ImageModel[]> {
  const result: ImageModel[] = [];

  const response = await request(url);
  // lấy ra json sách
  const responseData = response?._embedded?.images || [];
  // const responseData = response.images;

  console.log("responseData: ", responseData);

  for (const image of responseData) {
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

export async function fetchProductImages(
  productId: number
): Promise<ImageModel[]> {
  const url: string = `http://localhost:8080/products/${productId}/listImages?page=0&size=1`;

  return fetchProductImage(url);
}

// tổng quát hóa

// const ImageAPI = {
//   // Lấy danh sách ảnh của một sản phẩm
//   getImagesByProduct: async (productId: number, page: number = 0, size: number = 10): Promise<ImageModel[]> => {
//       const url = `${BASE_URL}/products/${productId}/listImages?page=${page}&size=${size}`;
//       const response = await request<{ _embedded: { images: ImageModel[] } }>(url);
//       return response?._embedded?.images || [];
//   },

//   // Lấy ảnh theo ID
//   getImageById: async (imageId: number): Promise<ImageModel> => {
//       const url = `${BASE_URL}/images/${imageId}`;
//       return request<ImageModel>(url);
//   },

//   // Thêm ảnh mới
//   uploadImage: async (data: FormData): Promise<ImageModel> => {
//       const url = `${BASE_URL}/images/upload`;
//       return request<ImageModel>(url, "POST", data);
//   },

//   // Xóa ảnh
//   deleteImage: async (imageId: number): Promise<void> => {
//       const url = `${BASE_URL}/images/${imageId}`;
//       return request<void>(url, "DELETE");
//   },
// };
