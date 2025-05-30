/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <main>
      <Container maxWidth="sm">
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
              Đặt lại mật khẩu
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
              Vui lòng nhập mật khẩu mới để tiếp tục sử dụng tài khoản của bạn.
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
                label="Mật khẩu mới"
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
                disabled={loading}
                error={!!errorPassword}
                helperText={errorPassword}
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
                label="Xác nhận mật khẩu"
                type="password"
                value={confirmPassword}
                onChange={handleRePasswordChange}
                margin="normal"
                required
                disabled={loading}
                error={!!errorRePassword}
                helperText={errorRePassword}
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
                  "Đặt lại mật khẩu"
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

export default RestPassword;
