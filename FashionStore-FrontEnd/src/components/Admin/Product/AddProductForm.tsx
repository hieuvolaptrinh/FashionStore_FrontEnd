/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Alert,
  Modal,
} from "@mui/material";

import { getTypes } from "../../../service/API/TypeAPI";
import { createProduct, updateProduct } from "../../../service/API/AdminAPI";

import Type from "../../../models/TypeModel";
import { ProductRequest, ProductResponse } from "../../../models/ProductModel";

interface AddProductFormProps {
  show: boolean;
  onHide: () => void;
  productToEdit?: ProductResponse | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  show,
  onHide,
  productToEdit,
}) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProductRequest>({
    productId: undefined,
    productName: "",
    description: "",
    originalPrice: 0,
    productionInfor: "",
    salePrice: 0,
    quantity: 0,
    manufactureDate: "",
    listTypes: [],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Thêm state để lưu File

  // Fetch types khi component mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await getTypes();
        setTypes(data);
      } catch (error) {
        console.error("Không thể load loại sản phẩm:", error);
      }
    };
    fetchTypes();
  }, []);

  // Reset form khi productToEdit hoặc show thay đổi
  useEffect(() => {
    if (productToEdit && show) {
      setFormData({
        productId: productToEdit.productId,
        productName: productToEdit.productName || "",
        description: productToEdit.description || "",
        originalPrice: productToEdit.originalPrice || 0,
        productionInfor: productToEdit.productionInfor || "",
        salePrice: productToEdit.salePrice || 0,
        quantity: productToEdit.quantity || 0,
        manufactureDate: productToEdit.manufactureDate || "",
        listTypes: productToEdit.listTypes?.map((type) => type.typeId) || [],
      });
      setImagePreviews(productToEdit.listImages || []);
      setSelectedFiles([]); // Reset files khi chỉnh sửa
    } else {
      setFormData({
        productId: undefined,
        productName: "",
        description: "",
        originalPrice: 0,
        productionInfor: "",
        salePrice: 0,
        quantity: 0,
        manufactureDate: "",
        listTypes: [],
      });
      setImagePreviews([]);
      setSelectedFiles([]);
    }
  }, [productToEdit, show]);

  // Xử lý thay đổi input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "originalPrice" || name === "salePrice" || name === "quantity"
          ? Number(value) || 0
          : value,
    }));
  };

  // Xử lý thay đổi checkbox loại sản phẩm
  const handleCheckboxChange = (typeId: number) => {
    setFormData((prev) => {
      const listTypes = prev.listTypes || [];
      const exists = listTypes.includes(typeId);
      return {
        ...prev,
        listTypes: exists
          ? listTypes.filter((id) => id !== typeId)
          : [...listTypes, typeId],
      };
    });
  };

  // Xử lý thay đổi hình ảnh
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray); // Lưu danh sách File
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file))); // Lưu preview
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let result;
      if (productToEdit && formData.productId) {
        result = await updateProduct(formData);
      } else {

        result = await createProduct(formData, selectedFiles);
      }
      alert(result);
      setIsLoading(false);
     
    } catch (error: any) {
      setIsLoading(false);
      alert(`Lỗi khi ${productToEdit ? "cập nhật" : "tạo"} sản phẩm: ${error}`);
    }
  };

  // ... Phần render giữ nguyên như mã gốc ...

  return (
    <Modal
      open={show}
      onClose={onHide}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Paper elevation={3} className="p-4">
          <Typography variant="h4" align="center" gutterBottom>
            {productToEdit ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  size="small"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Mô tả"
                  name="description"
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  size="small"
                />
              </div>

              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Giá gốc"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  size="small"
                />
              </div>

              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Giá sale"
                  name="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  size="small"
                />
              </div>

              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Số lượng"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  size="small"
                />
              </div>

              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Ngày sản xuất"
                  name="manufactureDate"
                  type="date"
                  value={formData.manufactureDate}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Thông tin sản xuất"
                  name="productionInfor"
                  multiline
                  rows={2}
                  value={formData.productionInfor}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  size="small"
                />
              </div>

              <div className="col-12">
                <Typography variant="subtitle1" gutterBottom>
                  Loại sản phẩm
                </Typography>
                {types.length === 0 ? (
                  <Typography>Đang tải danh sách loại...</Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      maxHeight: "100px",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                  >
                    {types.map((type) => (
                      <FormControlLabel
                        key={type.typeId}
                        control={
                          <Checkbox
                            checked={(formData.listTypes ?? []).includes(
                              type.typeId
                            )}
                            onChange={() => handleCheckboxChange(type.typeId)}
                            disabled={isLoading}
                            size="small"
                          />
                        }
                        label={type.typeName}
                      />
                    ))}
                  </Box>
                )}
              </div>

              <div className="col-12">
                <Button
                  variant="contained"
                  component="label"
                  disabled={isLoading}
                  size="small"
                >
                  Chọn hình ảnh sản phẩm
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Button>
              </div>

              {imagePreviews.length > 0 && (
                <div className="col-12">
                  <Typography variant="subtitle1" gutterBottom>
                    Xem trước hình ảnh
                  </Typography>
                  <Box
                    className="d-flex flex-wrap gap-2"
                    sx={{ maxHeight: "200px", overflow: "auto" }}
                  >
                    {imagePreviews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`preview-${index}`}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover", border: "1px solid #ddd" }}
                      />
                    ))}
                  </Box>
                </div>
              )}

              {isLoading && (
                <div className="col-12">
                  <Alert
                    severity="info"
                    icon={<CircularProgress size={20} />}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    Đang {productToEdit ? "cập nhật" : "tạo"} sản phẩm...
                  </Alert>
                </div>
              )}

              <div className="col-12">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                  size="small"
                >
                  {isLoading
                    ? "Đang xử lý..."
                    : productToEdit
                    ? "Cập nhật"
                    : "Thêm sản phẩm"}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddProductForm;
