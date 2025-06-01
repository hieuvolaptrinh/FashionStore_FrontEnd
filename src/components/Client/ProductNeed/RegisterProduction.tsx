/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ProductNeed } from "./productFakeData";
import { Row, Col } from "react-bootstrap";
import { styled } from "@mui/material/styles";

interface RegisterProductionProps {
  open: boolean;
  onClose: () => void;
  product: ProductNeed | null;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const RegisterProduction: React.FC<RegisterProductionProps> = ({
  open,
  onClose,
  product,
}) => {
  const [cccdImage, setCccdImage] = useState<File | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [date, setDate] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCccdImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        Đăng ký sản xuất sản phẩm
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "#f8fafc" }}>
        <Box mb={2}>
          <Typography variant="h6" fontWeight={700} color="#0b4f9e">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {product.description}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} color="#3a86ff">
            Hướng dẫn sản xuất:
          </Typography>
          <Typography variant="body2" mb={1}>
            {product.instructions}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} color="#3a86ff">
            Nguyên liệu:
          </Typography>
          <List dense>
            {product.materials.map((mat, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={mat} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box mb={2}>
          <Row className="g-3">
            <Col xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderColor: "#3a86ff",
                  color: "#0b4f9e",
                  fontWeight: 600,
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": { borderColor: "#0b4f9e", color: "#3a86ff" },
                }}
              >
                Tải CCCD
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {previewUrl && (
                <Box
                  sx={{
                    mt: 2,
                    p: 1,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={previewUrl}
                      alt="CCCD Preview"
                      style={{
                        width: "200px",
                        height: "auto",
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Col>
            <Col xs={12} sm={6}>
              <TextField
                label="Số lượng muốn sản xuất"
                type="number"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                inputProps={{ min: 1 }}
                sx={{
                  "& label": { color: "#0b4f9e" },
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <TextField
                label="Ngày nhận nguyên liệu"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& label": { color: "#0b4f9e" },
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />
            </Col>
          </Row>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              sx={{
                color: "#3a86ff",
                "&.Mui-checked": { color: "rgb(255, 200, 0)" },
              }}
            />
          }
          label={
            <Typography variant="body2" color="#0b4f9e">
              Tôi đồng ý với quy định của chương trình
            </Typography>
          }
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#f8fafc" }}>
        <Button onClick={onClose} sx={{ color: "#0b4f9e", fontWeight: 600 }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          disabled={!agree}
          sx={{
            background: "linear-gradient(90deg, #3a86ff 0%, #0b4f9e 100%)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            px: 4,
            py: 1.2,
            textTransform: "none",
            letterSpacing: 1,
            boxShadow: "0 4px 16px 0 rgba(58,134,255,0.10)",
            fontSize: 16,
            "&:hover": {
              background: "linear-gradient(90deg, #0b4f9e 0%, #3a86ff 100%)",
              color: "rgb(255, 200, 0)",
            },
          }}
        >
          Đăng ký
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterProduction;
