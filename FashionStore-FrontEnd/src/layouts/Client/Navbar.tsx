import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Type from "../../models/TypeModel";
import { getTypes } from "../../service/API/TypeAPI";
import { Container } from "react-bootstrap";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ListItemText,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingBasket as BasketIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  ContactSupport as ContactIcon,
} from "@mui/icons-material";
import Notification from "../../components/Client/Notification/Notification";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [categoryMenuAnchor, setCategoryMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    getTypes()
      .then((data) => {
        console.log("lấy data thành công:", data);
        setTypes(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
      });
  }, []);

  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setCategoryMenuAnchor(null);
  };

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };
  const navigationLinks = [
    { name: "Trang Chủ", path: "/", icon: <HomeIcon fontSize="small" /> },
    {
      name: "Sản Phẩm",
      path: "/products",
      icon: <InfoIcon fontSize="small" />,
    },
    { name: "Giỏ Hàng", path: "/carts", icon: <BasketIcon fontSize="small" /> },
    {
      name: "Đơn Hàng",
      path: "/orders",
      icon: <ShippingIcon fontSize="small" />,
    },
    {
      name: "Thanh Toán",
      path: "/checkouts",
      icon: <PaymentIcon fontSize="small" />,
    },
    {
      name: "Liên Hệ",
      path: "/contact",
      icon: <ContactIcon fontSize="small" />,
    },
  ];

  // Màu sắc chính cho theme hiện đại
  const primaryColor = "#3a86ff";
  const accentColor = "rgb(255, 200, 0)";
  const darkTextColor = "#333333";
  const lightTextColor = "#ffffff";
  const gradientStart = "#3a86ff";
  const gradientEnd = "#0b4f9e";

  return (
    <Container fluid>
      <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
        <AppBar
          position="sticky"
          sx={{
            top: 0,
            zIndex: 10,
            background: `linear-gradient(135deg,${gradientEnd} 0%, ${gradientStart} 50%,${gradientEnd} 100% )`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar>
            {/* Category Button & Menu */}
            <Box sx={{ display: { xs: "none", lg: "block" }, width: "25%" }}>
              <Button
                startIcon={<MenuIcon />}
                endIcon={<ArrowDownIcon />}
                fullWidth
                onClick={handleOpenCategoryMenu}
                sx={{
                  backgroundColor: accentColor,
                  color: darkTextColor,
                  height: "65px",
                  justifyContent: "space-between",
                  padding: "0 24px",
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgb(255, 200, 0)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  SẢN PHẨM BÁN CHẠY
                </Typography>
              </Button>

              <Menu
                anchorEl={categoryMenuAnchor}
                open={Boolean(categoryMenuAnchor)}
                onClose={handleCloseCategoryMenu}
                PaperProps={{
                  sx: {
                    width: "calc(25% - 32px)",
                    maxWidth: "none",
                    borderRadius: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {types.map((type) => (
                  <MenuItem
                    key={type.typeId}
                    component={Link}
                    to={"/" + type.typeId?.toString() || ""}
                    onClick={handleCloseCategoryMenu}
                    sx={{
                      padding: "12px 24px",

                      "&:hover": {
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      },
                    }}
                  >
                    <Typography variant="h6">{type.typeName}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* mobile toggle */}
            <Box sx={{ display: { xs: "flex", lg: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenMobileMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleCloseMobileMenu}
                sx={{
                  display: { xs: "block", lg: "none" },
                }}
                PaperProps={{
                  sx: {
                    width: 250,
                    borderRadius: 1,
                  },
                }}
              >
                {navigationLinks.map((link) => (
                  <MenuItem
                    key={link.path}
                    component={Link}
                    to={link.path}
                    onClick={handleCloseMobileMenu}
                    selected={isLinkActive(link.path)}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: `${primaryColor}`,
                        color: primaryColor,
                      },
                      "&:hover": {
                        backgroundColor: `${primaryColor}`,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isLinkActive(link.path)
                          ? primaryColor
                          : "inherit",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText>{link.name}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* mobile logo */}
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", display: "flex" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: lightTextColor,
                    backgroundColor: primaryColor,
                    padding: "4px 8px",
                    borderRadius: "4px 0 0 4px",
                    fontWeight: "bold",
                  }}
                >
                  UTE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: darkTextColor,
                    backgroundColor: accentColor,
                    padding: "4px 8px",
                    borderRadius: "0 4px 4px 0",
                    fontWeight: "bold",
                    marginLeft: "-1px",
                  }}
                >
                  STORE
                </Typography>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                paddingLeft: 2,
              }}
            >
              {navigationLinks.map((link) => (
                <Button
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  sx={{
                    color: lightTextColor,
                    display: "block",
                    fontSize: "1rem",
                    mx: 1,
                    textTransform: "none",
                    position: "relative",
                    fontWeight: 700,
                    padding: "6px 12px",
                    "&.active": {
                      color: accentColor,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 8,
                        left: "25%",
                        width: "50%",
                        height: 2,
                        backgroundColor: accentColor,
                      },
                    },
                    "&:hover": {
                      color: accentColor,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 1,
                    },
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>

            {/* Favorites & Cart */}
            <Box
              sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
            >
              <IconButton
                sx={{
                  color: lightTextColor,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Badge
                  badgeContent={0}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: accentColor,
                      color: darkTextColor,
                      fontWeight: "bold",
                      border: `2px solid ${gradientEnd}`,
                      borderRadius: "50%",
                    },
                  }}
                >
                  <FavoriteIcon sx={{ color: lightTextColor }} />
                </Badge>
              </IconButton>

              <Notification />
            </Box>

            {/* Mobile Cart */}
            <Box sx={{ display: { xs: "flex", lg: "none" } }}>
              <IconButton
                component={Link}
                to="/cart"
                size="large"
                sx={{ color: lightTextColor }}
              >
                <Badge
                  badgeContent={5}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: accentColor,
                      color: darkTextColor,
                      fontWeight: "bold",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Navbar;
