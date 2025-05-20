import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AddressForm from "../../components/Client/Order/AddressForm";
import AddressList from "../../components/Client/Order/AddressList";
import BankForm from "../../components/Client/Checkout/BankForm";
import ListBank from "../../components/Client/Checkout/ListBank";
import { AddressModel } from "../../models/AddressModel";
import { UserModel } from "../../models/UserModel";
import { getUser, updateUser } from "../../service/API/UserAPI";
import { createAddress, getUserAddresses } from "../../service/API/OrderAPI";

interface BankAccount {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserModel>({
    userId: 0,
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    avatarBase64: null,
  });

  const [updatePassword, setUpdatePassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [addresses, setAddresses] = useState<AddressModel[]>([]);

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

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        setUserProfile(userData);
        const addressesData = await getUserAddresses();
        setAddresses(addressesData);

        if (addressesData.length > 0 && addressesData[0].addressId) {
          setSelectedAddressId(addressesData[0].addressId);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showNotification("Không thể tải thông tin người dùng", "error");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const showNotification = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatePassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64String = (event.target.result as string).split(",")[1]; // Remove data:image/jpeg;base64,
          setUserProfile((prev) => ({
            ...prev,
            avatarBase64: base64String,
          }));
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleAddAddress = async (address: AddressModel) => {
    try {
      setUpdating(true);
      const newAddress = await createAddress(address);
      setAddresses((prev) => [...prev, newAddress]);
      alert("Thêm địa chỉ thành công");

      // Automatically select the newly added address
      if (newAddress.addressId) {
        setSelectedAddressId(newAddress.addressId);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      showNotification("Không thể thêm địa chỉ mới", "error");
    } finally {
      setUpdating(false);
    }
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
    showNotification("Thêm tài khoản ngân hàng thành công", "success");
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password update if requested
    if (updatePassword.newPassword) {
      if (updatePassword.newPassword !== updatePassword.confirmPassword) {
        showNotification("Mật khẩu xác nhận không khớp", "error");
        return;
      }

      // Add password to the update payload
      setUserProfile((prev) => ({
        ...prev,
        password: updatePassword.newPassword,
      }));
    }

    setUpdating(true);

    try {
      const userDataToUpdate: UserModel = {
        ...userProfile,

        password: updatePassword.newPassword || userProfile.password,
      };

      await updateUser(userDataToUpdate);
      setUpdatePassword({
        newPassword: "",
        confirmPassword: "",
      });

      showNotification("Cập nhật thông tin thành công", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showNotification("Cập nhật thông tin không thành công", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <Card
          elevation={3}
          sx={{ mb: 4, borderRadius: "12px", overflow: "hidden" }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
            >
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
                  background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
                  p: 3,
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ position: "relative", mb: 2 }}>
                  <Avatar
                    src={
                      userProfile.avatarBase64
                        ? `data:image/jpeg;base64,${userProfile.avatarBase64}`
                        : "/avatar-placeholder.png"
                    }
                    alt={`${userProfile.firstName} ${userProfile.lastName}`}
                    sx={{
                      width: 150,
                      height: 150,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      border: "4px solid white",
                    }}
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
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>

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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
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

                <Typography
                  variant="subtitle1"
                  sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
                >
                  Đổi mật khẩu
                </Typography>

                <div className="row">
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      type="password"
                      label="Mật khẩu mới"
                      name="newPassword"
                      value={updatePassword.newPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      type="password"
                      label="Xác nhận mật khẩu"
                      name="confirmPassword"
                      value={updatePassword.confirmPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Addresses and Banks section */}
        <div className="row">
          {/* Addresses */}
          <div className="col-md-6 mb-4">
            <Card
              elevation={3}
              sx={{ height: "100%", borderRadius: "12px", overflow: "hidden" }}
            >
              <CardContent sx={{ p: 4, height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
                >
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
            <Card
              elevation={3}
              sx={{ height: "100%", borderRadius: "12px", overflow: "hidden" }}
            >
              <CardContent sx={{ p: 4, height: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
                >
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
            disabled={updating}
            startIcon={
              updating && <CircularProgress size={20} color="inherit" />
            }
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 28,
              backgroundColor: "#ffc107",
              color: "#212121",
              boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)",
              "&:hover": { backgroundColor: "#ffb300" },
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            {updating ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
