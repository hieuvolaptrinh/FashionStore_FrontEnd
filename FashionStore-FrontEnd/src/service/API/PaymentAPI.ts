import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import RestResponse from "../../models/RestResponse";
import { PaymentResult } from "../../models/PaymentResult";
export const getUrlPayment = async (orderId: number, amount: number) => {
  const username = localStorage.getItem("username") || "";
  try {
    const paymentData = {
      orderId: orderId,
      amount,
      orderInfo: username + "Thanh toán đơn hàng",
      bankCode: "NCB",
      language: "vn",
      ipAddress: "127.0.0.1", // tạm thời
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/payment/create-payment`,
      paymentData
    );
    return response.data.data.message;
  } catch (err) {
    console.error("Error fetching payment URL:", err);
    throw err;
  }
};

export const fetchPaymentResult = async (
  queryParams: URLSearchParams
): Promise<PaymentResult> => {
  try {
    const response = await axios.get<RestResponse<PaymentResult>>(
      `${API_BASE_URL}/api/payment/vnpay-return`,
      {
        params: Object.fromEntries(queryParams),
      }
    );
    return response.data.data;
  } catch (err) {
    console.error("Error fetching payment result:", err);
    throw new Error("Không thể kiểm tra trạng thái thanh toán");
  }
};
