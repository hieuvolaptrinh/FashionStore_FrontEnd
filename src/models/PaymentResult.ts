export interface PaymentResult {
  isValid: boolean;
  isPay: boolean;
  message: string;
  orderId: string;
  transactionNo?: string;
  amount?: string;
  bankCode?: string;
  payDate?: string;
}
