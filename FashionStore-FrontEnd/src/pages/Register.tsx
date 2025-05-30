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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Paper
            elevation={12}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.2), 0 10px 25px rgba(58, 134, 255, 0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 4,
                background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 10px rgba(58, 134, 255, 0.25)",
              }}
            >
              Đăng Ký Tài Khoản
            </Typography>

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
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
                        }}
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
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin tài khoản */}
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-md-6">
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
                              <PersonIcon sx={{ color: "#3a86ff" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
                        }}
                      />
                    </div>

                    <div className="col-md-6">
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
                              <PhoneIcon sx={{ color: "#3a86ff" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
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
                              <EmailIcon sx={{ color: "#3a86ff" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin mật khẩu */}
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6">
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
                              <LockIcon sx={{ color: "#3a86ff" }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleShowPassword}
                                edge="end"
                                sx={{
                                  color: "#3a86ff",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "rgba(58, 134, 255, 0.08)",
                                    transform: "scale(1.1)",
                                  },
                                }}
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
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-6">
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
                              <LockIcon sx={{ color: "#3a86ff" }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleShowRePassword}
                                edge="end"
                                sx={{
                                  color: "#3a86ff",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "rgba(58, 134, 255, 0.08)",
                                    transform: "scale(1.1)",
                                  },
                                }}
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
                        sx={{
                          mb: 2.5,
                          "& .MuiOutlinedInput-root": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3a86ff",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 8px 20px rgba(58, 134, 255, 0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0b4f9e",
                              borderWidth: "2px",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0b4f9e",
                            fontWeight: "600",
                          },
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
                      sx={{
                        mb: 2.5,
                        "& .MuiOutlinedInput-root": {
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 6px 16px rgba(58, 134, 255, 0.1)",
                          },
                        },
                      }}
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
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
                        <Box
                          component={Link}
                          to="#"
                          sx={{
                            color: "#3a86ff",
                            fontWeight: "bold",
                            textDecoration: "none",
                            "&:hover": {
                              color: "#0b4f9e",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Điều khoản dịch vụ
                        </Box>{" "}
                        và{" "}
                        <Box
                          component={Link}
                          to="#"
                          sx={{
                            color: "#3a86ff",
                            fontWeight: "bold",
                            textDecoration: "none",
                            "&:hover": {
                              color: "#0b4f9e",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Chính sách bảo mật
                        </Box>
                      </Typography>
                    }
                  />
                </div>

                {/* Loading */}
                {isLoading && (
                  <Box sx={{ width: "100%", mb: 2 }}>
                    <Alert
                      severity="info"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
                      }}
                    >
                      <CircularProgress
                        size={20}
                        sx={{
                          mr: 1,
                          filter:
                            "drop-shadow(0 2px 4px rgba(33, 150, 243, 0.2))",
                        }}
                      />
                      Kiểm tra thông tin người dùng...
                    </Alert>
                  </Box>
                )}

                {/* Notification */}
                {notification && (
                  <Alert
                    severity="success"
                    sx={{
                      mb: 2.5,
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
                    }}
                  >
                    {notification}
                  </Alert>
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
                      mt: 1.5,
                      mb: 3.5,
                      py: 1.5,
                      background:
                        "linear-gradient(45deg, #3a86ff 0%, #0b4f9e 100%)",
                      borderRadius: 2,
                      fontWeight: 700,
                      boxShadow:
                        "0 10px 20px rgba(58, 134, 255, 0.3), 0 6px 10px rgba(0, 0, 0, 0.1)",
                      textTransform: "none",
                      fontSize: 16,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                        boxShadow:
                          "0 14px 28px rgba(58, 134, 255, 0.4), 0 10px 15px rgba(0, 0, 0, 0.12)",
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        boxShadow: "0 6px 12px rgba(58, 134, 255, 0.2)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Đăng Ký
                  </Button>
                </div>
              </div>
            </form>

            <Paper
              elevation={4}
              sx={{
                textAlign: "center",
                py: 2.5,
                bgcolor: "#f8f9fa",
                borderRadius: 2,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 24px rgba(58, 134, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Typography variant="body2">
                Đã có tài khoản?{" "}
                <Box
                  component={Link}
                  to="/login"
                  sx={{
                    color: "#3a86ff",
                    fontWeight: "bold",
                    textDecoration: "none",
                    position: "relative",
                    "&:hover": {
                      color: "#0b4f9e",
                      textDecoration: "underline",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, #3a86ff, transparent)",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  Đăng nhập ngay
                </Box>
              </Typography>
            </Paper>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Register;
