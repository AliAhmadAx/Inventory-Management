import { useEffect, useState } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import RecentActivity from "../../components/user/RecentActivity";
import InventorySummary from "../../components/user/InventorySummary";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    activeShipments: 0,
    storageCost: 0,
    pendingActions: 0,
  });

  const activities = [
    {
      id: 1,
      type: "shipment",
      title: "New shipment processed",
      timestamp: "2023-06-15T10:30:00",
      meta: "SH-1001",
    },
    {
      id: 2,
      type: "inventory",
      title: "Inventory items added",
      timestamp: "2023-06-14T15:45:00",
      meta: "5 items",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment received",
      timestamp: "2023-06-14T09:20:00",
      meta: "$125.00",
    },
  ];

  const inventoryStats = [
    { category: "Electronics", count: 42, color: "rgba(59, 130, 246, 0.7)" },
    { category: "Clothing", count: 38, color: "rgba(16, 185, 129, 0.7)" },
    { category: "Furniture", count: 15, color: "rgba(245, 158, 11, 0.7)" },
    { category: "Other", count: 12, color: "rgba(139, 92, 246, 0.7)" },
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchDashboardData = async () => {
      // Mock data
      setStats({
        totalItems: 42,
        activeShipments: 3,
        storageCost: 1245.5,
        pendingActions: 2,
      });
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Items"
          value={stats.totalItems}
          icon="📦"
          color="bg-blue-100 text-blue-800"
        />
        <DashboardCard
          title="Active Shipments"
          value={stats.activeShipments}
          icon="🚚"
          color="bg-green-100 text-green-800"
        />
        <DashboardCard
          title="Storage Cost"
          value={`$${stats.storageCost.toFixed(2)}`}
          icon="💰"
          color="bg-purple-100 text-purple-800"
        />
        <DashboardCard
          title="Pending Actions"
          value={stats.pendingActions}
          icon="⏳"
          color="bg-yellow-100 text-yellow-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={activities} />
        <InventorySummary inventoryStats={inventoryStats} />
      </div>
    </div>
  );
};

export default UserDashboard;
