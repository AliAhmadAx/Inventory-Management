import { useState, useEffect } from "react";
import DashboardCard from "../../components/ui/DashboardCard";
import WarehouseStatusChart from "../../components/admin/WarehouseStatusChart";
import RecentActivities from "../../components/admin/RecentActivities";
import UserStatistics from "../../components/admin/UserStatistics";
import { useNotification } from "../../contexts/NotificationContext";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalWarehouses: 0,
    activeUsers: 0,
    storageUtilization: 0,
    pendingApprovals: 0,
    recentActivities: [],
    warehouseStats: [],
    userStats: {},
  });
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const mockData = {
          totalWarehouses: 8,
          activeUsers: 142,
          storageUtilization: 78,
          pendingApprovals: 5,
          recentActivities: [
            {
              id: 1,
              type: "user",
              action: "New registration",
              time: "2023-06-15T10:30:00",
              user: "John Doe",
            },
            {
              id: 2,
              type: "warehouse",
              action: "Inventory update",
              time: "2023-06-15T09:15:00",
              warehouse: "NY-1",
            },
            {
              id: 3,
              type: "system",
              action: "Maintenance completed",
              time: "2023-06-14T16:45:00",
            },
            {
              id: 4,
              type: "user",
              action: "Password reset",
              time: "2023-06-14T14:20:00",
              user: "Jane Smith",
            },
            {
              id: 5,
              type: "warehouse",
              action: "New shipment",
              time: "2023-06-14T11:10:00",
              warehouse: "LA-2",
            },
          ],
          warehouseStats: [
            { id: 1, name: "NY-1", capacity: 85, inventoryValue: 125000 },
            { id: 2, name: "LA-2", capacity: 72, inventoryValue: 98000 },
            { id: 3, name: "CH-3", capacity: 63, inventoryValue: 75000 },
            { id: 4, name: "TX-4", capacity: 91, inventoryValue: 142000 },
          ],
          userStats: {
            total: 142,
            active: 128,
            managers: 15,
            admins: 3,
          },
        };
        setDashboardData(mockData);
      } catch (error) {
        addNotification({
          title: "Error",
          message: "Failed to load dashboard data",
          type: "error",
        });
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [addNotification]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Warehouses"
          value={dashboardData.totalWarehouses}
          icon="🏭"
          color="bg-indigo-100 text-indigo-800"
          trend="up"
          trendValue="2 new this month"
        />
        <DashboardCard
          title="Active Users"
          value={dashboardData.activeUsers}
          icon="👥"
          color="bg-green-100 text-green-800"
          trend="up"
          trendValue="12% from last month"
        />
        <DashboardCard
          title="Storage Utilization"
          value={`${dashboardData.storageUtilization}%`}
          icon="📊"
          color="bg-blue-100 text-blue-800"
          trend={dashboardData.storageUtilization > 80 ? "up" : "down"}
          trendValue={
            dashboardData.storageUtilization > 80 ? "High usage" : "Optimal"
          }
        />
        <DashboardCard
          title="Pending Approvals"
          value={dashboardData.pendingApprovals}
          icon="⏳"
          color="bg-yellow-100 text-yellow-800"
          trend="neutral"
          trendValue="Needs attention"
        />
      </div>

      {/* Charts and Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Warehouse Status</h2>
          <WarehouseStatusChart data={dashboardData.warehouseStats} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">User Statistics</h2>
          <UserStatistics data={dashboardData.userStats} />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Activities</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
        <RecentActivities activities={dashboardData.recentActivities} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <span className="text-blue-600">➕</span>
            </div>
            <span className="text-sm font-medium">Add Warehouse</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-green-100 p-2 rounded-full mb-2">
              <span className="text-green-600">👤</span>
            </div>
            <span className="text-sm font-medium">Create User</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-purple-100 p-2 rounded-full mb-2">
              <span className="text-purple-600">📊</span>
            </div>
            <span className="text-sm font-medium">Generate Report</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-yellow-100 p-2 rounded-full mb-2">
              <span className="text-yellow-600">⚙️</span>
            </div>
            <span className="text-sm font-medium">System Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
