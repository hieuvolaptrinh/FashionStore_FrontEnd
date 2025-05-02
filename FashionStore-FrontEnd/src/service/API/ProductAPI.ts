import {  ProductModelResponse } from "../../models/ProductModel";
import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/RestResponse";
import axios from "axios";

interface ProductPage {
  content: ProductModelResponse[]; // vì backend phân trang
  totalPages: number;
  totalElements: number;
}
async function getProduct(url: string): Promise<ProductPage | null> {
  const response = (await axios.get(url)).data;
  console.log(response);
  return response.data;
}

export async function searchProduct(
  productName: string,
  typeId: number
): Promise<ProductPage> {
  let url: string = `${API_BASE_URL}/api/v1/products/search?page=0&size=8&sort=productId,desc`;

  if (productName != "" && typeId === 0) {
    url = `${API_BASE_URL}/api/v1/products/search?page=0&size=8&sort=productId,desc&productName=${productName}`;
  } else if (productName != "" && typeId > 0) {
    url = `${API_BASE_URL}/api/v1/products/search?page=0&size=8&sort=productId,desc&productName=${productName}&typeId=${typeId}`;
  } else {
    url = `${API_BASE_URL}/api/v1/products/search?page=0&size=8&sort=productId,desc&typeId=${typeId}`;
  }

  const result = await getProduct(url);
  if (!result) {
    throw new Error("Failed to fetch product data.");
  }
  return result;
}

export async function getAllProducts(
  currentPage: number
): Promise<ProductPage> {
  const url: string = `${API_BASE_URL}/api/v1/products?page=${
    currentPage - 1
  }&size=4&sort=productId,asc`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        errorBody?.message || `HTTP Lỗi! Status: ${response.status}`
      );
    }
    const json: RestResponse<ProductPage> = await response.json();
    return json.data;
  } catch (error) {
    console.error("Lỗi khi lấy products:", error);
    throw error;
  }
}

export async function getProductById(
  productId: number
): Promise<ProductModelResponse | null> {
  const url = `${API_BASE_URL}/api/v1/products/${productId}`;
  try {
    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        errorBody?.message || `HTTP Lỗi! Status: ${response.status}`
      );
    }
    const json: RestResponse<ProductModelResponse> = await response.json();
    return json.data;
  } catch (error) {
    console.error("Lỗi:", error);
    return null;
  }
}
