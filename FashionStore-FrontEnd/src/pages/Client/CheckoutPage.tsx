import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddressModel } from "../../models/AddressModel";
import {
  OrderModel,
  PaymentType,
  ShippingMethod,
} from "../../models/OrderModel";
import { CartDetailModel } from "../../models/CartModel";
import {
  createAddress,
  createOrder,
  getAllPaymentTypes,
  getAllShippingMethods,
  getUserAddresses,
} from "../../service/API/OrderAPI";
import { getSelectedCartDetails } from "../../service/API/CartAPI";
import AddressList from "../../components/Client/Order/AddressList";
import AddressForm from "../../components/Client/Order/AddressForm";
import OrderSummary from "../../components/Client/Order/OrderSummary";
import BankForm from "../../components/Client/Checkout/BankForm";
import ListBank from "../../components/Client/Checkout/ListBank";
import { getUrlPayment } from "../../service/API/PaymentAPI";
import {
  Typography,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { bankAccountsFakeData } from "../../components/Client/Checkout/bankAccountFakeData";

interface BankAccount {
  id?: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || [];

  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<PaymentType | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);
  const [cartDetails, setCartDetails] = useState<CartDetailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] =
    useState<BankAccount[]>(bankAccountsFakeData);
  const [selectedBankId, setSelectedBankId] = useState<number | undefined>(1);

  useEffect(() => {
    console.log("Received selectedIds:", selectedIds);

    if (selectedIds.length === 0) {
      setError("Không có sản phẩm nào được chọn");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Vui lòng đăng nhập để tiếp tục");
        }

        const [addressData, cartData, paymentData, shippingData] =
          await Promise.all([
            getUserAddresses(),
            getSelectedCartDetails(selectedIds),
            getAllPaymentTypes(),
            getAllShippingMethods(),
          ]);

        console.log("Fetched cart details:", cartData);

        if (!cartData || cartData.length === 0) {
          throw new Error("Không tìm thấy sản phẩm được chọn");
        }

        setAddresses(addressData);
        setCartDetails(cartData);
        setPaymentTypes(paymentData);
        setShippingMethods(shippingData);

        if (addressData.length > 0) {
          setSelectedAddressId(addressData[0].addressId ?? null);
        }
        if (paymentData.length > 0) {
          setSelectedPaymentType(paymentData[0]);
        }
        if (shippingData.length > 0) {
          setSelectedShippingMethod(shippingData[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedIds, navigate]);

  const handleAddAddress = async (newAddress: AddressModel) => {
    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses((prev) => [...prev, createdAddress]);
      setSelectedAddressId(createdAddress.addressId ?? null);
    } catch (err) {
      alert("Không thể thêm địa chỉ mới: " + err);
    }
  };

  const handleAddBank = (bank: BankAccount) => {
    const newBank = {
      ...bank,
      id: bankAccounts.length
        ? Math.max(...bankAccounts.map((b) => b.id || 0)) + 1
        : 1,
    };
    setBankAccounts((prev) => [...prev, newBank]);
    setSelectedBankId(newBank.id);
  };

  const handleSelectBank = (bankId: number | undefined) => {
    setSelectedBankId(bankId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) {
      alert("Vui lòng chọn hoặc thêm một địa chỉ giao hàng");
      return;
    }
    if (!selectedPaymentType) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }
    if (!selectedShippingMethod) {
      alert("Vui lòng chọn phương thức vận chuyển");
      return;
    }

    // Kiểm tra nếu phương thức thanh toán là chuyển khoản (id = 1) thì phải chọn tài khoản ngân hàng
    if (selectedPaymentType.paymentTypeId === 1 && !selectedBankId) {
      alert("Vui lòng chọn tài khoản ngân hàng để chuyển khoản");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return;
    }

    const payload: OrderModel = {
      addressId: selectedAddressId,
      paymentTypeId: selectedPaymentType?.paymentTypeId ?? 0,
      shippingMethodId: selectedShippingMethod?.shippingMethodId ?? 0,
      selectedIds,
      bankAccountId:
        selectedPaymentType.paymentTypeId === 1 ? selectedBankId : undefined,
    };

    try {
      const orderId = await createOrder(payload);

      if (selectedPaymentType.paymentTypeId != 1) {
        alert("Đơn hàng đã được xác nhận!");
        navigate("/order");
      } else {
        const productTotal = cartDetails.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        // chỗ này id =1 nghĩa là tôi đang thanh toán online
        alert("Đơn hàng đã được xác nhận! Chuyển đến trang thanh toán.");
        //  chỗ này chuyển sang trang thanh toán

        const paymentUrl = await getUrlPayment(orderId, productTotal);
        window.location.href = paymentUrl; // Chuyển hướng đến VNPay
        //
      }
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại: " + err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="container-fluid py-2">
      <div className="row px-xl-5">
        <div className="col-lg-6 mb-5">
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  position: "relative",
                  display: "inline-block",
                  background: "linear-gradient(90deg, #007bff, #00d4ff)",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Thông tin giao hàng
              </Typography>

              <AddressList
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
              />
              <AddressForm onAddAddress={handleAddAddress} />

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="payment-type-label">
                    Phương Thức Thanh Toán
                  </InputLabel>
                  <Select
                    labelId="payment-type-label"
                    id="payment-type"
                    value={selectedPaymentType?.paymentTypeId || ""}
                    label="Phương Thức Thanh Toán"
                    onChange={(e) => {
                      const selected = paymentTypes.find(
                        (pt) => pt.paymentTypeId === Number(e.target.value)
                      );
                      setSelectedPaymentType(selected || null);
                    }}
                    required
                  >
                    <MenuItem value="" disabled>
                      Chọn phương thức thanh toán
                    </MenuItem>
                    {paymentTypes.map((pt) => (
                      <MenuItem key={pt.paymentTypeId} value={pt.paymentTypeId}>
                        {pt.paymentTypeName} ({pt.fee.toLocaleString("vi-VN")}{" "}
                        vnđ)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Hiển thị ListBank và BankForm khi chọn phương thức thanh toán có id = 1 */}
                {selectedPaymentType?.paymentTypeId === 1 && (
                  <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ mb: 2 }}
                    >
                      Chọn Tài Khoản Ngân Hàng
                    </Typography>
                    <ListBank
                      bankAccounts={bankAccounts}
                      selectedBankId={selectedBankId}
                      onSelectBank={handleSelectBank}
                    />
                    <BankForm onAddBank={handleAddBank} />
                  </Paper>
                )}

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="shipping-method-label">
                    Phương Thức Vận Chuyển
                  </InputLabel>
                  <Select
                    labelId="shipping-method-label"
                    id="shipping-method"
                    value={selectedShippingMethod?.shippingMethodId || ""}
                    label="Phương Thức Vận Chuyển"
                    onChange={(e) => {
                      const selected = shippingMethods.find(
                        (sm) => sm.shippingMethodId === Number(e.target.value)
                      );
                      setSelectedShippingMethod(selected || null);
                    }}
                    required
                  >
                    <MenuItem value="" disabled>
                      Chọn phương thức vận chuyển
                    </MenuItem>
                    {shippingMethods.map((sm) => (
                      <MenuItem
                        key={sm.shippingMethodId}
                        value={sm.shippingMethodId}
                      >
                        {sm.shippingMethodName} (
                        {sm.fee.toLocaleString("vi-VN")} vnđ)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      py: 1,
                      px: 3,
                      borderRadius: 28,
                      background: "linear-gradient(90deg, #007bff, #00d4ff)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #0062cc, #00aeff)",
                      },
                    }}
                  >
                    Xác Nhận Đơn Hàng
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-lg-6 mb-5">
          <OrderSummary
            cartDetails={cartDetails}
            selectedPaymentType={selectedPaymentType}
            selectedShippingMethod={selectedShippingMethod}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </Box>
  );
};

export default CheckoutPage;
