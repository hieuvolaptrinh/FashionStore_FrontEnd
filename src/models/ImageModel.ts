interface ImageModel {
imageId?: number;
  imageName: string;
  icon: boolean;
  link?: string; // Optional
  data: string; // Chứa chuỗi base64 của ảnh
  productId: number; // Thay vì lưu object Product, chỉ cần lưu ID
}

export default ImageModel;
