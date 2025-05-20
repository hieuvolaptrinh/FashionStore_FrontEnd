import React, { useState } from "react";
import { AddressModel } from "../../../models/AddressModel";

interface AddressFormProps {
  onAddAddress: (address: AddressModel) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddAddress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AddressModel>>({
    streetName: "",
    cityName: "",
    districtName: "",
    wardName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.streetName?.trim()) {
      newErrors.streetName = "Vui lòng nhập tên đường";
    }

    if (!formData.cityName?.trim()) {
      newErrors.cityName = "Vui lòng nhập tên thành phố";
    }

    if (!formData.districtName?.trim()) {
      newErrors.districtName = "Vui lòng nhập tên quận/huyện";
    }

    if (!formData.wardName?.trim()) {
      newErrors.wardName = "Vui lòng nhập tên phường/xã";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Ensure all required fields are present
      const addressData: AddressModel = {
        streetName: formData.streetName || "",
        cityName: formData.cityName || "",
        districtName: formData.districtName || "",
        wardName: formData.wardName || "",
      };

      await onAddAddress(addressData);

      // Reset form after successful submission
      setFormData({
        streetName: "",
        cityName: "",
        districtName: "",
        wardName: "",
      });

      // Close form after submission
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting address form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="btn btn-outline-primary w-100 rounded-pill"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Ẩn form thêm địa chỉ" : "Thêm địa chỉ mới"}
      </button>
      {isOpen && (
        <div className="card border-0 mt-3 shadow-sm">
          <div className="card-body">
            <h6 className="mb-3 fw-bold">Thêm địa chỉ mới</h6>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="streetName" className="form-label">
                  Tên Đường
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.streetName ? "is-invalid" : ""
                  }`}
                  id="streetName"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên đường"
                />
                {errors.streetName && (
                  <div className="invalid-feedback">{errors.streetName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="cityName" className="form-label">
                  Thành Phố
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.cityName ? "is-invalid" : ""
                  }`}
                  id="cityName"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên thành phố"
                />
                {errors.cityName && (
                  <div className="invalid-feedback">{errors.cityName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="districtName" className="form-label">
                  Quận/Huyện
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.districtName ? "is-invalid" : ""
                  }`}
                  id="districtName"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên quận/huyện"
                />
                {errors.districtName && (
                  <div className="invalid-feedback">{errors.districtName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="wardName" className="form-label">
                  Phường/Xã
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.wardName ? "is-invalid" : ""
                  }`}
                  id="wardName"
                  name="wardName"
                  value={formData.wardName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên phường/xã"
                />
                {errors.wardName && (
                  <div className="invalid-feedback">{errors.wardName}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary rounded-pill"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang lưu..." : "Lưu địa chỉ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
