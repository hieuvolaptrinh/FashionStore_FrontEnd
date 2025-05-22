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
import { ProductNeed } from "./productneed";

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
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.08)",
        transition: "all 0.3s ease-in-out",
        border: "1.5px solid #f0f0f0",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
        "&:hover": {
          boxShadow: "0 12px 36px 0 rgba(0,0,0,0.12)",
          borderColor: "#e0e0e0",
          transform: "translateY(-4px) scale(1.02)",
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
            borderRadius: "18px 18px 0 0",
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
              "linear-gradient(45deg,rgb(149, 0, 255) 0%,rgb(0, 102, 255) 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 0.5,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            px: 1.5,
            borderRadius: 2,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Tooltip title={product.productName} arrow>
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={800}
            noWrap
            sx={{
              background: "linear-gradient(45deg, #2d3436 0%, #636e72 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.productName}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, minHeight: 40 }}
        >
          {product.description}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip
            label={product.salePrice.toLocaleString() + " đ"}
            size="small"
            sx={{
              background: "linear-gradient(45deg, #fdcb6e 0%, #e17055 100%)",
              color: "#2d3436",
              fontWeight: 700,
              fontSize: 14,
              px: 1.5,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(253,203,110,0.3)",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              background: "linear-gradient(45deg, #636e72 0%, #2d3436 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.materials.slice(0, 2).join(", ")}
            {product.materials.length > 2 ? "..." : ""}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={onViewDetail}
          sx={{
            borderRadius: 2,
            color: "#2d3436",
            borderColor: "#e0e0e0",

            px: 2,
            textTransform: "none",
            transition: "all 0.3s ease",
            background:
              "linear-gradient(45deg, rgba(45,52,54,0.05) 0%, rgba(99,110,114,0.05) 100%)",
            "&:hover": {
              borderColor: "#fdcb6e",
              color: "#e17055",
              background:
                "linear-gradient(45deg, rgba(253,203,110,0.1) 0%, rgba(225,112,85,0.1) 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(253,203,110,0.2)",
            },
          }}
        >
          Xem chi tiết
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={onRegister}
          sx={{
            borderRadius: 2,
            background:
              "linear-gradient(45deg,rgb(82, 137, 157) 0%,rgb(13, 94, 216) 100%)",

            px: 2.5,
            textTransform: "none",
            letterSpacing: 1,
            fontSize: 15,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              background:
                "linear-gradient(45deg,rgb(0, 186, 253) 0%,rgb(0, 30, 255) 100%)",
              color: "#fdcb6e",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
        >
          Đăng ký sản xuất
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductNeedCard;
