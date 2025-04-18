// biểu đồ lợi nhuận

import { Bar } from "react-chartjs-2";
import { ResponseOrder } from "../../../models/OrderModel";
import { useEffect, useState } from "react";
import { getAllOrdersAdmin } from "../../../service/API/OrderAPI";

const RevenueChart: React.FC = () => {
  const [orderData, setOrderData] = useState<ResponseOrder[]>([]);
  useEffect(() => {
    getAllOrdersAdmin()
      .then((response) => {
        setOrderData(response);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const data: {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string }[];
  } = {
    labels: [],
    datasets: [
      {
        label: "Doanh Thu",
        data: [],
        borderColor: "#4A90E2",
      },
    ],
  };
  data.labels.push(...orderData.map((order) => order.createAt));
  data.datasets[0].data.push(...orderData.map((order) => order.totalPrice));

  return (
    <div>
      <h2>Biểu Đồ Doanh Thu</h2>
      <Bar data={data} />
    </div>
  );
};

export default RevenueChart;
