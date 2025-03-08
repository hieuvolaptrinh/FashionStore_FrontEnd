import ImageModel from "../models/ImageModel";
import { request } from "./Request";

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
