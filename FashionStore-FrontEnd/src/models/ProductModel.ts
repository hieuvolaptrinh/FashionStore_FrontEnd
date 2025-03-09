class ProductModel {
  productId: number;
  productName?: string; // có thể bị null
  description?: string;
  originalPrice?: number;
  salePrice?: number;
  quantity?: number;
  avgStars?: number;

  constructor(
    productID: number,
    productName: string,
    description: string,
    originalPrice: number,
    salePrice: number,
    quantity: number,
    avgStars: number
  ) {
    this.productId = productID;
    this.productName = productName;
    this.description = description;
    this.originalPrice = originalPrice;
    this.salePrice = salePrice;
    this.quantity = quantity;
    this.avgStars = avgStars;
  }
}

export default ProductModel;
