// components/order/AddressList.tsx
import React from "react";
import { AddressModel } from "../../models/AddressModel";

interface AddressListProps {
  addresses: AddressModel[];
  selectedAddressId: number | null;
  onSelectAddress: (addressId: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
}) => {
  return (
    <div className="mb-4">
      <h6 className="mb-3 fw-bold">Chọn địa chỉ giao hàng</h6>
      {addresses.length === 0 ? (
        <p className="text-muted">
          Bạn chưa có địa chỉ nào. Thêm địa chỉ mới bên dưới.
        </p>
      ) : (
        <div className="row">
          {addresses.map((address) => (
            <div key={address.addressId} className="col-md-6 mb-3">
              <div
                className={`card h-100 border ${
                  selectedAddressId === address.addressId
                    ? "border-primary shadow"
                    : ""
                }`}
                style={{
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onClick={() =>
                  onSelectAddress(address.addressId ? address.addressId : 0)
                }
              >
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === address.addressId}
                      onChange={() =>
                        onSelectAddress(
                          address.addressId ? address.addressId : 0
                        )
                      }
                      className="me-2"
                    />
                    <h6 className="mb-0">{address.streetName}</h6>
                  </div>
                  <p className="text-muted mb-1">
                    {address.wardName}, {address.districtName}
                  </p>
                  <p className="text-muted">{address.cityName}</p>
                  {address.addressId === addresses[0].addressId && (
                    <span className="badge bg-success rounded-pill">
                      Mặc định
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;
