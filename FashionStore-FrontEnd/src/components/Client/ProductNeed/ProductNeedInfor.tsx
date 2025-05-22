import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ProductNeed } from "./productneed";

interface ProductNeedInforProps {
  open: boolean;
  onClose: () => void;
  product: ProductNeed | null;
}

const ProductNeedInfor: React.FC<ProductNeedInforProps> = ({
  open,
  onClose,
  product,
}) => {
  if (!product) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #3a86ff 0%, #0b4f9e 100%)",
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Thông tin sản phẩm
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "#f8fafc" }}>
        <Box mb={2}>
          <Typography variant="h5" fontWeight={800} color="#0b4f9e" mb={1}>
            {product.productName}
          </Typography>
          <Chip
            label={product.type}
            sx={{ bgcolor: "#3a86ff", color: "#fff", fontWeight: 700, mr: 1 }}
          />
          <Chip
            label={product.salePrice.toLocaleString() + " đ"}
            sx={{
              bgcolor: "rgb(255, 200, 0)",
              color: "#0b4f9e",
              fontWeight: 700,
            }}
          />
        </Box>
        <ImageList
          cols={product.images.length > 1 ? 2 : 1}
          rowHeight={220}
          sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
        >
          {product.images.map((img, idx) => (
            <ImageListItem key={idx}>
              <img
                src={img}
                alt={product.productName + " " + (idx + 1)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="#3a86ff"
          mb={0.5}
        >
          Mô tả sản phẩm
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.description}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="#3a86ff"
          mb={0.5}
        >
          Hướng dẫn sản xuất
        </Typography>
        <Typography variant="body2" mb={2}>
          {product.instructions}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="#3a86ff"
          mb={0.5}
        >
          Nguyên liệu cần thiết
        </Typography>
        <List dense>
          {product.materials.map((mat, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={mat} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#f8fafc" }}>
        <Button onClick={onClose} sx={{ color: "#0b4f9e", fontWeight: 600 }}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductNeedInfor;
