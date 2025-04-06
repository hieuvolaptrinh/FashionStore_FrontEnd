import ProductModel from "./ProductModel";

export interface CartDetailModel {
  cartDetailId: number;
  quantity: number;
  price: number;
  product: ProductModel;
}

export interface CartModel {
  cartId: number;
  createAt: number;
  updateAt: number;
  totalPrices: number;
}
