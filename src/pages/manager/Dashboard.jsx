import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import DashboardCard from "../../components/ui/DashboardCard";
import InventoryStatusChart from "../../components/manager/InventoryStatusChart";
import PendingTasks from "../../components/manager/PendingTasks";
import RecentShipments from "../../components/manager/RecentShipments";
import {
  CubeIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalItems: 0,
    pendingShipments: 0,
    overdueTasks: 0,
    storageUtilization: 0,
    inventoryStats: [],
    pendingTasks: [],
    recentShipments: [],
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call filtered by manager's warehouse
        const mockData = {
          totalItems: 1245,
          pendingShipments: 18,
          overdueTasks: 3,
          storageUtilization: 78,
          inventoryStats: [
            { category: "Electronics", count: 420, value: 125000 },
            { category: "Clothing", count: 385, value: 45000 },
            { category: "Furniture", count: 210, value: 85000 },
            { category: "Other", count: 230, value: 35000 },
          ],
          pendingTasks: [
            {
              id: 1,
              type: "inventory",
              title: "Verify electronics stock",
              due: "2023-06-16",
              priority: "high",
            },
            {
              id: 2,
              type: "shipment",
              title: "Process NY-4521 shipment",
              due: "2023-06-17",
              priority: "medium",
            },
            {
              id: 3,
              type: "inventory",
              title: "Monthly safety check",
              due: "2023-06-20",
              priority: "low",
            },
            {
              id: 4,
              type: "shipment",
              title: "Prepare items for return",
              due: "2023-06-15",
              priority: "high",
            },
          ],
          recentShipments: [
            {
              id: "SH-1001",
              customer: "TechGadgets Inc",
              status: "delivered",
              items: 24,
              date: "2023-06-14",
            },
            {
              id: "SH-1002",
              customer: "FashionHub",
              status: "in_transit",
              items: 42,
              date: "2023-06-13",
            },
            {
              id: "SH-1003",
              customer: "HomeLiving",
              status: "processing",
              items: 15,
              date: "2023-06-12",
            },
            {
              id: "SH-1004",
              customer: "ElectroWorld",
              status: "ready",
              items: 32,
              date: "2023-06-11",
            },
          ],
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
  }, [addNotification, user]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    addNotification({
      title: "Success",
      message: "Dashboard data refreshed",
      type: "success",
    });
  };

  const handleTaskComplete = (taskId) => {
    // TODO: Add API call to mark task as complete
    setDashboardData((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks.filter((task) => task.id !== taskId),
    }));
    addNotification({
      title: "Task Completed",
      message: "Task marked as completed",
      type: "success",
    });
  };

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
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manager Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            {user?.warehouse
              ? `Warehouse: ${user.warehouse}`
              : "Overview of your responsibilities"}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <ArrowPathIcon
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Items"
          value={dashboardData.totalItems.toLocaleString()}
          icon={<CubeIcon className="h-6 w-6" />}
          color="bg-blue-100 text-blue-800"
          trend="up"
          trendValue="5% from last week"
        />
        <DashboardCard
          title="Pending Shipments"
          value={dashboardData.pendingShipments}
          icon={<TruckIcon className="h-6 w-6" />}
          color="bg-purple-100 text-purple-800"
          trend="neutral"
          trendValue={`${
            dashboardData.pendingShipments > 0
              ? "Needs attention"
              : "All caught up"
          }`}
        />
        <DashboardCard
          title="Overdue Tasks"
          value={dashboardData.overdueTasks}
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          color="bg-red-100 text-red-800"
          trend={dashboardData.overdueTasks > 0 ? "up" : "down"}
          trendValue={
            dashboardData.overdueTasks > 0
              ? "Urgent attention needed"
              : "No overdue tasks"
          }
        />
        <DashboardCard
          title="Storage Utilization"
          value={`${dashboardData.storageUtilization}%`}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          color="bg-green-100 text-green-800"
          trend={dashboardData.storageUtilization > 85 ? "up" : "down"}
          trendValue={
            dashboardData.storageUtilization > 85 ? "High capacity" : "Optimal"
          }
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Status */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Inventory Status</h2>
          <InventoryStatusChart data={dashboardData.inventoryStats} />
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Pending Tasks</h2>
            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              View All
            </span>
          </div>
          <PendingTasks
            tasks={dashboardData.pendingTasks}
            onTaskComplete={handleTaskComplete}
          />
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Shipments</h2>
          <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
            View All
          </span>
        </div>
        <RecentShipments shipments={dashboardData.recentShipments} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center py-4 h-full"
          >
            <CubeIcon className="h-6 w-6 mb-2 text-blue-600" />
            <span>New Inventory</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center py-4 h-full"
          >
            <TruckIcon className="h-6 w-6 mb-2 text-green-600" />
            <span>Process Shipment</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center py-4 h-full"
          >
            <ClockIcon className="h-6 w-6 mb-2 text-yellow-600" />
            <span>Create Task</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center py-4 h-full"
          >
            <CheckCircleIcon className="h-6 w-6 mb-2 text-purple-600" />
            <span>Run Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
