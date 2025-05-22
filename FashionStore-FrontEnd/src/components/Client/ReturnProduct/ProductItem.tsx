import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import ReasonSelect from "./ReasonSelect";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface ProductItemProps {
  product: Product;
  returnReason: string;
  onReasonChange: (reason: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  returnReason,
  onReasonChange,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [detailedDescription, setDetailedDescription] = useState("");
  const [returnType, setReturnType] = useState("return"); // "return" or "exchange"
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            setSelectedImages((prev) => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Loại yêu cầu</FormLabel>
              <RadioGroup
                row
                value={returnType}
                onChange={(e) => setReturnType(e.target.value)}
              >
                <FormControlLabel
                  value="return"
                  control={<Radio />}
                  label="Trả hàng"
                />
                <FormControlLabel
                  value="exchange"
                  control={<Radio />}
                  label="Đổi hàng"
                />
              </RadioGroup>
            </FormControl>

            <ReasonSelect value={returnReason} onChange={onReasonChange} />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả chi tiết vấn đề"
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
              sx={{ mt: 2, mb: 2 }}
              placeholder="Vui lòng mô tả chi tiết vấn đề bạn gặp phải với sản phẩm..."
            />

            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <Button
                variant="outlined"
                onClick={() => fileInputRef.current?.click()}
                sx={{ mb: 2 }}
              >
                Tải lên hình ảnh minh chứng
              </Button>

              {selectedImages.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedImages.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Button
                        size="small"
                        color="error"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          minWidth: "auto",
                          p: 0.5,
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
