/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LockReset, Visibility, VisibilityOff } from "@mui/icons-material";
import { validatePassword, validateRePassword } from "../../utils/Validation";
import { changePassword } from "../../service/API/UserAPI";

const RestPassword = () => {
  const { email, activationCode } = useParams<{
    email: string;
    activationCode: string;
  }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: any) => {
    setNewPassword(e.target.value);
    setErrorPassword(validatePassword(e.target.value));
    if (confirmPassword) {
      setErrorRePassword(validateRePassword(e.target.value, confirmPassword));
    }
  };

  const handleRePasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setErrorRePassword(validateRePassword(newPassword, e.target.value));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Kiểm tra validate
    const passwordError = validatePassword(newPassword);
    const rePasswordError = validateRePassword(newPassword, confirmPassword);

    if (passwordError || rePasswordError) {
      setErrorPassword(passwordError);
      setErrorRePassword(rePasswordError);
      setError("Vui lòng kiểm tra lại mật khẩu.");
      setLoading(false);
      return;
    }

    if (!email || !activationCode) {
      setError("Thông tin email hoặc mã kích hoạt không hợp lệ.");
      setLoading(false);
      return;
    }

    try {
      const result = await changePassword(email, newPassword, activationCode);
      if (typeof result === "string" && !result.includes("error")) {
        setSuccess(
          result ||
            "Mật khẩu đã được đặt lại thành công! Bạn có thể đăng nhập ngay."
        );
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(result || "Không thể đặt lại mật khẩu. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Tối ưu SEO
  useEffect(() => {
    document.title = "Đặt lại mật khẩu - Tên Công Ty";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Đặt lại mật khẩu tài khoản của bạn một cách an toàn và nhanh chóng.";
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
                Đặt lại mật khẩu
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
                Vui lòng nhập mật khẩu mới để tiếp tục sử dụng tài khoản của
                bạn.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Mật khẩu mới"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="Nhập mật khẩu mới"
                required
                disabled={loading}
                error={!!errorPassword}
                helperText={errorPassword}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                        disabled={loading}
                        sx={{
                          color: "#3a86ff",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(58, 134, 255, 0.08)",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                variant="outlined"
                margin="normal"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleRePasswordChange}
                placeholder="Nhập lại mật khẩu mới"
                required
                disabled={loading}
                error={!!errorRePassword}
                helperText={errorRePassword}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                        disabled={loading}
                        sx={{
                          color: "#3a86ff",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(58, 134, 255, 0.08)",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
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
                  "Đặt lại mật khẩu"
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

export default RestPassword;
