import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import { ProductNeed } from "./productFakeData";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface ProductNeedCardProps {
  product: ProductNeed;
  onRegister?: () => void;
  onViewDetail?: () => void;
}

const ProductNeedCard: React.FC<ProductNeedCardProps> = ({
  product,
  onRegister,
  onViewDetail,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.08)",
        transition: "all 0.3s ease-in-out",
        border: "1px solid #f0f0f0",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
        "&:hover": {
          boxShadow: "0 12px 36px 0 rgba(0,0,0,0.12)",
          borderColor: "#e0e0e0",
          transform: "translateY(-4px)",
          "& .MuiCardMedia-root": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="180"
          image={product.images[0]}
          alt={product.productName}
          sx={{
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        <Chip
          label={product.type}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            background:
              "linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 0.5,
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            px: 1.5,
            borderRadius: 2,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1, pt: 2, px: 2.5 }}>
        <Tooltip title={product.productName} arrow>
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={700}
            noWrap
            sx={{
              fontSize: "1.1rem",
              color: "#1e293b",
            }}
          >
            {product.productName}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="#64748b"
          sx={{ 
            mb: 2, 
            height: "40px",
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            fontSize: "0.85rem",
            lineHeight: 1.5,
            textOverflow: "ellipsis"
          }}
        >
          {product.description}
        </Typography>
        
        {/* Price section with fixed position */}
        <Box sx={{ height: "50px" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={product.salePrice.toLocaleString() + " đ"}
              size="small"
              sx={{
                background: "linear-gradient(45deg, #f59e0b 0%, #fbbf24 100%)",
                color: "#1e293b",
                fontWeight: 700,
                fontSize: 14,
                px: 1.5,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)",
              }}
            />
          </Stack>
        </Box>
      </CardContent>
      
      <CardActions sx={{ 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center", 
        px: 2, 
        pb: 2, 
        gap: 1.5 
      }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onViewDetail}
          sx={{
            borderRadius: 2,
            color: "#475569",
            borderColor: "#cbd5e1",
            py: 0.8,
            textTransform: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#94a3b8",
              background: "rgba(148, 163, 184, 0.05)",
              transform: "translateY(-2px)",
            },
            display: "flex",
            gap: 1
          }}
        >
          <VisibilityOutlinedIcon fontSize="small" />
          Xem chi tiết
        </Button>
        
        <Button
          variant="contained"
          fullWidth
          onClick={onRegister}
          sx={{
            borderRadius: 2,
            background: "linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)",
            py: 0.8,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
            boxShadow: "rgba(99, 102, 241, 0.3) 0px 4px 12px",
            "&:hover": {
              background: "linear-gradient(45deg, #4f46e5 0%, #7c3aed 100%)",
              transform: "translateY(-2px)",
              boxShadow: "rgba(79, 70, 229, 0.45) 0px 6px 18px",
            },
            display: "flex",
            gap: 1
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
          Đăng ký
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductNeedCard;
