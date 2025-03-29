class ProductModel {
  productId: number;
  productName: string;
  description: string;
  productionInfor: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  avgStars: number;
  manufactureDate: string; // YYYY-MM-DD
  listTypes: number[] = []; 
  listImages: File[] = []; 

  constructor(
    productId: number = 0,
    productName: string = "Không có tên",
    description: string = "Không có mô tả",
    productionInfor: string = "Không có thông tin sản xuất",
    originalPrice: number = 0,
    salePrice: number = 0,
    quantity: number = 0,
    avgStars: number = 0,
    manufactureDate: string = ""
  ) {
    this.productId = productId;
    this.productName = productName;
    this.description = description;
    this.productionInfor = productionInfor;
    this.originalPrice = originalPrice;
    this.salePrice = salePrice;
    this.quantity = quantity;
    this.avgStars = avgStars;
    this.manufactureDate = manufactureDate;
  }
}

export default ProductModel;
