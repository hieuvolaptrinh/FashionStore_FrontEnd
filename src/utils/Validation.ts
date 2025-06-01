// utils/validation.ts

export const validatePassword = (password: string): string => {
  if (!password) return "Mật khẩu không được để trống";
  if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
  if (!/[A-Z]/.test(password))
    return "Mật khẩu phải chứa ít nhất một chữ in hoa";
  if (!/[a-z]/.test(password))
    return "Mật khẩu phải chứa ít nhất một chữ thường";
  if (!/\d/.test(password)) return "Mật khẩu phải chứa ít nhất một số";
  // if (!/[!@#$%^&*]/.test(password))
  //   return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)";
  return ""; // Không có lỗi
};

export const validateRePassword = (
  password: string,
  rePassword: string
): string => {
  if (!rePassword) return "Vui lòng nhập lại mật khẩu";
  if (password !== rePassword) return "Mật khẩu nhập lại không khớp";
  return ""; // Không có lỗi
};
