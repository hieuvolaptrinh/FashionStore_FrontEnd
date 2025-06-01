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
  listImages?: { imageId?: number; link?: string }[];
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
  deletedImageIds?: number[]; // Danh sách ID của các hình ảnh cần xóa
}
