/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { LockReset } from "@mui/icons-material";
import { forgotPassword } from "../../service/API/UserAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email
  const validateEmail = (value: string) => {
    if (!value) return "Email không được để trống";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Email không hợp lệ";
    return "";
  };

  // Validate username
  const validateUserName = (value: string) => {
    if (!value) return "Tên đăng nhập không được để trống";
    return "";
  };

  // Xử lý thay đổi email
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setErrorEmail(validateEmail(e.target.value));
  };

  // Xử lý thay đổi username
  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
    setErrorUserName(validateUserName(e.target.value));
  };

  // Xử lý submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Kiểm tra validate
    const emailError = validateEmail(email);
    const userNameError = validateUserName(userName);

    if (emailError || userNameError) {
      setErrorEmail(emailError);
      setErrorUserName(userNameError);
      setError("Vui lòng kiểm tra lại thông tin.");
      setLoading(false);
      return;
    }

    try {
      const result = await forgotPassword(email, userName);
      if (typeof result === "string" && !result.includes("error")) {
        setSuccess(
          result ||
            "Yêu cầu đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra email của bạn."
        );
        setEmail("");
        setUserName("");
      } else {
        setError(result || "Không thể gửi yêu cầu. Vui lòng thử lại.");
      }
    } catch (err: any) {
      setError("Lỗi kết nối đến server. Vui lòng thử lại sau." + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Tối ưu SEO
  useEffect(() => {
    document.title = "Quên mật khẩu - Tên Công Ty";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Gửi yêu cầu đặt lại mật khẩu để lấy lại quyền truy cập tài khoản của bạn.";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
            {/* Header with Icon */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mb: 2,
              }}
            >
              <LockReset
                sx={{
                  fontSize: 60,
                  color: "#3a86ff",
                  mb: 2,
                  filter: "drop-shadow(0 4px 8px rgba(58, 134, 255, 0.3))",
                }}
              />
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background:
                    "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 10px rgba(58, 134, 255, 0.25)",
                }}
              >
                Quên mật khẩu
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666666",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                Nhập email và tên đăng nhập để nhận liên kết đặt lại mật khẩu.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Nhập địa chỉ email"
                required
                disabled={loading}
                error={!!errorEmail}
                helperText={errorEmail}
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
                    "&.Mui-error fieldset": {
                      borderColor: "#f44336",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0b4f9e",
                    fontWeight: "600",
                  },
                  "& .MuiInputLabel-root.Mui-error": {
                    color: "#f44336",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Tên đăng nhập"
                variant="outlined"
                margin="normal"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                placeholder="Nhập tên đăng nhập"
                required
                disabled={loading}
                error={!!errorUserName}
                helperText={errorUserName}
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
                    "&.Mui-error fieldset": {
                      borderColor: "#f44336",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0b4f9e",
                    fontWeight: "600",
                  },
                  "& .MuiInputLabel-root.Mui-error": {
                    color: "#f44336",
                  },
                }}
              />

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2.5,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(239, 83, 80, 0.2)",
                  }}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2.5,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
                  }}
                >
                  {success}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1.5,
                  mb: 3.5,
                  py: 1.5,
                  background: loading
                    ? "linear-gradient(45deg, #cccccc 0%, #999999 100%)"
                    : "linear-gradient(45deg, #3a86ff 0%, #0b4f9e 100%)",
                  borderRadius: 2,
                  fontWeight: 700,
                  boxShadow: loading
                    ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                    : "0 10px 20px rgba(58, 134, 255, 0.3), 0 6px 10px rgba(0, 0, 0, 0.1)",
                  textTransform: "none",
                  fontSize: 16,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: loading
                      ? "linear-gradient(45deg, #cccccc 0%, #999999 100%)"
                      : "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                    boxShadow: loading
                      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                      : "0 14px 28px rgba(58, 134, 255, 0.4), 0 10px 15px rgba(0, 0, 0, 0.12)",
                    transform: loading ? "none" : "translateY(-3px)",
                  },
                  "&:active": {
                    boxShadow: loading
                      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                      : "0 6px 12px rgba(58, 134, 255, 0.2)",
                    transform: loading ? "none" : "translateY(-1px)",
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{ mr: 1, color: "#ffffff" }}
                    />
                    Đang xử lý...
                  </>
                ) : (
                  "Gửi yêu cầu"
                )}
              </Button>

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
                  Nhớ mật khẩu rồi?{" "}
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
                    Quay lại đăng nhập
                  </Box>
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
