import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

import { PaymentResult as PaymentResultType } from "../../models/PaymentResult";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Fade,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchPaymentResult } from "../../service/API/PaymentAPI";

const PaymentResult: React.FC = () => {
  const [result, setResult] = useState<PaymentResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentResult = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const paymentResult = await fetchPaymentResult(queryParams);
        setResult(paymentResult);

        if (paymentResult.isPay) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#4caf50", "#2196f3", "#ffeb3b"],
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

    getPaymentResult();
  }, [location]);

  if (loading) {
    return (
      <Box
        className="d-flex align-items-center justify-content-center"
        sx={{ bgcolor: "#f5f5f5" }}
      >
        <Fade in={loading}>
          <Box textAlign="center">
            <CircularProgress size={50} color="primary" />
            <Typography variant="h5" mt={2} color="textSecondary">
              Đang kiểm tra thanh toán...
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Vui lòng đợi trong giây lát.
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  if (error || !result) {
    return (
      <Box
        className="d-flex align-items-center justify-content-center"
        sx={{ bgcolor: "#f5f5f5" }}
      >
        <Fade in={true}>
          <Card sx={{ maxWidth: 500, width: "100%", p: 3, boxShadow: 3 }}>
            <CardContent>
              <ErrorIcon sx={{ fontSize: 60, color: "#d32f2f" }} />
              <Typography variant="h4" color="error" gutterBottom>
                Thanh toán thất bại
              </Typography>
              <Typography variant="body1" color="textSecondary" mb={4}>
                {error || "Không thể xác minh trạng thái thanh toán."}
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/checkout")}
                  sx={{ borderRadius: 20 }}
                >
                  Thử lại
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/")}
                  sx={{ borderRadius: 20 }}
                >
                  Quay lại trang chủ
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      className=" d-flex align-items-center justify-content-center"
      sx={{ bgcolor: "#f5f5f5" }}
    >
      <Fade in={true}>
        <Card sx={{ maxWidth: 500, width: "100%", p: 3, boxShadow: 3 }}>
          <CardContent>
            {result.isPay ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 60, color: "#4caf50" }} />
                <Typography variant="h4" color="success.main" gutterBottom>
                  Thanh toán thành công!
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={3}>
                  Cảm ơn bạn đã thanh toán đơn hàng.
                </Typography>
                <Box textAlign="left" mb={4}>
                  <Typography variant="body2">
                    <strong>Mã đơn hàng:</strong>{" "}
                    {result.orderId.replace("ORDER_", "")}
                  </Typography>
                  {result.transactionNo && (
                    <Typography variant="body2">
                      <strong>Mã giao dịch:</strong> {result.transactionNo}
                    </Typography>
                  )}
                  {result.amount && (
                    <Typography variant="body2">
                      <strong>Số tiền:</strong>{" "}
                      {(parseInt(result.amount) / 100).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </Typography>
                  )}
                  {result.bankCode && (
                    <Typography variant="body2">
                      <strong>Ngân hàng:</strong> {result.bankCode}
                    </Typography>
                  )}
                  {result.payDate && (
                    <Typography variant="body2">
                      <strong>Thời gian:</strong> {result.payDate}
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/")}
                  sx={{ borderRadius: 20, px: 4 }}
                >
                  Quay lại trang chủ
                </Button>
              </>
            ) : (
              <>
                <ErrorIcon sx={{ fontSize: 60, color: "#d32f2f" }} />
                <Typography variant="h4" color="error" gutterBottom>
                  Thanh toán thất bại
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={4}>
                  {result.message}
                </Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/checkout")}
                    sx={{ borderRadius: 20 }}
                  >
                    Thử lại
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/")}
                    sx={{ borderRadius: 20 }}
                  >
                    Quay lại trang chủ
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default PaymentResult;
