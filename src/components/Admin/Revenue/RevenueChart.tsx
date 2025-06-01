/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";
import { ResponseOrder } from "../../../models/OrderModel";
import { useEffect, useState } from "react";
import { getAllOrdersAdmin } from "../../../service/API/OrderAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart: React.FC<{ titleName: string }> = ({ titleName }) => {
  const [orderData, setOrderData] = useState<ResponseOrder[]>([]);

  useEffect(() => {
    getAllOrdersAdmin()
      .then((response) => {
        // Sắp xếp dữ liệu theo thời gian
        const sortedData = response.sort((a, b) => a.createAt - b.createAt);
        setOrderData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  // Format thời gian từ timestamp: ngày, tháng, năm
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Tổng hợp doanh thu theo ngày
  const aggregateByDate = (orders: ResponseOrder[]) => {
    const dailyData: { [key: string]: number } = {};

    orders.forEach((order) => {
      const dateKey = formatDate(order.createAt);
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = 0;
      }
      dailyData[dateKey] += order.totalPrice;
    });

    // Sắp xếp các ngày theo thời gian
    const sortedDates = Object.keys(dailyData).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });

    return {
      labels: sortedDates,
      data: sortedDates.map((date) => dailyData[date]),
    };
  };

  const { labels, data: aggregatedData } = aggregateByDate(orderData);

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh Thu (VND)",
        data: aggregatedData,
        backgroundColor: "rgba(0, 85, 255, 0.6)",
        borderColor: "rgba(0, 85, 255, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 34, 255, 0.8)",
        hoverBorderColor: "rgba(0, 34, 255, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: titleName,
        font: {
          size: 18,
          weight: "bold" as const,
        },
        color: "#333",
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (context: any) => {
            return `Doanh thu: ${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(context.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 10, // Giới hạn số lượng nhãn để tránh chồng lấn
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
          callback: (tickValue: string | number) => {
            if (typeof tickValue === "number") {
              return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tickValue);
            }
            return tickValue;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart" as const,
    },
  };

  return (
    <div
      style={{
        height: "400px",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
