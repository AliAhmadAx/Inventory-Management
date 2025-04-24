import { Bar } from "react-chartjs-2";
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

const WarehouseStatusChart = ({ data }) => {
  const chartData = {
    labels: data.map((warehouse) => warehouse.name),
    datasets: [
      {
        label: "Capacity Used (%)",
        data: data.map((warehouse) => warehouse.capacity),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Inventory Value (k)",
        data: data.map((warehouse) => warehouse.inventoryValue / 1000),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label.includes("Value")) {
              return `${label}: $${context.raw.toLocaleString()}k`;
            }
            return `${label}: ${context.raw}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default WarehouseStatusChart;
