import { request } from "../Request";
import ProductModel from "../../models/ProductModel";

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
  console.log("in dữ liệu thử :" + response);

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

export async function searchProduct(productName: string): Promise<ProductPage> {
  let url: string = `http://localhost:8080/products/search/findByProductNameContaining?page=0&size=8&sort=productId,desc`;

  if (productName != "") {
    url = `http://localhost:8080/products/search/findByProductNameContaining?page=0&size=8&sort=productId,desc&productName=${productName}`;
  }

  return getProduct(url);
}

export async function getAllProducts(
  currentPage: number
): Promise<ProductPage> {
  const url: string = `http://localhost:8080/products?page=${
    currentPage - 1
  }&size=3&sort=productId,desc`;
  return getProduct(url);
}

export async function getNewProducts(): Promise<ProductPage> {
  const url: string =
    "http://localhost:8080/product?size=3&sort=productId,desc";
  return getProduct(url);
}
