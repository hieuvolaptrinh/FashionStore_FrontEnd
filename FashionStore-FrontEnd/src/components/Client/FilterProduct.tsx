import React, { useEffect, useState } from "react";
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
import Type from "../../models/TypeModel";
import { getTypes } from "../../service/API/TypeAPI";
import { useKeyword } from "../../contexts/KeywordContext";

interface FilterProductProps {
  selectedTypeIds?: number[];
  onChange?: (typeIds: number[]) => void;
}
const FilterProduct: React.FC<FilterProductProps> = ({
  selectedTypeIds = [],
  onChange,
}) => {
  const { setKeyword } = useKeyword();
  const [price, setPrice] = useState<number[]>([0, 150000]);
  const [search, setSearch] = useState<string>("");
  const [productTypes, setProductTypes] = useState<Type[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<number[]>(selectedTypeIds);

  useEffect(() => {
    getTypes()
      .then((types) => {
        setProductTypes(types);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy loại sản phẩm:", error);
      });
  }, []);

  useEffect(() => {
    setCheckedTypes(selectedTypeIds);
  }, [selectedTypeIds]);

  const handleTypeChange = (typeId: number) => {
    setCheckedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleSearch = () => {
    // Apply both keyword search and type filter
    setKeyword(search);
    if (onChange) {
      onChange(checkedTypes);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: "0 4px 16px rgba(58, 58, 58, 0.45)",
        background:
          "linear-gradient(145deg,rgb(228, 221, 221) 0%,rgba(215, 216, 217, 0.26) 100%)",

        width: "100%",
        border: "1px solid #e9ecef",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(58,134,255,0.12)",
          borderColor: "#3a86ff",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        mb={1.5}
        sx={{
          fontSize: 18,
          background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 1px 2px rgba(58,134,255,0.08)",
        }}
      >
        Lọc sản phẩm
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              fontSize: 13, // nhỏ hơn
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
              fontSize: 13,
              color: "#0b4f9e",
              "&.Mui-focused": {
                color: "#3a86ff",
              },
            },
          }}
        />
        <Box>
          <Typography
            variant="body2"
            fontWeight={600}
            mb={0.5}
            sx={{
              fontSize: 14,
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
                <Col xs={12} key={type.typeId} className="mb-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedTypes.includes(type.typeId)}
                        onChange={() => handleTypeChange(type.typeId)}
                        sx={{
                          color: "#3a86ff",
                          "&.Mui-checked": {
                            color: "#ffd700",
                          },
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.08)",
                          },
                          p: 0.5, // giảm padding
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Typography
                        fontWeight={500}
                        sx={{
                          fontSize: 13,

                          transition: "all 0.3s ease",
                        }}
                      >
                        {type.typeName}
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
            variant="body2"
            fontWeight={600}
            mb={0.5}
            sx={{
              fontSize: 14,
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
              height: 4, // nhỏ hơn
              "& .MuiSlider-thumb": {
                border: "1.5px solid #3a86ff",
                width: 16, // nhỏ hơn
                height: 16,
                boxShadow: "0 1px 4px rgba(58,134,255,0.2)",
                "&:hover": {
                  boxShadow: "0 2px 6px rgba(58,134,255,0.25)",
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
                fontSize: 12,
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
                fontSize: 12,
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
            borderRadius: 1.5,
            fontWeight: 600,
            py: 0.8, // giảm padding
            color: "#fff",
            boxShadow: "0 2px 8px rgba(58,134,255,0.15)",
            letterSpacing: 0.5,
            fontSize: 14, // nhỏ hơn
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #0b4f9e 0%, #3a86ff 100%)",
              color: "#ffd700",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(58,134,255,0.2)",
            },
          }}
          onClick={handleSearch}
        >
          Lọc
        </Button>
      </Stack>
    </Box>
  );
};

export default FilterProduct;
