// src/components/Dashboard.tsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RevenueChart from "./Charts/RevenueChart";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
interface StatItem {
  icon: string;
  title: string;
  value: string;
}
const Dashboard: React.FC = () => {
  const stats: StatItem[] = [
    { icon: "chart-line", title: "Lược Truy Cập ", value: "10000" },
    { icon: "chart-bar", title: "Doanh Thu Hôm Nay", value: "$1234" },
    { icon: "chart-area", title: "Tổng Lợi Nhuận", value: "$25245" },
    { icon: "chart-pie", title: "Tỷ Lệ Trả Hàng", value: "0%" },
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Biểu Đồ Doanh Thu</h6>
            <RevenueChart />
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Biểu Đồ Doanh Thu Theo Tháng</h6>
            <RevenueChart />
          </div>
        </Col>
      </Row>
      <Row className="g-4">
        {stats.map((item, index) => (
          <Col sm={6} xl={3} key={index}>
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className={`fa fa-${item.icon} fa-5x text-primary`}></i>
              <div className="ms-3">
                <p className="mb-2 ">{item.title}</p>
                <h6 className="mb-0">{item.value}</h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="g-4 mt-4">
        <Col sm={12}>
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Đơn hàng </h6>
              <a href="#">Xem tất cả </a>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th scope="col">Mã Đơn hàng</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Giá Tiền</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i: number) => (
                    <tr key={i}>
                      <td>01 Jan 2045</td>
                      <td>INV-0123</td>
                      <td>Jhon Doe</td>
                      <td>$123</td>
                      <td>Paid</td>
                      <td>
                        <a className="btn btn-sm btn-primary" href="#">
                          Detail
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
