import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validatePassword, validateRePassword } from "../utils/Validation";
import {
  checkEmail,
  checkUserName,
  registerUser,
} from "../service/API/UserAPI";
import getBase64 from "../utils/getBase64";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // error
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    checkEmail(email)
      .then((res) => {
        if (res) {
          setErrorEmail("Email đã tồn tại");
        } else {
          setErrorEmail("");
        }
      })
      .catch((error) => {
        console.error("Lỗi: ", error);
      });
    checkUserName(userName)
      .then((res) => {
        if (res) {
          setErrorUserName("Tên đăng nhập đã tồn tại");
        } else {
          setErrorUserName("");
        }
      })
      .catch((error) => {
        console.error("Lỗi: ", error);
      });
  }, [email, userName, password, rePassword]);

  // xử lý ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorPassword(validatePassword(e.target.value));

    if (rePassword) {
      setErrorRePassword(validateRePassword(e.target.value, rePassword));
    }
  };
  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
    setErrorRePassword(validateRePassword(password, e.target.value));
  };

  // xử lý nút đăng ký
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true); // Bắt đầu loading
    e.preventDefault();
    let hasError = false;

    if (!userName.trim()) {
      setErrorUserName("Tên đăng nhập không được để trống");
      hasError = true;
    } else {
      const userNameExists = await checkUserName(userName);
      if (userNameExists) hasError = true;
    }
    if (!email.trim()) {
      setErrorEmail("Email không được để trống");
      hasError = true;
    } else {
      const emailExists = await checkEmail(email);
      if (emailExists) hasError = true;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorPassword(passwordError);
    }

    const rePasswordError = validateRePassword(password, rePassword);
    if (rePasswordError) {
      setErrorRePassword(rePasswordError);
      hasError = true;
    }
    if (hasError) {
      console.log("Form có lỗi, không submit!");
      return;
    }

    // Nếu không có lỗi, thực hiện submit dữ liệu
    const base64Avatar = avatar ? await getBase64(avatar) : null;
    console.log("Base64 Avatar: ", base64Avatar);
    const message = await registerUser({
      email: email,
      phoneNumber: phone,
      lastName: lastName,
      firstName: firstName,
      userName: userName,
      password: password,
      avatarBase64: base64Avatar,
    });
    setNotification(message);
    setIsLoading(false); // Kết thúc loading
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" component="h1">
                Đăng Ký Tài Khoản
              </Typography>
            </Box>
            <Box sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Thông tin cá nhân */}
                  <div className="col-12 mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <TextField
                          fullWidth
                          label="Họ"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Nhập họ của bạn"
                          margin="normal"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          fullWidth
                          label="Tên"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nhập tên của bạn"
                          margin="normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thông tin tài khoản */}
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-6">
                        <TextField
                          fullWidth
                          label="Tên đăng nhập"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Nhập tên đăng nhập"
                          margin="normal"
                          error={!!errorUserName}
                          helperText={errorUserName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>

                      <div className="col-6">
                        <TextField
                          fullWidth
                          label="Số điện thoại"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Nhập số điện thoại"
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Email"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@email.com"
                          margin="normal"
                          error={!!errorEmail}
                          helperText={errorEmail}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thông tin mật khẩu */}
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <TextField
                          fullWidth
                          label="Mật khẩu"
                          required
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Nhập mật khẩu"
                          margin="normal"
                          error={!!errorPassword}
                          helperText={errorPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          fullWidth
                          label="Xác nhận mật khẩu"
                          required
                          type={showRePassword ? "text" : "password"}
                          value={rePassword}
                          onChange={handleRePasswordChange}
                          placeholder="Xác nhận mật khẩu"
                          margin="normal"
                          error={!!errorRePassword}
                          helperText={errorRePassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowRePassword(!showRePassword)
                                  }
                                  edge="end"
                                >
                                  {showRePassword ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* HÌNH ẢNH */}
                  <div className="col-12">
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <TextField
                        fullWidth
                        type="file"
                        onChange={handleAvatarChange}
                        inputProps={{ accept: "image/*" }}
                        margin="normal"
                      />
                      {avatar && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Xem trước ảnh
                          </Typography>
                          <Box
                            component="img"
                            src={URL.createObjectURL(avatar)}
                            alt="preview"
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              border: "1px solid #ddd",
                              borderRadius: 1,
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </div>

                  {/* Điều khoản và điều kiện */}
                  <div className="col-12 mb-3">
                    <FormControlLabel
                      control={<Checkbox required />}
                      label={
                        <Typography variant="body2">
                          Tôi đồng ý với{" "}
                          <Link to="#" style={{ textDecoration: "none" }}>
                            Điều khoản dịch vụ
                          </Link>{" "}
                          và{" "}
                          <Link to="#" style={{ textDecoration: "none" }}>
                            Chính sách bảo mật
                          </Link>
                        </Typography>
                      }
                    />
                  </div>

                  {/* Loading */}
                  {isLoading && (
                    <Box sx={{ width: "100%", mb: 2 }}>
                      <Alert
                        severity="info"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Kiểm tra thông tin người dùng...
                      </Alert>
                    </Box>
                  )}

                  {/* Nút đăng ký */}
                  <div className="col-12">
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isLoading}
                      sx={{
                        borderRadius: "25px",
                        py: 1.5,
                        mt: 2,
                      }}
                    >
                      Đăng Ký
                    </Button>
                    {notification && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        {notification}
                      </Alert>
                    )}
                  </div>
                </div>
              </form>
            </Box>
            <Box sx={{ bgcolor: "grey.100", p: 2, textAlign: "center" }}>
              <Typography variant="body1">
                Đã có tài khoản?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Đăng nhập
                </Link>
              </Typography>
            </Box>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Register;
