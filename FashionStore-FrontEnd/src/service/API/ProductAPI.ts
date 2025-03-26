import { request } from "../Request";
import ProductModel from "../../models/ProductModel";
import { API_BASE_URL, API_CONFIG } from "../../apiConfig";

interface ProductPage {
  content: ProductModel[];
  totalPages: number;
  totalElements: number;
}

// Hàm getProduct đã sửa để phù hợp với cấu trúc Spring Pagination
async function getProduct(url: string): Promise<ProductPage> {
  const response = await request<ProductPage>(url);

  return {
    content: response.content.map(
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
    totalPages: response.totalPages,
    totalElements: response.totalElements,
  };
}

interface ProductPage2 {
  products: ProductModel[];
  totalPages: number;
  totalElements: number;
}

// api RepositoryRestResource
async function getProduct2(url: string): Promise<ProductPage2> {
  console.log("url", url);
  try {
    const response = await fetch(url);
    const responseData = await response.json();

    return {
      products: responseData._embedded.products.map(
        (item: ProductModel) =>
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
      totalPages: responseData.page.totalPages,
      totalElements: responseData.page.totalElements,
    };
  } catch (error) {
    console.error("Lỗi:", error);
    return {
      products: [],
      totalPages: 0,
      totalElements: 0,
    };
  }
}

export async function searchProduct(
  productName: string,
  typeId: number
): Promise<ProductPage2> {
  let url: string = `${API_CONFIG.products}/search/findByProductNameContaining?page=0&size=8&sort=productId,desc`;

  if (productName != "" && typeId === 0) {
    url = `${API_CONFIG.products}/search/findByProductNameContaining?page=0&size=8&sort=productId,desc&productName=${productName}`;
  } else if (productName != "" && typeId > 0) {
    url = `${API_CONFIG.products}/search/findByProductNameContainingAndListTypes_TypeId?page=0&size=8&sort=productId,desc&productName=${productName}&typeId=${typeId}`;
  } else {
    url = `${API_CONFIG.products}/search/findByListTypes_TypeId?page=0&size=8&sort=productId,desc&typeId=${typeId}`;
  }

  return getProduct2(url);
}

export async function getAllProducts(
  currentPage: number
): Promise<ProductPage> {
  const url: string = `${API_BASE_URL}/api/v1/products?page=${
    currentPage - 1
  }&size=4&sort=productId,asc`;
  return getProduct(url);
}

export async function getNewProducts(): Promise<ProductPage> {
  const url: string = `${API_BASE_URL}/api/v1/products?size=3&sort=productId,asc`;
  return getProduct(url);
}

export async function getProductById(
  productId: number
): Promise<ProductModel | null> {
  const url = `${API_CONFIG.products}/${productId}`;

  try {
    const response = await fetch(url);
    const responseData = await response.json();
    return new ProductModel(
      responseData.productId,
      responseData.productName,
      responseData.description,
      responseData.productionInfor,
      responseData.originalPrice,
      responseData.salePrice,
      responseData.quantity,
      responseData.avgStars
    );
  } catch (error) {
    console.error("Lỗi:", error);
    return null;
  }
}
