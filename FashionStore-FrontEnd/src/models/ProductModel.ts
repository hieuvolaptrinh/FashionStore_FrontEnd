interface ProductModel {
  productId?: number;
  productName?: string;
  description?: string;
  productionInfor?: string;
  originalPrice?: number;
  salePrice?: number;
  quantity?: number;
  avgStars?: number;
  manufactureDate?: string; // YYYY-MM-DD
  listTypes: number[];
  listImages?: string[];
  mainImage: string;
}

export default ProductModel;
