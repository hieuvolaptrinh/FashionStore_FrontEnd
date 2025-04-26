import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
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
