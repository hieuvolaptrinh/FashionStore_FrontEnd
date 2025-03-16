import { request } from "../Request";
import ProductModel from "../../models/ProductModel";
import { API_CONFIG } from "../../apiConfig";

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
      item.productionInfor,
      item.originalPrice,
      item.salePrice,
      item.quantity,
      item.avgStars
    );
    result.push(product);
  }
  return { products: result, totalPages: totalPages, quantity: quantity };
}

export async function searchProduct(
  productName: string,
  typeId: number
): Promise<ProductPage> {
  let url: string = `${API_CONFIG.products}/search/findByProductNameContaining?page=0&size=8&sort=productId,desc`;

  if (productName != "" && typeId === 0) {
    url = `${API_CONFIG.products}/search/findByProductNameContaining?page=0&size=8&sort=productId,desc&productName=${productName}`;
  } else if (productName != "" && typeId > 0) {
    url = `${API_CONFIG.products}/search/findByProductNameContainingAndListTypes_TypeId?page=0&size=8&sort=productId,desc&productName=${productName}&typeId=${typeId}`;
  } else {
    url = `${API_CONFIG.products}/search/findByListTypes_TypeId?page=0&size=8&sort=productId,desc&typeId=${typeId}`;
  }

  return getProduct(url);
}

export async function getAllProducts(
  currentPage: number
): Promise<ProductPage> {
  const url: string = `${API_CONFIG.products}?page=${
    currentPage - 1
  }&size=3&sort=productId,asc`;
  return getProduct(url);
}

export async function getNewProducts(): Promise<ProductPage> {
  const url: string = `${API_CONFIG.products}?size=3&sort=productId,asc`;
  return getProduct(url);
}

export async function getProductById(
  productId: number
): Promise<ProductModel | null> {
  const url = `${API_CONFIG.products}/${productId}`;

  try {
    const response = await request(url);

    return new ProductModel(
      response.productId,
      response.productName,
      response.description,
      response.productionInfor,
      response.originalPrice,
      response.salePrice,
      response.quantity,
      response.avgStars
    );
  } catch (error) {
    console.error("Lỗi:", error);
    return null;
  }
}
