import ImageModel from "../../models/ImageModel";
import RestResponse from "../../models/Response";

async function fetchProductImage(url: string): Promise<ImageModel[]> {
  const result: ImageModel[] = [];

  const response = await fetch(url);
  const json: RestResponse<ImageModel[]> = await response.json();
  const data: ImageModel[] = json.data;
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

export async function fetchProductImages(
  productId: number
): Promise<ImageModel[]> {
  const url: string = `http://localhost:8080/api/v1/products/${productId}/listImages`;

  return await fetchProductImage(url);
}
