import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import RevenueChart from "../../components/Admin/Revenue/RevenueChart";
import OrderRevenueTable from "../../components/Admin/Revenue/OrderRevenueTable";
import WithdrawForm from "../../components/Admin/Revenue/WithdrawForm";
import WithdrawHistory from "../../components/Admin/Revenue/WithdrawHistory";
import {
  mockRevenueSummary,
  mockOrders,
  mockWithdrawHistory,
  mockBankAccounts,
  BankAccount,
  WithdrawRequest,
} from "../../components/Admin/Revenue/revenueTypes";

const AdminRevenuePage: React.FC = () => {
  const [bankAccounts, setBankAccounts] =
    useState<BankAccount[]>(mockBankAccounts);
  const [withdrawHistory, setWithdrawHistory] =
    useState<WithdrawRequest[]>(mockWithdrawHistory);

  const handleWithdraw = (amount: number, bankAccountId: string) => {
    const bankAccount = bankAccounts.find((acc) => acc.id === bankAccountId);
    if (bankAccount) {
      const newWithdrawRequest: WithdrawRequest = {
        id: `WD${Date.now()}`,
        amount,
        bankName: bankAccount.bankName,
        accountNumber: bankAccount.accountNumber,
        accountHolder: bankAccount.accountHolder,
        status: "Đang chờ",
        requestDate: new Date().toISOString().split("T")[0],
      };
      setWithdrawHistory([newWithdrawRequest, ...withdrawHistory]);
    }
  };

  const handleAddBankAccount = (newAccount: Omit<BankAccount, "id">) => {
    const bankAccount: BankAccount = {
      ...newAccount,
      id: `BANK${Date.now()}`,
    };
    setBankAccounts([...bankAccounts, bankAccount]);
  };

  return (
    <div className="admin-revenue-page bg-light min-vh-100 py-4">
      <Container fluid>
        {/* <Row className="mb-4">
          <Col>
            <div className="bg-white rounded shadow-sm p-4">
              <h2 className="text-primary mb-2">Quản lý doanh thu</h2>
              <p className="text-muted mb-0">
                Theo dõi và quản lý doanh thu của cửa hàng
              </p>
            </div>
          </Col>
        </Row> */}

        {/* Revenue Summary */}

        {/* Charts */}
        <Row className="mb-4 g-4">
          <Col xs={12} lg={6}>
            <div className="bg-white rounded shadow-sm h-100">
              <div className="p-4">
                <RevenueChart titleName="Biểu Đồ Doanh Thu Theo Ngày" />
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="bg-white rounded shadow-sm h-100">
              <div className="p-4">
                <WithdrawForm
                  availableBalance={mockRevenueSummary.availableBalance}
                  bankAccounts={bankAccounts}
                  onWithdraw={handleWithdraw}
                  onAddBankAccount={handleAddBankAccount}
                />
              </div>
            </div>
          </Col>
          <Col xs={12} lg={12}>
            <div className="bg-white rounded shadow-sm h-100">
              <div className="p-4">
                <WithdrawHistory data={withdrawHistory} />
              </div>
            </div>
          </Col>
          <Col xs={12} lg={12}>
            <div className="bg-white rounded shadow-sm">
              <div className="p-4">
                <h5 className="mb-4">Lịch sử đơn hàng</h5>
                <OrderRevenueTable data={mockOrders} />
              </div>
            </div>
          </Col>

          {/* Withdraw Section */}
        </Row>
      </Container>
    </div>
  );
};

export default AdminRevenuePage;
