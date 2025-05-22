import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";

const productTypes = [
  "Trang sức",
  "Phụ kiện",
  "Túi xách",
  "Đồ dùng cá nhân",
  "Văn phòng phẩm",
  "Đồ trang trí",
  "Đồ gia dụng",
];

const FilterProduct: React.FC = () => {
  const [checkedTypes, setCheckedTypes] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<number[]>([0, 150000]);
  const [search, setSearch] = React.useState("");

  const handleTypeChange = (type: string) => {
    setCheckedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(58,134,255,0.1)",
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        minWidth: 240,
        maxWidth: 320,
        width: "100%",
        border: "1.5px solid #e9ecef",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 12px 36px rgba(58,134,255,0.15)",
          borderColor: "#3a86ff",
        },
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
        sx={{
          background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 4px rgba(58,134,255,0.1)",
        }}
      >
        Bộ lọc sản phẩm
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3a86ff",
                },
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3a86ff",
                  borderWidth: 2,
                },
              },
            },
            "& label": {
              color: "#0b4f9e",
              "&.Mui-focused": {
                color: "#3a86ff",
              },
            },
          }}
        />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={1}
            sx={{
              background: "linear-gradient(45deg, #3a86ff 0%, #0b4f9e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Loại sản phẩm
          </Typography>
          <FormGroup>
            <Row>
              {productTypes.map((type) => (
                <Col xs={12} key={type} className="mb-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        sx={{
                          color: "#3a86ff",
                          "&.Mui-checked": {
                            color: "#ffd700",
                          },
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        fontWeight={500}
                        sx={{
                          color: checkedTypes.includes(type)
                            ? "#0b4f9e"
                            : "text.secondary",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {type}
                      </Typography>
                    }
                  />
                </Col>
              ))}
            </Row>
          </FormGroup>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={1}
            sx={{
              background: "linear-gradient(45deg, #3a86ff 0%, #0b4f9e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Khoảng giá (VNĐ)
          </Typography>
          <Slider
            value={price}
            onChange={(_, val) => setPrice(val as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={150000}
            step={5000}
            sx={{
              color: "#ffd700",
              "& .MuiSlider-thumb": {
                border: "2px solid #3a86ff",
                boxShadow: "0 2px 8px rgba(58,134,255,0.3)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(58,134,255,0.4)",
                },
              },
              "& .MuiSlider-track": {
                background: "linear-gradient(45deg, #3a86ff 0%, #0b4f9e 100%)",
              },
              "& .MuiSlider-rail": {
                background: "linear-gradient(45deg, #e9ecef 0%, #dee2e6 100%)",
              },
            }}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="caption"
              sx={{
                color: "#0b4f9e",
                fontWeight: 600,
                background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {price[0].toLocaleString()} đ
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#0b4f9e",
                fontWeight: 600,
                background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {price[1].toLocaleString()} đ
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(45deg, #3a86ff 0%, #0b4f9e 100%)",
            borderRadius: 2,
            fontWeight: 700,
            py: 1.2,
            color: "#fff",
            boxShadow: "0 4px 16px rgba(58,134,255,0.2)",
            letterSpacing: 1,
            fontSize: 16,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
              color: "#ffd700",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(58,134,255,0.3)",
            },
          }}
        >
          Lọc
        </Button>
      </Stack>
    </Box>
  );
};

export default FilterProduct;
