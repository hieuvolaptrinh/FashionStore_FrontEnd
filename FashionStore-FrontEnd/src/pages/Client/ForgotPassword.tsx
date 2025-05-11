/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
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
    <main>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            margin: "40px 0",
            padding: "32px",
            borderRadius: "16px",
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <LockResetIcon
              style={{
                fontSize: "60px",
                color: "#4F6DF5",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h4"
              style={{
                marginBottom: "20px",
                fontWeight: 700,
                color: "#333333",
                fontSize: "2rem",
              }}
            >
              Quên mật khẩu
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginBottom: "32px",
                color: "#666666",
                fontSize: "1rem",
                lineHeight: "1.5",
              }}
            >
              Nhập email và tên đăng nhập để nhận liên kết đặt lại mật khẩu.
            </Typography>

            {error && (
              <Alert
                severity="error"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                severity="success"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              >
                {success}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                required
                disabled={loading}
                error={!!errorEmail}
                helperText={errorEmail}
                style={{
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
                inputProps={{
                  style: {
                    borderRadius: "8px",
                    padding: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Tên đăng nhập"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                margin="normal"
                required
                disabled={loading}
                error={!!errorUserName}
                helperText={errorUserName}
                style={{
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
                inputProps={{
                  style: {
                    borderRadius: "8px",
                    padding: "12px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                style={{
                  marginTop: "32px",
                  marginBottom: "20px",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  backgroundColor: loading ? "#cccccc" : "#4F6DF5",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 2px 8px rgba(79, 109, 245, 0.3)",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      style={{ marginRight: "10px", color: "#ffffff" }}
                    />
                    Đang xử lý...
                  </>
                ) : (
                  "Gửi yêu cầu"
                )}
              </Button>
            </Box>

            <Typography
              variant="body2"
              style={{
                color: "#777777",
                fontSize: "0.9rem",
              }}
            >
              <a
                href="/login"
                style={{
                  color: "#4F6DF5",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#6C63FF")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#4F6DF5")}
              >
                Quay lại đăng nhập
              </a>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </main>
  );
};

export default ForgotPassword;
