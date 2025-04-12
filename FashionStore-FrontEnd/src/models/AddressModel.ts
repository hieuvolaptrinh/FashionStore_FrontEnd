export interface AddressModel {
  addressId?: number; //optinal để dùng cho trường hợp tạo mới địa chỉ
  streetName: string;
  cityName: string;
  districtName: string;
  wardName: string;
}
