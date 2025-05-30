import React, { useState } from "react";
import { login } from "../service/API/UserAPI";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.name: e.target là phần tử DOM mà sự kiện này xảy ra trên đó,
    // trong trường hợp này là một ô input. e.target.name lấy tên của trường (attribute name của input field) trong form.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { userName, password } = formData;
    const response = await login(userName, password);
    if (response) {
      setSuccess("đăng nhập thành công!");
      setError("");
    } else {
      setError("Đăng nhập thất bại!");
      setSuccess("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 10px rgba(58, 134, 255, 0.25)",
              }}
            >
              Đăng nhập ngay
            </Typography>

            <div>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                variant="outlined"
                margin="normal"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
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

              <TextField
                fullWidth
                label="Mật khẩu"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                  <Link
                    to={"/"}
                    style={{
                      marginLeft: 8,
                      color: "#2e7d32",
                      fontWeight: "bold",
                    }}
                  >
                    Mua sắm ngay
                  </Link>
                </Alert>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
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
                Đăng nhập
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
                  Bạn quên mật khẩu ư?{" "}
                  <Box
                    component={Link}
                    to="/forgot-password"
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
                    Lấy lại mật khẩu ngay
                  </Box>
                </Typography>
              </Paper>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
