import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import confetti from "canvas-confetti";
import RestResponse from "../../models/RestResponse";

interface PaymentResult {
  isValid: boolean;
  isPay: boolean;
  message: string;
  orderId: string;
  transactionNo?: string;
  amount?: string;
  bankCode?: string;
  payDate?: string;
}

const PaymentResult: React.FC = () => {
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const response = await axios.get<RestResponse<PaymentResult>>(
          `${API_BASE_URL}/api/payment/vnpay-return`,
          {
            params: Object.fromEntries(queryParams),
          }
        );

        const paymentResult = response.data.data;
        console.log(response.data);
        setResult(paymentResult);

        if (paymentResult.isPay) {
          // Hiệu ứng chúc mừng
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } catch (err) {
        setError(
          "Lỗi kiểm tra trạng thái thanh toán: " + (err as Error).message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentResult();
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Đang kiểm tra thanh toán...
          </h2>
          <p className="text-gray-600">Vui lòng đợi trong giây lát.</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Thanh toán thất bại
          </h2>
          <p className="text-gray-700 mb-6">
            {error || "Không thể xác minh trạng thái thanh toán."}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Thử lại
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        {result.isPay ? (
          <>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Chúc mừng! Thanh toán thành công
            </h2>
            <p className="text-gray-700 mb-4">
              Cảm ơn bạn đã thanh toán đơn hàng.
            </p>
            <div className="text-left mb-6">
              <p className="mb-2">
                <strong>Mã đơn hàng:</strong>{" "}
                {result.orderId.replace("ORDER_", "")}
              </p>
              {result.transactionNo && (
                <p className="mb-2">
                  <strong>Mã giao dịch:</strong> {result.transactionNo}
                </p>
              )}
              {result.amount && (
                <p className="mb-2">
                  <strong>Số tiền:</strong>{" "}
                  {(parseInt(result.amount) / 100).toLocaleString("vi-VN")} VNĐ
                </p>
              )}
              {result.bankCode && (
                <p className="mb-2">
                  <strong>Ngân hàng:</strong> {result.bankCode}
                </p>
              )}
              {result.payDate && (
                <p className="mb-2">
                  <strong>Thời gian:</strong> {result.payDate}
                </p>
              )}
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Quay lại trang chủ
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Thanh toán thất bại
            </h2>
            <p className="text-gray-700 mb-6">{result.message}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Thử lại
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Quay lại trang chủ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
