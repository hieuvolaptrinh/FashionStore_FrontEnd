class ImageModel {
  imageId?: number; // ID có thể không có khi tạo mới
  imageName!: string;
  icon!: boolean;
  link?: string; // Optional

  data!: string; // Chứa chuỗi base64 của ảnh

  productId!: number; // Thay vì lưu object Product, chỉ cần lưu ID

  constructor(
    imageName: string,
    icon: boolean,
    data: string,
    productId: number,
    link?: string
  ) {
    this.imageName = imageName;
    this.icon = icon;
    this.data = data;
    this.productId = productId;
    this.link = link;
  }
}
export default ImageModel;
