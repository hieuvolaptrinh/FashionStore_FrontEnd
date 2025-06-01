const token = localStorage.getItem("token");

export const isAdmin = () => {
  if (token) {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    // Kiểm tra xem roles có chứa 'ADMIN' không
    return roles.includes("ADMIN");

    // hoặc có thể dùng cách này vì đã lưu vào token từ backend
    //     const userData = jwtDecode(token);  // Giải mã token
    // const roles = (userData.roles + "").split(",");
  }
  return false;
};
