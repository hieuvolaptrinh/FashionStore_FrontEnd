// src/components/Dashboard.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface StatItem {
  icon: string;
  title: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5000, 2000],
        backgroundColor: '#4A90E2',
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1500, 2500, 4000, 1800],
        borderColor: '#4A90E2',
        fill: false,
      },
    ],
  };

  const stats: StatItem[] = [
    { icon: 'chart-line', title: 'Today Sale', value: '$1234' },
    { icon: 'chart-bar', title: 'Total Sale', value: '$1234' },
    { icon: 'chart-area', title: 'Today Revenue', value: '$1234' },
    { icon: 'chart-pie', title: 'Total Revenue', value: '$1234' },
  ];

  return (
    <Container fluid>
      <Row className="g-4">
        {stats.map((item, index) => (
          <Col sm={6} xl={3} key={index}>
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className={`fa fa-${item.icon} fa-3x text-primary`}></i>
              <div className="ms-3">
                <p className="mb-2">{item.title}</p>
                <h6 className="mb-0">{item.value}</h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="g-4 mt-4">
        <Col sm={12} xl={6}>
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Worldwide Sales</h6>
              <a href="#">Show All</a>
            </div>
            <Bar data={salesData} />
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sales & Revenue</h6>
              <a href="#">Show All</a>
            </div>
            <Line data={revenueData} />
          </div>
        </Col>
      </Row>
      <Row className="g-4 mt-4">
        <Col sm={12}>
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Sales</h6>
              <a href="#">Show All</a>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th scope="col">
                      <input className="form-check-input" type="checkbox" />
                    </th>
                    <th scope="col">Date</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i: number) => (
                    <tr key={i}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
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