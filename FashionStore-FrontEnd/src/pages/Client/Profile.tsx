import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddressForm from "../../components/Client/Order/AddressForm";
import AddressList from "../../components/Client/Order/AddressList";
import BankForm from "../../components/Client/Checkout/BankForm";
import ListBank from "../../components/Client/Checkout/ListBank";
import { AddressModel } from "../../models/AddressModel";

interface BankAccount {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: "Nguyễn",
    lastName: "Văn A",
    sex: "male",
    email: "example@gmail.com",
    phoneNumber: "0123456789",
    userName: "nguyenvana",
    avatar: "/avatar-placeholder.png",
  });

  const [addresses, setAddresses] = useState<AddressModel[]>([
    {
      addressId: 1,
      streetName: "123 Đường Lê Lợi",
      cityName: "TP. Hồ Chí Minh",
      districtName: "Quận 1",
      wardName: "Phường Bến Nghé",
    },
    {
      addressId: 2,
      streetName: "456 Đường Nguyễn Huệ",
      cityName: "TP. Hồ Chí Minh",
      districtName: "Quận 1",
      wardName: "Phường Bến Thành",
    },
  ]);

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      bankName: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "NGUYEN VAN A",
    },
    {
      id: 2,
      bankName: "TPBank",
      accountNumber: "0987654321",
      accountName: "NGUYEN VAN A",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          setUserProfile((prev) => ({
            ...prev,
            avatar: (event.target?.result as string) || prev.avatar,
          }));
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddAddress = (address: AddressModel) => {
    const newAddress = {
      ...address,
      addressId: addresses.length
        ? Math.max(...addresses.map((a) => a.addressId || 0)) + 1
        : 1,
    };
    setAddresses((prev) => [...prev, newAddress]);
  };

  const handleSelectAddress = (addressId: number) => {
    setSelectedAddressId(addressId);
  };

  const handleAddBank = (bank: BankAccount) => {
    const newBank = {
      ...bank,
      id: bankAccounts.length
        ? Math.max(...bankAccounts.map((b) => b.id || 0)) + 1
        : 1,
    };
    setBankAccounts((prev) => [...prev, newBank]);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thông tin đã được lưu thành công!");
  };

  return (
    <div className="container py-5">
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, color: "#1976d2", fontWeight: "bold" }}
      >
        Thông tin cá nhân
      </Typography>

      <form onSubmit={handleSaveChanges}>
        {/* Basic Information */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
              Thông tin cơ bản
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              {/* Avatar Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: { xs: "100%", md: "250px" },
                }}
              >
                <Box sx={{ position: "relative", mb: 2 }}>
                  <Avatar
                    src={userProfile.avatar}
                    alt={`${userProfile.firstName} ${userProfile.lastName}`}
                    sx={{ width: 150, height: 150, boxShadow: 2 }}
                  />
                  <label htmlFor="avatar-upload">
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      style={{ display: "none" }}
                    />
                    <IconButton
                      color="primary"
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {userProfile.firstName} {userProfile.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  @{userProfile.userName}
                </Typography>
              </Box>

              {/* User Information Fields */}
              <Box sx={{ flexGrow: 1 }}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Họ"
                      name="firstName"
                      value={userProfile.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Tên"
                      name="lastName"
                      value={userProfile.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </div>
                </div>

                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend">Giới tính</FormLabel>
                  <RadioGroup
                    row
                    name="sex"
                    value={userProfile.sex}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Khác"
                    />
                  </RadioGroup>
                </FormControl>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={userProfile.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phoneNumber"
                      value={userProfile.phoneNumber}
                      onChange={handleInputChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </div>
                </div>

                <TextField
                  fullWidth
                  label="Tên đăng nhập"
                  name="userName"
                  value={userProfile.userName}
                  variant="outlined"
                  margin="normal"
                  disabled
                  sx={{ mb: 2 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Addresses and Banks section */}
        <div className="row">
          {/* Addresses */}
          <div className="col-md-6 mb-4">
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent sx={{ p: 4, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  Địa chỉ giao hàng
                </Typography>

                <AddressList
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={handleSelectAddress}
                />

                <AddressForm onAddAddress={handleAddAddress} />
              </CardContent>
            </Card>
          </div>

          {/* Bank accounts */}
          <div className="col-md-6 mb-4">
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent sx={{ p: 4, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  Tài khoản ngân hàng
                </Typography>

                <ListBank bankAccounts={bankAccounts} />

                <BankForm onAddBank={handleAddBank} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1,
              borderRadius: 28,
              backgroundColor: "#ffc107",
              color: "#212121",
              "&:hover": { backgroundColor: "#ffb300" },
            }}
          >
            Lưu thay đổi
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Profile;
