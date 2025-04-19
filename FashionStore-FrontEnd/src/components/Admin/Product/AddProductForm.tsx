import React, { useState, useEffect, ChangeEvent } from "react";

import { getTypes } from "../../../service/API/TypeAPI";
import RequireAdmin from "../../../layouts/Admin/RequireAdmin";
import { createProduct } from "../../../service/API/AdminAPI";
import uploadToGoogleDrive from "../../../service/API/DriveAPI";
import Type from "../../../models/Type";

const AddProductForm : React.FC = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    originalPrice: 0,
    productionInfor: "",
    salePrice: 0,
    quantity: 0,
    manufactureDate: "",
    listTypes: [] as number[],
    listImages: [] as File[],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // set types product
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (typeId: number) => {
    setFormData((prev) => {
      const exists = prev.listTypes.includes(typeId);
      return {
        ...prev,
        listTypes: exists
          ? prev.listTypes.filter((id) => id !== typeId)
          : [...prev.listTypes, typeId],
      };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({ ...prev, listImages: fileArray }));

      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };
  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu loading
    try {
      console.log("Đang tải hình ảnh lên Google Drive...");

      const imageLinks = await Promise.all(
        formData.listImages.map((file) => uploadToGoogleDrive(file))
      );

      console.log("Đang thêm thông tin sản phẩm...");
      const productToSend = {
        ...formData,
        listImages: imageLinks,
      };

      const message = await createProduct(productToSend);
      setIsLoading(false);
      alert(message);

      resetForm();
    } catch (error) {
      setIsLoading(false);
      alert("Lỗi khi thêm sản phẩm!" + error);
    }
  };

  //  reset form
  const resetForm = () => {
    setFormData({
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
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center">Thêm Sản Phẩm Mới</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Giá gốc</label>
          <input
            type="number"
            className="form-control"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá sale</label>
          <input
            type="number"
            className="form-control"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày sản xuất</label>
          <input
            type="date"
            className="form-control"
            name="manufactureDate"
            value={formData.manufactureDate}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Thông tin sản xuất</label>
          <textarea
            className="form-control"
            name="productionInfor"
            rows={3}
            value={formData.productionInfor}
            onChange={handleInputChange}
            disabled={isLoading}
          ></textarea>
        </div>

        {/* DANH SÁCH LOẠI SẢN PHẨM LẤY ĐỘNG TỪ API */}
        <div className="mb-3">
          <label className="form-label d-block">Loại sản phẩm</label>
          {types.length === 0 ? (
            <p>Đang tải danh sách loại...</p>
          ) : (
            types.map((type) => (
              <div className="form-check form-check-inline" key={type.typeId}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`type-${type.typeId}`}
                  checked={formData.listTypes.includes(type.typeId)}
                  onChange={() => handleCheckboxChange(type.typeId)}
                  disabled={isLoading}
                />
                <label
                  className="form-check-label"
                  htmlFor={`type-${type.typeId}`}
                >
                  {type.typeName}
                </label>
              </div>
            ))
          )}
        </div>

        {/* HÌNH ẢNH */}
        <div className="mb-3">
          <label className="form-label">Hình ảnh sản phẩm</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            disabled={isLoading}
          />
        </div>

        {/* XEM TRƯỚC ẢNH */}
        {imagePreviews.length > 0 && (
          <div className="mb-3">
            <label className="form-label d-block">Xem trước hình ảnh</label>
            <div className="d-flex flex-wrap gap-2">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", border: "1px solid #ddd" }}
                />
              ))}
            </div>
          </div>
        )}

        {/* HIỂN THỊ TRẠNG THÁI LOADING */}
        {isLoading && (
          <div className="alert alert-info mb-3" role="alert">
            <div className="d-flex align-items-center">
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Đang xử lý...</span>
              </div>
              <span>Đang thêm thông tin sản phẩm...</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

const AddProductForm_Admin = RequireAdmin(AddProductForm);

export default AddProductForm_Admin;
