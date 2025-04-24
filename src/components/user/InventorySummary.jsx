import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const InventorySummary = ({ inventoryStats = [] }) => {
  // Default data if no stats provided
  const defaultStats = [
    { category: "Electronics", count: 0, color: "rgba(59, 130, 246, 0.7)" },
    { category: "Clothing", count: 0, color: "rgba(16, 185, 129, 0.7)" },
    { category: "Furniture", count: 0, color: "rgba(245, 158, 11, 0.7)" },
    { category: "Other", count: 0, color: "rgba(139, 92, 246, 0.7)" },
  ];

  const stats = inventoryStats.length > 0 ? inventoryStats : defaultStats;

  const chartData = {
    labels: stats.map((item) => item.category),
    datasets: [
      {
        data: stats.map((item) => item.count),
        backgroundColor: stats.map((item) => item.color),
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          padding: 16,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (acc, data) => acc + data,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "65%", // Makes the chart a donut for better small-size visibility
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Inventory Summary</h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {stats.map((item) => (
          <div key={item.category} className="flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-sm text-gray-700">
              {item.category}: <span className="font-medium">{item.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySummary;
