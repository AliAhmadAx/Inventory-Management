import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryStatusChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Item Count",
        data: data.map((item) => item.count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (acc, curr) => acc + curr,
              0
            );
            const value = context.raw;
            const percentage = Math.round((value / total) * 100);
            const category = data[context.dataIndex];
            return [
              `${context.label}: ${value} items`,
              `Value: $${category.value.toLocaleString()}`,
              `Percentage: ${percentage}%`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default InventoryStatusChart;
