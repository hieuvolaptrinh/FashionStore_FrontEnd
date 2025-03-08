import ProductModel from "../models/ProductModel";
import { request } from "./Request";

interface ProductPage {
  products: ProductModel[];
  totalPages: number;
  quantity: number;
}

async function getProduct(url: string): Promise<ProductPage> {
  const result: ProductModel[] = [];

  const response = await request(url);
  //   lấy ra json
  const responseData = response._embedded.products;

  // lấy thông tin trang
  const totalPages = response.page.totalPages;
  const quantity = response.page.totalElements;

  for (const item of responseData) {
    const product = new ProductModel(
      item.productId,
      item.productName,
      item.description,
      item.originalPrice,
      item.salePrice,
      item.quantity,
      item.avgStars
    );
    result.push(product);
  }
  return { products: result, totalPages: totalPages, quantity: quantity };
}

export async function getAllProducts(): Promise<ProductPage> {
  const url: string =
    "http://localhost:8080/products?page=0&size=20&sort=productId,desc";
  return getProduct(url);
}

export async function getNewProducts(): Promise<ProductPage> {
  const url: string =
    "http://localhost:8080/product?size=5&sort=productId,desc";
  return getProduct(url);
}
