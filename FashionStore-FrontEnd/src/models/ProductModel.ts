interface ProductModel {
  productId?: number;
  productName: string;
  description: string;
  productionInfor: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  avgStars: number;
  manufactureDate: string; // YYYY-MM-DD
  listTypes: number[];
  listImages?: string[];
}

export default ProductModel;
// ProductProps interface để tạo sản phẩm mới
