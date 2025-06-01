// src/components/Charts.tsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2000],
        backgroundColor: "#4A90E2",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [1000, 1500, 2500, 4000, 1800],
        borderColor: "#4A90E2",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Dataset",
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container fluid>
      <Row className="g-4">
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Bar Chart</h6>
            <Bar data={barData} />
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Line Chart</h6>
            <Line data={lineData} />
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Pie Chart</h6>
            <Pie data={pieData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
