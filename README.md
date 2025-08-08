# 🛍️ FashionStore Frontend - Fashion E-commerce Website

**Owner:** [Hieuvolaptrinh](https://github.com/hieuvolaptrinh)

## 📝 Project Description:

**FashionStore** is a modern online fashion e-commerce website with comprehensive features from customer shopping to complete admin management. The system is built with separate frontend-backend architecture, ensuring high performance and good scalability.

### 🎯 Key Features:

#### 👥 For Customers:

- **Registration/Login:** Secure authentication system with email verification
- **Online Shopping:** Browse products by category, search, filter products
- **Smart Shopping Cart:** Manage products, update quantities, automatic calculation
- **Diverse Payment:** Support VNPAY, direct payment
- **Order Management:** Track order status, purchase history
- **Product Reviews:** Write reviews, view reviews from other customers
- **Account Management:** Update personal information, change password

#### 🔧 For Admin:

- **Dashboard:** Revenue overview, detailed statistics
- **Product Management:** Add, edit, delete, activate/deactivate products
- **Order Management:** Process orders, update delivery status
- **Voucher Management:** Create, update discount codes
- **User Management:** Manage customer and shipper accounts
- **Withdrawal System:** Process withdrawal requests, transaction history
- **Revenue Reports:** Detailed statistics by time period

#### 🚚 For Shipper:

- **Order Management:** Receive and process assigned orders
- **Delivery Tracking:** Update delivery status

## 💻 Technologies Used:

### **Frontend:**

- **React 18:** Main framework for building modern user interfaces
- **TypeScript:** Ensures type safety and improves maintainability
- **Bootstrap 5:** CSS framework for responsive design
- **Material-UI (MUI):** Beautiful and professional UI component library
- **React Router:** SPA routing management
- **Axios:** HTTP client for API calls
- **React Hook Form:** Efficient form management
- **React Query:** Server state management and caching

### **Backend:**

- **Java Spring Boot 3:** Main backend framework
- **Spring Security 6:** Authentication and authorization management
- **Spring Data JPA:** ORM and database management
- **Spring Mail:** Automated email sending
- **SQL Server:** Main database
- **JWT (JSON Web Token):** Token-based authentication
- **BCrypt:** Password encryption
- **Jackson:** JSON serialization/deserialization

### **Payment Integration:**

- **VNPAY API:** Online payment gateway
- **RESTful API:** Standard API architecture

### **Tools & DevOps:**

- **Vite:** Fast build tool and dev server
- **ESLint & Prettier:** Code formatting and linting
- **Postman:** API testing and documentation
- **Git & GitHub:** Version control and collaboration
- **Docker:** Containerization (planned)

## 📸 Application Interface:

### 🔐 Authentication and Security

#### Login

![Login](preview/Login.png)

#### Registration

![Registration](preview/Register.png)

#### Forgot Password

![Forgot Password](preview/ForgotPassword.png)

#### Reset Password

![Reset Password](preview/RestPassword.png)

#### Registration Email

![Registration Email](preview/Mail%20đăng%20kí%20tài%20khoản.png)

#### Password Recovery Email

![Password Recovery Email](preview/Mail%20lấy%20lại%20mật%20khẩu.png)

#### Account Activation Success

![Account Activation](preview/KichHoatTaiKhoanThanhCong.png)

### 🛒 Customer Interface

#### Product Homepage

![Homepage](preview/TrangChuSanPham.png)

#### Product Details

![Product Details](preview/ChiTietSanPham.png)

#### Product Description

![Product Description](preview/mô%20tả%20sản%20phẩm.png)

#### Product Reviews

![Product Reviews](preview/DanhGiaSanPham.png)

#### Shopping Cart

![Shopping Cart](preview/Giỏ%20hàng.png)

### 💳 Payment

#### Order Payment

![Order Payment](preview/Thanh%20toán%20đơn%20hàng.png)

#### Direct Payment

![Direct Payment](preview/ThanhToanTrucTiep.png)

#### VNPAY Payment

![VNPAY Payment](preview/Thanh%20toán%20qua%20ví%20VNPAY.png)

#### Payment Success

![Payment Success](preview/ThanhToanThanhCong.png)

#### Payment Failed

![Payment Failed](preview/ThanhToanThatBai.png)

### 👤 Account Management

#### Personal Information

![Personal Info](preview/Thông%20tin%20cá%20nhân.png)

#### Edit Personal Information

![Edit Personal Info](preview/chỉnh%20sửa%20thông%20tin%20cá%20nhân.png)

#### Edit User Information

![Edit User Info](preview/ChinhSuaThongTinNguoiDung.png)

#### Order List

![Order List](preview/Danh%20sách%20đơn%20hàng.png)

#### View Notifications

![View Notifications](preview/XemThongBao.png)

### 🚚 Shipper Interface

#### Received Orders List

![Shipper Orders](preview/DanhSachDonHangDaNhanCuaShipper.png)

#### Payment History

![Payment History](preview/LichSuNhanTien.png)

### 🔧 Admin Interface

#### Revenue Overview

![Revenue Overview](preview/Tổng%20quan%20doanh%20thu%20-%20admin.png)

#### Detailed Revenue

![Detailed Revenue](preview/DOanh%20thu.png)

#### Product Management

![Product List](preview/DanhSachSanPham.png)

#### Edit Product Information

![Edit Product](preview/Sửa%20thông%20tin%20sản%20phẩm.png)

#### Products on Sale

![Products on Sale](preview/dangBanSanPham.png)

#### Product Activation Failed

![Activation Failed](preview/Kích%20hoạt%20sản%20phẩm%20thất%20bại.png)

#### Return Product

![Return Product](preview/TraSanPham.png)

#### Order Management (Admin)

![Admin Orders](preview/Đơn%20hàng%20admin%20quản%20lý.png)

#### Voucher List

![Voucher List](preview/DanhSachVoucher.png)

#### Update Voucher

![Update Voucher](preview/CapNhatVoucher.png)

#### User List

![User List](preview/DanhSachNguoiDung.png)

#### Withdrawal

![Withdrawal](preview/RutTien.png)

#### Withdrawal History

![Withdrawal History](preview/Lịch%20sử%20rút%20tiền.png)

### 🗂️ Database ERD

![Database ERD](preview/Erd%20backend.png)

## 🏗️ Project Structure:

```
FashionStore-FrontEnd/
├── public/                    # Static assets
│   ├── images/               # Product images
│   └── vite.svg             # Vite logo
├── src/
│   ├── components/          # Reusable components
│   │   ├── Admin/          # Admin-specific components
│   │   ├── Client/         # Client-specific components
│   │   └── Shipper/        # Shipper-specific components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Layout components
│   │   ├── Admin/          # Admin layout
│   │   └── Client/         # Client layout
│   ├── models/             # TypeScript interfaces
│   ├── pages/              # Page components
│   │   ├── Admin/          # Admin pages
│   │   ├── Client/         # Client pages
│   │   └── Shipper/        # Shipper pages
│   ├── routes/             # Route configurations
│   ├── service/            # API services
│   │   └── API/            # API endpoints
│   ├── utils/              # Utility functions
│   └── assets/             # Stylesheets and resources
├── preview/                # Screenshots for README
└── package.json           # Dependencies and scripts
```

## 🚀 Key Features:

### 🔒 High Security:

- JWT token authentication
- Bcrypt password hashing
- Email verification
- Role-based access control
- CORS protection

### 📱 Responsive Design:

- Mobile-first approach
- Bootstrap 5 responsive grid
- Cross-browser compatibility
- Touch-friendly interface

### ⚡ Optimized Performance:

- React 18 with Concurrent Features
- Lazy loading components
- Image optimization
- API response caching
- Code splitting

### 🔄 Real-time Updates:

- Order status tracking
- Live notifications
- Inventory updates
- Payment status

## 🛠️ Available Scripts:

```bash
# Development
npm run dev          # Run development server
npm run build        # Build production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
```

## 🔗 Important Links:

- **Frontend Repository:** [FashionStore_FrontEnd](https://github.com/hieuvolaptrinh/FashionStore_FrontEnd)
- **Backend Repository:** [FashionStore_BackEnd](https://github.com/hieuvolaptrinh/FashionStore_BackEnd)
- **Live Demo:** [Coming Soon]
- **API Documentation:** [Postman Collection](link-to-postman)

## 📋 Roadmap:

### ✅ Completed:

- [x] User authentication & authorization
- [x] Product catalog with search & filter
- [x] Shopping cart functionality
- [x] Order management system
- [x] Payment integration (VNPAY)
- [x] Admin dashboard
- [x] Responsive design
- [x] Email notifications

### 🔄 In Progress:

- [ ] Real-time chat support
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Performance optimization

### 📅 Planned:

- [ ] Multi-language support
- [ ] PWA features
- [ ] Social media integration
- [ ] Advanced recommendation system
- [ ] Inventory forecasting

## 🤝 Contributing:

We always welcome contributions from the community!

### How to contribute:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

### Contribution guidelines:

- Follow coding standards
- Write unit tests for new features
- Update documentation
- Follow commit message convention

## 📄 License:

This project is distributed under the MIT License. See `LICENSE` file for more details.

## 📞 Contact:

- **Developer:** Hieuvolaptrinh
- **Email:** [vndhieuak@gmail.com]
- **GitHub:** [@hieuvolaptrinh](https://github.com/hieuvolaptrinh)
- **Facebook:** [[Hiếu Võ](https://www.facebook.com/HieuVo.hv)]

## 🙏 Acknowledgments:

- Thanks to [React Team](https://reactjs.org/) for the amazing framework
- Thanks to [Spring Boot](https://spring.io/projects/spring-boot) for the powerful backend framework
- Thanks to [VNPAY](https://vnpay.vn/) for the payment gateway
- Thanks to the open source community for useful libraries

---

⭐ **If this project is useful, please give it a Star to support me!** ⭐

- **VIETCOMBANK** >1025212713- Võ Nguyễn Đại Hiếu

---

# 🛍️ FashionStore Frontend - Website bán hàng thời trang (Tiếng Việt)

**Chủ sở hữu:** [Hieuvolaptrinh](https://github.com/hieuvolaptrinh)

## 📝 Mô tả dự án:

**FashionStore** là website bán hàng thời trang trực tuyến hiện đại với đầy đủ tính năng từ mua sắm cho khách hàng đến quản lý toàn diện cho admin. Hệ thống được xây dựng với kiến trúc frontend-backend riêng biệt, đảm bảo hiệu suất cao và khả năng mở rộng tốt.

### 🎯 Tính năng chính:

#### 👥 Dành cho khách hàng:

- **Đăng ký/Đăng nhập:** Hệ thống xác thực an toàn với email verification
- **Mua sắm trực tuyến:** Duyệt sản phẩm theo danh mục, tìm kiếm, lọc sản phẩm
- **Giỏ hàng thông minh:** Quản lý sản phẩm, cập nhật số lượng, tính toán tự động
- **Thanh toán đa dạng:** Hỗ trợ VNPAY, thanh toán trực tiếp
- **Quản lý đơn hàng:** Theo dõi trạng thái đơn hàng, lịch sử mua hàng
- **Đánh giá sản phẩm:** Viết review, xem đánh giá từ khách hàng khác
- **Quản lý tài khoản:** Cập nhật thông tin cá nhân, đổi mật khẩu

#### 🔧 Dành cho Admin:

- **Dashboard:** Tổng quan doanh thu, thống kê chi tiết
- **Quản lý sản phẩm:** Thêm, sửa, xóa, kích hoạt/vô hiệu hóa sản phẩm
- **Quản lý đơn hàng:** Xử lý đơn hàng, cập nhật trạng thái giao hàng
- **Quản lý voucher:** Tạo, cập nhật mã giảm giá
- **Quản lý người dùng:** Quản lý tài khoản khách hàng và shipper
- **Hệ thống rút tiền:** Xử lý yêu cầu rút tiền, lịch sử giao dịch
- **Báo cáo doanh thu:** Thống kê chi tiết theo thời gian

#### 🚚 Dành cho Shipper:

- **Quản lý đơn hàng:** Nhận và xử lý đơn hàng được phân công
- **Theo dõi giao hàng:** Cập nhật trạng thái giao hàng

## 💻 Công nghệ sử dụng:

### **Frontend:**

- **React 18:** Framework chính để xây dựng giao diện người dùng hiện đại
- **TypeScript:** Đảm bảo an toàn về kiểu dữ liệu và tăng tính bảo trì
- **Bootstrap 5:** Framework CSS responsive design
- **Material-UI (MUI):** Thư viện component UI đẹp và chuyên nghiệp
- **React Router:** Quản lý định tuyến SPA
- **Axios:** HTTP client để gọi API
- **React Hook Form:** Quản lý form hiệu quả
- **React Query:** Quản lý state server và caching

### **Backend:**

- **Java Spring Boot 3:** Framework backend chính
- **Spring Security 6:** Quản lý authentication và authorization
- **Spring Data JPA:** ORM và quản lý database
- **Spring Mail:** Gửi email tự động
- **SQL Server:** Cơ sở dữ liệu chính
- **JWT (JSON Web Token):** Token-based authentication
- **BCrypt:** Mã hóa mật khẩu
- **Jackson:** JSON serialization/deserialization

### **Payment Integration:**

- **VNPAY API:** Cổng thanh toán trực tuyến
- **RESTful API:** Kiến trúc API chuẩn

### **Tools & DevOps:**

- **Vite:** Build tool và dev server nhanh
- **ESLint & Prettier:** Code formatting và linting
- **Postman:** API testing và documentation
- **Git & GitHub:** Version control và collaboration
- **Docker:** Containerization (planned)

## 🚀 Cài đặt và sử dụng:

### ⚙️ Yêu cầu hệ thống:

- **Node.js:** >= 18.x
- **npm:** >= 8.x (hoặc yarn >= 1.22.x)
- **Trình duyệt:** Chrome, Firefox, Safari (phiên bản mới nhất)
- **RAM:** Tối thiểu 4GB
- **Dung lượng:** 500MB trống

### 📦 Cài đặt dự án:

1. **Clone repository:**

   ```bash
   git clone https://github.com/hieuvolaptrinh/FashionStore_FrontEnd.git
   cd FashionStore_FrontEnd
   ```

2. **Cài đặt dependencies:**

   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Cấu hình environment:**

   ```bash
   # Tạo file .env.local
   cp .env.example .env.local

   # Cập nhật các biến môi trường
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_VNPAY_URL=https://sandbox.vnpayment.vn
   ```

4. **Chạy ứng dụng:**

   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm run preview
   ```

5. **Truy cập ứng dụng:**
   - Development: `http://localhost:5173`
   - Production: Theo cấu hình server

## 🏗️ Cấu trúc dự án:

```
FashionStore-FrontEnd/
├── public/                    # Static assets
│   ├── images/               # Product images
│   └── vite.svg             # Vite logo
├── src/
│   ├── components/          # Reusable components
│   │   ├── Admin/          # Admin-specific components
│   │   ├── Client/         # Client-specific components
│   │   └── Shipper/        # Shipper-specific components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Layout components
│   │   ├── Admin/          # Admin layout
│   │   └── Client/         # Client layout
│   ├── models/             # TypeScript interfaces
│   ├── pages/              # Page components
│   │   ├── Admin/          # Admin pages
│   │   ├── Client/         # Client pages
│   │   └── Shipper/        # Shipper pages
│   ├── routes/             # Route configurations
│   ├── service/            # API services
│   │   └── API/            # API endpoints
│   ├── utils/              # Utility functions
│   └── assets/             # Stylesheets and resources
├── preview/                # Screenshots for README
└── package.json           # Dependencies and scripts
```

## 🚀 Tính năng nổi bật:

### 🔒 Bảo mật cao:

- JWT token authentication
- Bcrypt password hashing
- Email verification
- Role-based access control
- CORS protection

### 📱 Responsive Design:

- Mobile-first approach
- Bootstrap 5 responsive grid
- Cross-browser compatibility
- Touch-friendly interface

### ⚡ Hiệu suất tối ưu:

- React 18 với Concurrent Features
- Lazy loading components
- Image optimization
- API response caching
- Code splitting

### 🔄 Real-time Updates:

- Order status tracking
- Live notifications
- Inventory updates
- Payment status

## 🛠️ Scripts có sẵn:

```bash
# Development
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview production build
npm run lint         # Chạy ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
```

## 🔗 Liên kết quan trọng:

- **Frontend Repository:** [FashionStore_FrontEnd](https://github.com/hieuvolaptrinh/FashionStore_FrontEnd)
- **Backend Repository:** [FashionStore_BackEnd](https://github.com/hieuvolaptrinh/FashionStore_BackEnd)
- **Live Demo:** [Coming Soon]
- **API Documentation:** [Postman Collection](link-to-postman)

## 📋 Roadmap:

### ✅ Đã hoàn thành:

- [x] Xác thực & phân quyền người dùng
- [x] Catalog sản phẩm với tìm kiếm & lọc
- [x] Tính năng giỏ hàng
- [x] Hệ thống quản lý đơn hàng
- [x] Tích hợp thanh toán (VNPAY)
- [x] Admin dashboard
- [x] Responsive design
- [x] Email notifications

### 🔄 Đang phát triển:

- [ ] Hỗ trợ chat real-time
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Tối ưu hiệu suất

### 📅 Dự định:

- [ ] Hỗ trợ đa ngôn ngữ
- [ ] PWA features
- [ ] Tích hợp social media
- [ ] Hệ thống gợi ý thông minh
- [ ] Dự báo kho hàng

## 🤝 Đóng góp:

Chúng tôi luôn chào đón các đóng góp từ cộng đồng!

### Cách đóng góp:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### Quy tắc đóng góp:

- Tuân thủ coding standards
- Viết unit tests cho tính năng mới
- Cập nhật documentation
- Follow commit message convention

## 📄 License:

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ:

- **Developer:** Hieuvolaptrinh
- **Email:** [vndhieuak@gmail.com]
- **GitHub:** [@hieuvolaptrinh](https://github.com/hieuvolaptrinh)
- **Facebook:** [[Hiếu Võ](https://www.facebook.com/HieuVo.hv)]

## 🙏 Acknowledgments:

- Cảm ơn [React Team](https://reactjs.org/) vì framework tuyệt vời
- Cảm ơn [Spring Boot](https://spring.io/projects/spring-boot) vì backend framework mạnh mẽ
- Cảm ơn [VNPAY](https://vnpay.vn/) vì payment gateway
- Cảm ơn cộng đồng open source vì các thư viện hữu ích

---

⭐ **Nếu dự án này hữu ích, hãy cho một Star để ủng hộ tôi!** ⭐

- **VIETCOMBANK** >1025212713- Võ Nguyễn Đại Hiếu

## 🚀 Installation and Usage:

### ⚙️ System Requirements:

- **Node.js:** >= 18.x
- **npm:** >= 8.x (or yarn >= 1.22.x)
- **Browser:** Chrome, Firefox, Safari (latest versions)
- **RAM:** Minimum 4GB
- **Storage:** 500MB free space

### 📦 Project Installation:

1. **Clone repository:**

   ```bash
   git clone https://github.com/hieuvolaptrinh/FashionStore_FrontEnd.git
   cd FashionStore_FrontEnd
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment configuration:**

   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Update environment variables
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_VNPAY_URL=https://sandbox.vnpayment.vn
   ```

4. **Run application:**

   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm run preview
   ```

5. **Access application:**
   - Development: `http://localhost:5173`
   - Production: According to server configuration
