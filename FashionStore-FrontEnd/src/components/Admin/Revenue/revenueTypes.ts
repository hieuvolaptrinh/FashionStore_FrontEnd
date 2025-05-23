export interface RevenueSummary {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  availableBalance: number;
}

export interface OrderRevenue {
  id: string;
  customerName: string;
  orderDate: string;
  amount: number;
  status: "Đã thanh toán" | "Đang xử lý" | "Đã hủy";
  paymentMethod: string;
}

export interface WithdrawRequest {
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: "Đã xử lý" | "Đang chờ" | "Từ chối";
  requestDate: string;
  processDate?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
}

// Mock data
export const mockRevenueSummary: RevenueSummary = {
  totalRevenue: 150000000,
  totalOrders: 150,
  totalProducts: 450,
  todayRevenue: 2500000,
  weekRevenue: 15000000,
  monthRevenue: 45000000,
  availableBalance: 25000000,
};

export const mockOrders: OrderRevenue[] = [
  {
    id: "ORD001",
    customerName: "Nguyễn Văn A",
    orderDate: "2024-03-15",
    amount: 1500000,
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: "ORD002",
    customerName: "Trần Thị B",
    orderDate: "2024-03-14",
    amount: 2300000,
    status: "Đang xử lý",
    paymentMethod: "Tiền mặt",
  },
  {
    id: "ORD003",
    customerName: "Lê Văn C",
    orderDate: "2024-03-13",
    amount: 1800000,
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
];

export const mockWithdrawHistory: WithdrawRequest[] = [
  {
    id: "WD001",
    amount: 5000000,
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    accountHolder: "Nguyễn Văn A",
    status: "Đã xử lý",
    requestDate: "2024-03-10",
    processDate: "2024-03-11",
  },
  {
    id: "WD002",
    amount: 3000000,
    bankName: "Techcombank",
    accountNumber: "0987654321",
    accountHolder: "Nguyễn Văn A",
    status: "Đang chờ",
    requestDate: "2024-03-15",
  },
];

export const mockBankAccounts: BankAccount[] = [
  {
    id: "BANK001",
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    accountHolder: "Nguyễn Văn A",
    isDefault: true,
  },
  {
    id: "BANK002",
    bankName: "Techcombank",
    accountNumber: "0987654321",
    accountHolder: "Nguyễn Văn A",
    isDefault: false,
  },
];
