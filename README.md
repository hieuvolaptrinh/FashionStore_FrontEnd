# FashionStore Frontend - Website bán hàng thời trang

**Chủ sở hữu:** [Hieuvolaptrinh](https://github.com/hieuvolaptrinh)

## Mô tả dự án:
**FashionStore** là website bán hàng thời trang trực tuyến với các tính năng cơ bản như:
- Mua sắm trực tuyến: Cho phép người dùng duyệt sản phẩm, thêm vào giỏ hàng và thực hiện thanh toán.
- **Giỏ hàng:** Quản lý các sản phẩm đã chọn, thay đổi số lượng hoặc xóa sản phẩm trong giỏ.
- **Thanh toán:** Hỗ trợ thanh toán qua MoMo, VNPAY.
- **Hệ thống quản trị (Admin):** Cung cấp giao diện để quản lý sản phẩm, đơn hàng, người dùng và phân quyền tài khoản.

### Các tính năng chính:
- Giao diện dễ sử dụng cho người dùng mua sắm và quản lý giỏ hàng.
- Hệ thống quản trị cho Admin để theo dõi và quản lý các giao dịch, sản phẩm và người dùng.
- Thanh toán đơn giản với các cổng thanh toán phổ biến như MoMo và VNPAY.
- Quản lý thông tin người dùng và phân quyền rõ ràng.

## Công nghệ sử dụng:
### **Frontend:**
- **React:** Framework chính để xây dựng giao diện người dùng.
- **TypeScript:** Đảm bảo an toàn về kiểu dữ liệu trong suốt quá trình phát triển.
- **Bootstrap:** Tạo giao diện responsive và hiện đại.
- **MaterialUI:** Cung cấp các component UI đẹp và dễ sử dụng.
  
### **Backend:**
- **Java Spring Boot:** Framework backend, xử lý logic nghiệp vụ.
- **Spring Security:** Quản lý xác thực và phân quyền người dùng.
- **Spring Data JPA:** Quản lý kết nối và thao tác dữ liệu với cơ sở dữ liệu.
- **SQL Server:** Cơ sở dữ liệu lưu trữ thông tin sản phẩm và đơn hàng.
- **RESTful API:** Giao tiếp giữa frontend và backend qua các API.

### **Khác:**
- **JWT:** Cung cấp cơ chế bảo mật cho các API.
- **BCrypt:** Mã hóa mật khẩu người dùng.
- **VNPAY API:** Tích hợp thanh toán qua VNPAY.
- **Postman:** Kiểm tra và thử nghiệm API.
- **GitHub:** Quản lý mã nguồn và các đóng góp từ cộng đồng.

## Cài đặt và sử dụng:

### Yêu cầu hệ thống:
- Node.js >= 14.x
- npm >= 6.x (hoặc yarn nếu bạn sử dụng yarn)
- Trình duyệt Chrome hoặc Firefox

### Cài đặt dự án:
1. **Clone repository:**
   ```bash
   git clone https://github.com/hieuvolaptrinh/FashionStore_FrontEnd.git
