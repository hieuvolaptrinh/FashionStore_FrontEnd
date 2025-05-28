import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Rating,
  CircularProgress,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { ShoppingCart, Favorite, Sync, Info } from "@mui/icons-material";
import { ImageProduct } from "./ImageProduct";
import { fetchProductImages } from "../../../service/API/ImageAPI";
import { ProductResponse } from "../../../models/ProductModel";
import ImageModel from "../../../models/ImageModel";
import { addToCart } from "../../../service/API/CartAPI";

// Tạo theme hiện đại với accent màu vàng cho stars
const modernTheme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Blue hiện đại
      contrastText: "#fff",
    },
    secondary: {
      main: "#64748b", // Slate gray
    },
    warning: {
      main: "#ffd333", // Vàng chỉ dành cho stars
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.08)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
  },
});

const ProductCard: React.FC<{ product: ProductResponse }> = ({ product }) => {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loanding, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!product || !product.productId) {
      console.warn("Product chưa có ID:", product);
      return;
    }
    fetchProductImages(product.productId)
      .then((result) => {
        setImages(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [product]);

  console.log("hình ảnh: ", images);
  // lấy hình ảnh đại diện của sản phẩm
  const icon =
    images.find((img) => img.icon === true)?.link || images[0]?.link || null;
  if (error) {
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 pb-1">
        <ThemeProvider theme={modernTheme}>
          <Box display="flex" justifyContent="center" mt={3}>
            <Alert severity="error" sx={{ borderRadius: 3 }}>
              <Typography variant="h6">Gặp lỗi: {error}</Typography>
            </Alert>
          </Box>
        </ThemeProvider>
      </div>
    );
  }

  const productId = product.productId !== undefined ? product.productId : 0;

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(productId, 1);
      alert("Đã thêm sản phâm thành công vào giỏ hàng ");
      console.log(response);
    } catch (error) {
      alert("Không thể thêm sản phẩm vào giỏ hàng" + error);
    }
  };
  if (loanding) {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
        <ThemeProvider theme={modernTheme}>
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress
              color="primary"
              sx={{
                animationDuration: "1.2s",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
          </Box>
        </ThemeProvider>
      </div>
    );
  }
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-4">
      <ThemeProvider theme={modernTheme}>
        <Card
          sx={{
            mb: 2,
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "& .product-image": {
                transform: "scale(1.1)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              },
              "& .action-buttons": {
                transform: "translateX(-50%) translateY(0)",
                opacity: 1,
              },
              "& .card-content": {
                transform: "translateY(-2px)",
              },
            },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {" "}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: 200,
              background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
            }}
          >
            <Box
              className="product-image"
              sx={{
                width: "100%",
                height: "100%",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <ImageProduct
                icon={icon || ""}
                productName={product.productName || ""}
              />
            </Box>

            {/* Action buttons với hiệu ứng glassmorphism */}
            <Box
              className="action-buttons"
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: " ",
                opacity: 0,
                display: "flex",
                gap: 1.5,
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 10,
              }}
            >
              {" "}
              <IconButton
                color="primary"
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    transform: "scale(1.1) rotate(5deg)",
                    boxShadow: "0 12px 40px rgba(37, 99, 235, 0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <ShoppingCart fontSize="small" />
              </IconButton>
              <IconButton
                color="secondary"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#ef4444",
                    color: "white",
                    transform: "scale(1.1) rotate(-5deg)",
                    boxShadow: "0 12px 40px rgba(239, 68, 68, 0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Favorite fontSize="small" />
              </IconButton>
              <IconButton
                color="secondary"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#06b6d4",
                    color: "white",
                    transform: "scale(1.1) rotate(180deg)",
                    boxShadow: "0 12px 40px rgba(6, 182, 212, 0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Sync fontSize="small" />
              </IconButton>
              <IconButton
                component={Link}
                to={`/products/${product.productId}`}
                color="secondary"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    transform: "scale(1.1) rotate(-5deg)",
                    boxShadow: "0 12px 40px rgba(139, 92, 246, 0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Info fontSize="small" />
              </IconButton>
            </Box>
          </Box>{" "}
          <CardContent
            className="card-content"
            sx={{
              textAlign: "center",
              py: 3,
              px: 2,
              flexGrow: 1,
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                mb: 2,
                fontSize: "1.1rem",
                lineHeight: 1.3,
              }}
            >
              {product.productName || "Sản phẩm chưa có tên"}
            </Typography>

            <Box sx={{ mb: 2 }}>
              {product.originalPrice &&
                product.originalPrice > product.salePrice! && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "#94a3b8",
                      mb: 0.5,
                      fontSize: "0.9rem",
                    }}
                  >
                    {product.originalPrice.toFixed(0)} vnđ
                  </Typography>
                )}

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#2563eb",
                  fontSize: "1.4rem",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {product.salePrice?.toFixed(0)} vnđ
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Rating
                value={product.avgStars || 0}
                readOnly
                precision={0.5}
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ffd333", // Chỉ có stars là màu vàng
                    filter: "drop-shadow(0 2px 4px rgba(255, 211, 51, 0.3))",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#e2e8f0",
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                ({product.avgStars ? Math.round(product.avgStars * 20) : "0"})
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default ProductCard;
