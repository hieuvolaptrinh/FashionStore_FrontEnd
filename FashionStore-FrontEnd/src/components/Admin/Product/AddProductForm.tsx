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
import { createProduct } from "../../../service/API/AdminAPI";
import uploadToGoogleDrive from "../../../service/API/DriveAPI";
import ProductModel from "../../../models/ProductModel";

// Định nghĩa interface cho Type
interface Type {
  typeId: number;
  typeName: string;
}

// Định nghĩa props cho component
interface AddProductFormProps {
  show: boolean;
  onHide: () => void;
  onSave: (product: ProductModel) => void;
  productToEdit?: ProductModel | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  show,
  onHide,
  onSave,
  productToEdit,
}) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<ProductModel>>({
    productId: productToEdit?.productId,
    productName: productToEdit?.productName || "",
    description: productToEdit?.description || "",
    originalPrice: productToEdit?.originalPrice || 0,
    productionInfor: productToEdit?.productionInfor || "",
    salePrice: productToEdit?.salePrice || 0,
    quantity: productToEdit?.quantity || 0,
    manufactureDate: productToEdit?.manufactureDate || "",
    listTypes: productToEdit?.listTypes || [],
    listImages: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>(
    productToEdit?.listImages || []
  );

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

  // Reset form khi productToEdit thay đổi hoặc modal đóng/mở
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        productId: productToEdit.productId,
        productName: productToEdit.productName,
        description: productToEdit.description,
        originalPrice: productToEdit.originalPrice,
        productionInfor: productToEdit.productionInfor || "",
        salePrice: productToEdit.salePrice,
        quantity: productToEdit.quantity,
        manufactureDate: productToEdit.manufactureDate,
        listTypes: productToEdit.listTypes,
        listImages: [],
      });
      setImagePreviews(productToEdit.listImages || []);
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
        listImages: [],
      });
      setImagePreviews([]);
    }
  }, [productToEdit, show]);

  // Xử lý thay đổi input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý thay đổi checkbox loại sản phẩm
  const handleCheckboxChange = (typeId: number) => {
    setFormData((prev) => {
      const exists = prev.listTypes?.includes(typeId) || false;
      return {
        ...prev,
        listTypes: exists
          ? prev.listTypes?.filter((id: number) => id !== typeId) || []
          : [...(prev.listTypes || []), typeId],
      };
    });
  };

  // Xử lý thay đổi hình ảnh
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({ ...prev, listImages: fileArray as any }));

      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageLinks = productToEdit?.listImages || [];

      // Nếu có hình ảnh mới, upload lên Google Drive
      if (formData.listImages && formData.listImages.length > 0) {
        console.log("Đang tải hình ảnh lên Google Drive...");
        imageLinks = await Promise.all(
          (formData.listImages as File[]).map((file) =>
            uploadToGoogleDrive(file)
          )
        );
      }

      // Tạo đối tượng sản phẩm để gửi lên server
      const productToSend: ProductModel = {
        ...formData,
        listImages: imageLinks,
        listTypes: formData.listTypes || [],
      } as ProductModel;

      // Gọi API tạo sản phẩm
      await createProduct(productToSend);

      setIsLoading(false);
      onSave(productToSend);
      onHide();
    } catch (error) {
      setIsLoading(false);
      alert("Lỗi khi lưu sản phẩm!" + error);
    }
  };

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
                            checked={
                              formData.listTypes?.includes(type.typeId) || false
                            }
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
                    Đang lưu thông tin sản phẩm...
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
