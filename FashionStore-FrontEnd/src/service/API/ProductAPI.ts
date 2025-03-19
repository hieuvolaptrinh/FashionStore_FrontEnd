import { request } from "../Request";
import ProductModel from "../../models/ProductModel";
import { API_CONFIG } from "../../apiConfig";

interface ProductPage {
  products: ProductModel[];
  totalPages: number;
  quantity: number;
}
// Định nghĩa kiểu dữ liệu chính xác từ API
interface ProductResponse {
  _embedded: { products: ProductModel[] };
  page: { totalPages: number; totalElements: number };
}

async function getProduct(url: string): Promise<ProductPage> {
  const response = await request<ProductResponse>(url);

  return {
    products: response._embedded.products.map(
      (item) =>
        new ProductModel(
          item.productId,
          item.productName,
          item.description,
          item.productionInfor,
          item.originalPrice,
          item.salePrice,
          item.quantity,
          item.avgStars
        )
    ),
    totalPages: response.page.totalPages,
    quantity: response.page.totalElements,
  };
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
    const response = await request<ProductModel>(url);

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
