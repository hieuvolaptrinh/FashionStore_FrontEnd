import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAvatar } from "../../service/API/UserAPI";
import { useKeyword } from "../../contexts/KeywordContext";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Paper,
  Container,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Key as KeyIcon,
  ShoppingCart as ShoppingCartIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

const Header: React.FC = () => {
  const { setKeyword } = useKeyword();
  const [searchValue, setSearchValue] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

  const roles = localStorage.getItem("roles");
  const navigate = useNavigate();

  const headerColors = {
    background: "#ffffff",
    primary: "#1976d2",
    secondary: "#0d47a1",
    buttonHover: alpha("#1976d2", 0.08),
    searchBorder: alpha("#1976d2", 0.3),
    searchBorderHover: "#1976d2",
    searchShadow: alpha("#1976d2", 0.2),
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    getAvatar()
      .then((result) => {
        if (result) {
          setAvatarBase64(result);
        } else {
          setAvatarBase64(null);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(searchValue);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/login");
    handleCloseMenu();
  };

  return (
    <Container maxWidth="xl" sx={{ padding: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: headerColors.background,
            borderBottom: `1px solid ${alpha(headerColors.primary, 0.1)}`,
          }}
        >
          <Toolbar>
            {/* Logo */}
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ textDecoration: "none", display: "flex" }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    backgroundColor: headerColors.primary,
                    padding: "4px 12px",
                    borderRadius: "4px 0 0 4px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  UTE
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    backgroundColor: "rgb(255, 200, 0)",
                    padding: "4px 12px",
                    borderRadius: "0 4px 4px 0",
                    marginLeft: "-1px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#333",
                    },
                  }}
                >
                  STORE
                </Typography>
              </Link>
            </Box>

            {/* Search Bar */}
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: "40%", md: "30%" },
                border: `1px solid ${headerColors.searchBorder}`,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  border: `1px solid ${headerColors.searchBorderHover}`,
                  boxShadow: `0 0 8px ${headerColors.searchShadow}`,
                },
                "&:focus-within": {
                  border: `1px solid ${headerColors.primary}`,
                  boxShadow: `0 0 8px ${headerColors.searchShadow}`,
                },
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  "& .MuiInputBase-input": {
                    color: "#555",
                  },
                }}
                placeholder="Tìm kiếm sản phẩm"
                inputProps={{ "aria-label": "tìm kiếm sản phẩm" }}
                value={searchValue}
                onChange={onSearchInputChange}
              />
              <IconButton
                type="button"
                sx={{
                  p: "10px",
                  color: headerColors.primary,
                  "&:hover": {
                    backgroundColor: headerColors.buttonHover,
                  },
                }}
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            {/* User Account */}
            <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
              {username ? (
                <Tooltip title="Mở tùy chọn người dùng">
                  <Button
                    onClick={handleOpenMenu}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      textTransform: "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: headerColors.buttonHover,
                      },
                    }}
                  >
                    {avatarBase64 ? (
                      <Avatar
                        src={`data:image/png;base64,${avatarBase64}`}
                        sx={{
                          width: 36,
                          height: 36,
                          border: `2px solid ${headerColors.primary}`,
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: headerColors.primary,
                          color: "white",
                        }}
                      >
                        {username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="body2" color="text.secondary">
                        Xin chào,
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight="bold"
                        sx={{ color: headerColors.secondary }}
                      >
                        {username}
                      </Typography>
                    </Box>
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleOpenMenu}
                  startIcon={<PersonIcon />}
                  sx={{
                    textTransform: "none",
                    backgroundColor: headerColors.primary,
                    "&:hover": {
                      backgroundColor: headerColors.secondary,
                    },
                  }}
                >
                  Tài khoản
                </Button>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 12px rgba(0,0,0,0.15))",
                    mt: 1.5,
                    "& .MuiMenuItem-root": {
                      px: 2,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: alpha(headerColors.primary, 0.08),
                      },
                    },
                  },
                }}
              >
                {!username ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/login");
                        handleCloseMenu();
                      }}
                    >
                      <PersonIcon
                        sx={{ mr: 1.5, color: headerColors.primary }}
                        fontSize="small"
                      />
                      Đăng nhập
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/register");
                        handleCloseMenu();
                      }}
                    >
                      <AccountCircleIcon
                        sx={{ mr: 1.5, color: headerColors.primary }}
                        fontSize="small"
                      />
                      Đăng ký
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/forgot-password");
                        handleCloseMenu();
                      }}
                    >
                      <KeyIcon
                        sx={{ mr: 1.5, color: headerColors.primary }}
                        fontSize="small"
                      />
                      Quên mật khẩu
                    </MenuItem>
                  </>
                ) : (
                  <>
                    {roles?.includes("ADMIN") && (
                      <MenuItem
                        onClick={() => {
                          navigate("/admin");
                          handleCloseMenu();
                        }}
                      >
                        <AdminIcon
                          sx={{ mr: 1.5 }}
                          fontSize="small"
                          color="primary"
                        />
                        Trang admin
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleCloseMenu();
                      }}
                    >
                      <PersonIcon
                        sx={{ mr: 1.5, color: headerColors.primary }}
                        fontSize="small"
                      />
                      Chỉnh sửa thông tin
                    </MenuItem>
                    {roles?.includes("USER") && (
                      <>
                        <MenuItem
                          onClick={() => {
                            navigate("/carts");
                            handleCloseMenu();
                          }}
                        >
                          <ShoppingCartIcon
                            sx={{ mr: 1.5, color: headerColors.primary }}
                            fontSize="small"
                          />
                          Giỏ hàng
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate("/need-products");
                          }}
                        >
                          <ProductionQuantityLimitsOutlined
                            sx={{ mr: 1.5, color: "#f44336" }}
                            fontSize="small"
                          />
                          Xem sản phẩm cần sản xuất
                        </MenuItem>
                      </>
                    )}
                    {roles?.includes("SHIPPER") && (
                      <>
                        <MenuItem
                          onClick={() => {
                            navigate("/shipper");
                          }}
                        >
                          <ProductionQuantityLimitsOutlined
                            sx={{ mr: 1.5, color: "#f44336" }}
                            fontSize="small"
                          />
                          Cập nhật giao hàng
                        </MenuItem>
                      </>
                    )}
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon
                        sx={{ mr: 1.5, color: "#f44336" }}
                        fontSize="small"
                      />
                      Đăng xuất
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Header;
