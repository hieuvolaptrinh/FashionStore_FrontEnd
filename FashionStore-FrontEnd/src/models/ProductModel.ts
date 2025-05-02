import Type from "./TypeModel";

export interface ProductResponse {
  productId?: number;
  productName?: string;
  description?: string;
  productionInfor?: string;
  originalPrice?: number;
  salePrice?: number;
  quantity?: number;
  avgStars?: number;
  manufactureDate?: string; // YYYY-MM-DD
  listTypes?: Type[];
  listImages?: string[];
  mainImage?: string;
}

export interface ProductRequest {
  productId?: number;
  productName?: string;
  description?: string;
  productionInfor?: string;
  originalPrice?: number;
  salePrice?: number;
  quantity?: number;
  avgStars?: number;
  manufactureDate?: string; // YYYY-MM-DD
  listTypes?: number[];
  listImages?: string[];
}
