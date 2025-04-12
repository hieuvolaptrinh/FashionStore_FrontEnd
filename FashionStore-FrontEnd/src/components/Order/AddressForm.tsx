// components/order/AddressForm.tsx
import React, { useState } from "react";
import { AddressModel } from "../../models/AddressModel";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.streetName ||
      !formData.cityName ||
      !formData.districtName ||
      !formData.wardName
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ");
      return;
    }
    onAddAddress(formData as AddressModel);
    setFormData({
      streetName: "",
      cityName: "",
      districtName: "",
      wardName: "",
    });
    setIsOpen(false);
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
                  className="form-control"
                  id="streetName"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên đường"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cityName" className="form-label">
                  Thành Phố
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cityName"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên thành phố"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="districtName" className="form-label">
                  Quận/Huyện
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="districtName"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên quận/huyện"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wardName" className="form-label">
                  Phường/Xã
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="wardName"
                  name="wardName"
                  value={formData.wardName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên phường/xã"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary rounded-pill">
                Lưu địa chỉ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
